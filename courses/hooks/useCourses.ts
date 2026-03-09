import {
  type Course,
  type FormCourseData,
  type CoursesInterface,
  type ResponseCourseInterface,
} from "../../shared/interfaces/courses";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "../../utils/useApi";

export const useCourses = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [actionModal, setActionModal] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>();
  
  // Paginación
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const getCourses = async () => {
    setloading(true);
    try {
      const responseCourses = await useApi<CoursesInterface>('/courses');
      console.log(responseCourses)
      setCurrentPage(responseCourses.meta.current_page);
      setCourses(responseCourses.data);
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
    setStart((currentPage - 1) * perPage + 1);
    setEnd(Math.min(currentPage * perPage, courses.length));

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return courses.slice(start, end);
  }, [currentPage, courses]);

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
      setCourses((prevData) => ({
        ...prevData,
        data: [...newCourses, responseCourse.data as Course]
      }));
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
      const responseDeleteCourse = await useApi<ResponseCourseInterface>(`/courses/${id}`, 'DELETE');
      if (responseDeleteCourse.ok !== 200 && responseDeleteCourse.errors) {
        const errors = responseDeleteCourse.errors?.join(" ");
        toast.error(errors);
        return false;
      }

      // toast.success(responseDeleteCourse.message);
      // const newCourses = courses.filter(course => course.id !== id);
      // setCourses(newCourses);
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
    getCourses();
  }, []);

  return {
    end, 
    start,
    course,
    loading,
    courses,
    setCourse,
    getCourses,
    dataCourses,
    actionModal,
    createCourse,
    deleteCourse,
    setActionModal
  };
}