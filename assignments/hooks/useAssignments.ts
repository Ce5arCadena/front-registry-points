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
      const responseStudents = await useApi<AssignmentsInterface>(`/teachers-subjects?page=${currentPage}`);
      console.log(responseStudents);
      setTotalAssignments(responseStudents.meta.total);
      setAssignments(prev => [...prev, ...responseStudents.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    getStudents();
  }, []);
}
