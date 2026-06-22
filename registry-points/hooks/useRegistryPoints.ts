import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";

import { getTeacherWithCourses } from "../api/queries";
import { loadingAtom, teacherAtom } from "../store/registryPointsStore";

export const useRegistryPoints = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const [teacher, setTeacher] = useAtom(teacherAtom);

  const getInitialData = async () => {
    setLoading(true);
    try {
      const response = await getTeacherWithCourses();
      console.log(response);
      setTeacher(response.data);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones de categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const handleViewStudents = async (course: number, subject: number) => {
    navigate(`courses/${course}/subjects/${subject}`);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return {
    handleViewStudents
  };
}
