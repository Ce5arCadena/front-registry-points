import {
  type Course,
  type FormCourseData,
  type CoursesInterface,
  type CreateCourseInterface,
} from "../../shared/interfaces/courses";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";

export const useCourses = () => {
  const [loading, setloading] = useState(false);
  const [actionModal, setActionModal] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>();

  const getCourses = async () => {
    setloading(true);
    try {
      const responseCourses = await useApi<CoursesInterface>('/grades');
      const dataCourses = responseCourses.data && responseCourses.data.length > 0 ? responseCourses.data : [];
      setCourses(dataCourses);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los cursos. Comuniquese.');
      return;
    } finally {
      setloading(false);
    };
  };

  const createCourse = async (data: FormCourseData, method: string, url: string): Promise<boolean> => {
    setloading(true);
    try {
      const responseCourse = await useApi<CreateCourseInterface>(url, method, data);
      if (responseCourse.ok !== 200 && responseCourse.errors) {
        const errors = responseCourse.errors?.join(" ");
        toast.error(errors);
        return false;
      };

      toast.success(responseCourse.message);
      const newCourses = courses.filter(course => course.id !== responseCourse.data?.id);
      setCourses([...newCourses, responseCourse.data as Course]);
      setCourse(null);
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear el curso. Comuniquese.');
      return false;
    } finally {
      setloading(false);
    };
  };

  useEffect(() => {
    getCourses();
  }, []);

  return {
    course,
    loading,
    courses,
    setCourse,
    getCourses,
    actionModal,
    createCourse,
    setActionModal
  };
}