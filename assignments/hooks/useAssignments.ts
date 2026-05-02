import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useApi } from '../../utils/useApi';
import { useAtomValue, useSetAtom } from 'jotai';
import { type AssignmentsInterface } from '../../shared/interfaces/assignments';
import { assignmentAtom, assignmentsAtom, currentPageAtom, loadingAtom, totalAssignmentsAtom } from '../store/assignmentsStore';

export const useAssignments = () => {
  const navigate = useNavigate();

  const setLoading = useSetAtom(loadingAtom);
  const setAssignments = useSetAtom(assignmentsAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const setTotalAssignments = useSetAtom(totalAssignmentsAtom);

  const getStudents = async () => {
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

  useEffect(() => {
    setAssignments([]);
    getStudents();
  }, []);
}
