import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getStudentsByCourseWithPointCategories } from "../api/queries";
import { loadingAtom, studentsWithPointCategoriesAtom } from "../store/registryPointsStore";

export default function useStudentsWithPoinCategories() {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const setStudentsWithPointCategories = useSetAtom(studentsWithPointCategoriesAtom);

  const fetchStudentsWithCategories = async (course: number, subject: number) => {
    setLoading(true);
    try {
      const response = await getStudentsByCourseWithPointCategories(course, subject);
      console.log(response);
      setStudentsWithPointCategories(response);
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los estudiantes con sus categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setLoading(false);
    };
  };

  return {
    fetchStudentsWithCategories
  };
};
