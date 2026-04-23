import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type StudentsInterface } from "../../shared/interfaces/students";
import { courseIdAtom, currentPageAtom, dataStudentsAtom, loadingAtom, selectedIdsAtom, studentsAtom, totalStudentsAtom } from "../store/studentsStore";

export const useChangeStatesStudents = () => {
  const navigate = useNavigate();

  const setLoading = useSetAtom(loadingAtom);
  const courseId = useAtomValue(courseIdAtom);
  const setStudents = useSetAtom(studentsAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const dataStudents = useAtomValue(dataStudentsAtom);
  const setTotalStudents = useSetAtom(totalStudentsAtom);
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);

  const changeStatusTeachersByIds = async () => {
    if (selectedIds.length <= 0) return;

    setLoading(true);
    try {
      // Este endpoint retorna la lista de nuevo de todos los registros. Reseteamos todo de nuevo
      const responseChangeStatus = await useApi<StudentsInterface>('/students/state', 'PATCH', { ids: selectedIds, grade: courseId });
      console.log(responseChangeStatus);
      setTotalStudents(responseChangeStatus.meta.total);
      setCurrentPage(1);
      setStudents(responseChangeStatus.data);
      toast.success(responseChangeStatus.message);
    } catch (error) {
      toast.error('Ha ocurrido un error al cambiar de estado los estudiantes. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const toggleOne = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? selectedIds.filter(item => item !== id) : [...prev, id]
    );
  };

  const getIdsStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(dataStudents.map(student => student.id));
    } else {
      setSelectedIds([]);
    }
  };

  return {
    toggleOne,
    getIdsStudents,
    changeStatusTeachersByIds
  }
};
