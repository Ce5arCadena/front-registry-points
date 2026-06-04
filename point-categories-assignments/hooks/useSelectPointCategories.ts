import { useEffect } from "react";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getMyCourses } from "../../courses/api/queries";
import { loadingAtom, teacherCoursesAtom } from "../store/pointCategoryAssignmentStore";

export const useSelectPointCategories = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const setTeacherCoursesAtom = useSetAtom(teacherCoursesAtom);

  const getCoursesOptions = async() => {
    setLoading(true);
    try {
      const response = await getMyCourses();
      if(response && response.data && response.data.grades.length > 0) {
        const formatGrades = response.data.grades.map(grade => ({
          value: String(grade.id),
          label: grade.name
        }));
        setTeacherCoursesAtom(formatGrades);
      } else {
        setTeacherCoursesAtom([]);
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener tus cursos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    getCoursesOptions();
  }, []);
  

  return { getCoursesOptions }
}
