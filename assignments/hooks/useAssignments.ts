import {
  endAtom,
  startAtom,
  loadingAtom,
  assignmentAtom,
  itemOffsetAtom,
  actionModalAtom,
  assignmentsAtom,
  currentPageAtom,
  pageCountAtom,
  totalAssignmentsAtom,
} from '../store/assignmentsStore';
import toast from 'react-hot-toast';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApi } from '../../utils/useApi';
import { useAtom, useSetAtom } from 'jotai';
import { type PaginateClickEvent } from '../../shared/interfaces';
import { type AssignmentsInterface } from '../../shared/interfaces/assignments';

const PERPAGE = 12;

export const useAssignments = () => {
  const navigate = useNavigate();

  const setEnd = useSetAtom(endAtom);
  const setStart = useSetAtom(startAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setAssignment = useSetAtom(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const [pageCount, setPageCount] = useAtom(pageCountAtom);
  const [itemOffset, setItemOffset] = useAtom(itemOffsetAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [assignments, setAssignments] = useAtom(assignmentsAtom);
  const [totalAssignments, setTotalAssignments] = useAtom(totalAssignmentsAtom);

  const didFetchInitial = useRef(false);

  const getAssignments = async () => {
    setLoading(true);
    try {
      const responseAssignments = await useApi<AssignmentsInterface>(`/teachers-subjects?page=${currentPage}`);
      setTotalAssignments(responseAssignments.data.length);
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
  };

  const dataAssignments = useMemo(() => {
    if (!assignments) return [];
    const endOffset = itemOffset + PERPAGE;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + PERPAGE, assignments.length));
    return assignments.slice(itemOffset, endOffset);
  }, [itemOffset, assignments]);

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;

    if (event.nextSelectedPage === pageCount - 1 && assignments.length < totalAssignments) setCurrentPage(prev => prev + 1);
    const newOffset = (event.nextSelectedPage * PERPAGE) % assignments.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (didFetchInitial.current) return;
    didFetchInitial.current = true;

    setAssignments([]);
    getAssignments();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(assignments.length / PERPAGE));
  }, [assignments]);

  useEffect(() => {
    if (currentPage > 1) {
      getAssignments();
    }
  }, [currentPage]);

  return {
    deleteAssignment,
    dataAssignments,
    handlePageClick
  }
}
