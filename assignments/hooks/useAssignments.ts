import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useApi } from '../../utils/useApi';
import { useAtomValue, useSetAtom } from 'jotai';
import { type AssignmentsInterface } from '../../shared/interfaces/assignments';
import { assignmentsAtom, currentPageAtom, loadingAtom } from '../store/assignmentsStore';

export const useAssignments = () => {
  const navigate = useNavigate();

  const setLoading = useSetAtom(loadingAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const setAssignments = useSetAtom(assignmentsAtom);

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
      console.log(id);
      return true
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setAssignments([]);
    getAssignments();
  }, []);

  return {
    deleteAssignment
  }
}
