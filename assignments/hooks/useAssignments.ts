import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useApi } from '../../utils/useApi';
import { useAtomValue, useSetAtom } from 'jotai';
import { type AssignmentsInterface } from '../../shared/interfaces/assignments';
import { actionModalAtom, assignmentAtom, assignmentsAtom, currentPageAtom, loadingAtom } from '../store/assignmentsStore';

export const useAssignments = () => {
  const navigate = useNavigate();

  const setLoading = useSetAtom(loadingAtom);
  const setAssignment = useSetAtom(assignmentAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const setAssignments = useSetAtom(assignmentsAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  const getAssignments = async () => {
    setLoading(true);
    try {
      const responseAssignments = await useApi<AssignmentsInterface>(`/teachers-subjects?page=${currentPage}`);
      setAssignments(prev => [...prev, ...responseAssignments.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const deleteAssignment = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const responseDeleteCourse = await useApi<AssignmentsInterface>(`/teachers-subjects/${id}`, 'DELETE');
      if (responseDeleteCourse.errors && Object.keys(responseDeleteCourse.errors).length > 0) {
        const errors = responseDeleteCourse.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };

      toast.success(responseDeleteCourse.message);
      setAssignments(responseDeleteCourse.data);
      setAssignment(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar el curso. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setLoading(false);
    };
  }

  useEffect(() => {
    setAssignments([]);
    getAssignments();
  }, []);

  return {
    deleteAssignment
  }
}
