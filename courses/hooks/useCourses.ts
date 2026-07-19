import {
  type Course,
  type FormCourseData,
  type CoursesInterface,
  type ResponseCourseInterface,
} from "../../shared/interfaces/courses";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { useEffect, useMemo, useRef, useState } from "react";
import { type PaginateClickEvent } from "../../shared/interfaces";

export const useCourses = ({
  allCourses = false
}: {
  allCourses?: boolean
}) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [actionModal, setActionModal] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>();
  
  // Paginación
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  const requestExecuted = useRef(false);

  const getCourses = async () => {
    setloading(true);
    try {
      const param = allCourses ? '?all=true' : `?page=${currentPage}`;
      const responseCourses = await useApi<CoursesInterface>(`/courses${param}`);
      if (!allCourses) {
        setTotalCourses(responseCourses.meta.total);
        setTotalPages(responseCourses.meta.last_page);
      }
      setCourses(prev => [...prev, ...responseCourses.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los cursos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setloading(false);
    };
  };

  const dataCourses = useMemo(() => {
    if (!courses) return [];
    const endOffset = itemOffset + perPage;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + perPage, courses.length));
    return courses.slice(itemOffset, endOffset);
  }, [itemOffset, courses]);

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;

    if (event.nextSelectedPage === pageCount - 1 && courses.length < totalCourses) setCurrentPage(prev => prev + 1);
    const newOffset = (event.nextSelectedPage * perPage) % courses.length;
    setItemOffset(newOffset);
  };

  const createCourse = async (data: FormCourseData, method: string, url: string): Promise<boolean> => {
    setloading(true);
    try {
      const responseCourse = await useApi<ResponseCourseInterface>(url, method, data);
      if (responseCourse.ok !== 200 && responseCourse.errors) {
        const errors = responseCourse.errors?.join(" ");
        toast.error(errors);
        return false;
      };

      toast.success(responseCourse.message);
      const newCourses = courses.filter(course => course.id !== responseCourse.data?.id);
      setCourses([...newCourses, responseCourse.data as Course]);
      setCourse(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear el curso. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setloading(false);
    };
  };

  const deleteCourse = async (id: number): Promise<boolean> => {
    setloading(true);
    try {
      const responseDeleteCourse = await useApi<CoursesInterface>(`/courses/${id}`, 'DELETE');
      if (responseDeleteCourse.ok !== 200 && responseDeleteCourse.errors) {
        const errors = responseDeleteCourse.errors?.join(" ");
        toast.error(errors);
        return false;
      }

      toast.success(responseDeleteCourse.message);
      setTotalCourses(responseDeleteCourse.meta.total);
      setTotalPages(responseDeleteCourse.meta.last_page);
      setCourses(responseDeleteCourse.data);
      setCourse(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar el curso. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setloading(false);
    };
  };

  useEffect(() => {
    setPageCount(Math.ceil(courses.length / perPage));
  }, [courses]);
  
  useEffect(() => {
    if(requestExecuted.current) return
    requestExecuted.current = true;
    getCourses();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      getCourses();
    }
  }, [currentPage]);

  return {
    end, 
    start,
    course,
    loading,
    courses,
    setCourse,
    pageCount,
    getCourses,
    totalPages,
    dataCourses,
    actionModal,
    currentPage,
    createCourse,
    totalCourses,
    deleteCourse,
    setActionModal,
    handlePageClick,
    setCurrentPage,
  };
}