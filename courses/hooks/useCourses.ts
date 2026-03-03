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

  const onSubmitCourse = async (values: FormCourseData) => {
    const responseCreate = await createCourse(values);
    if (responseCreate) {
      setCourses((prevCourses) => ([
        ...prevCourses,
        responseCreate
      ]));

      return true;
    };
    
    return false;
  };

  const createCourse = async (data: FormCourseData): Promise<undefined | Course> => {
    setloading(true);
    try {
      const responseCourses = await useApi<CreateCourseInterface>('/grades', 'POST', data);
      if (responseCourses.ok !== 200 && responseCourses.errors) {
        const errors = responseCourses.errors?.join(" ");
        toast.error(errors);
        return undefined;
      };

      return responseCourses.data;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear el curso. Comuniquese.');
      return undefined;
    } finally {
      setloading(false);
    };
  };

  useEffect(() => {
    getCourses();
  }, []);

  return {
    loading,
    courses,
    getCourses,
    actionModal,
    setActionModal,
    onSubmitCourse
  };
}