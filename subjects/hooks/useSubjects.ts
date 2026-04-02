import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { useState, useEffect, useMemo } from "react";
import { type PaginateClickEvent } from "../../shared/interfaces";
import { type Subject, type SubjectsInterface } from "../../shared/interfaces/subjects";

export const useSubjects = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [actionModal, setActionModal] = useState("");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<Subject | null>();

  // Paginación
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSubjects, setTotalSubjects] = useState(0);

  const getSubjects = async () => {
    setloading(true);
    try {
      const responseSubjects = await useApi<SubjectsInterface>(`/subjects?page=${currentPage}`);
      setTotalSubjects(responseSubjects.meta.total);
      setTotalPages(responseSubjects.meta.last_page);
      setSubjects(prev => [...prev, ...responseSubjects.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaturas. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setloading(false);
    };
  };

  const dataSubjects = useMemo(() => {
    if (!subjects) return [];
    const endOffset = itemOffset + perPage;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + perPage, subjects.length));
    return subjects.slice(itemOffset, endOffset);
  }, [itemOffset, subjects]);

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;

    if (event.nextSelectedPage === pageCount - 1 && subjects.length < totalSubjects) setCurrentPage(prev => prev + 1);
    const newOffset = (event.nextSelectedPage * perPage) % subjects.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return {
    end,
    start,
    subject,
    loading,
    pageCount,
    setSubject,
    totalPages,
    actionModal,
    getSubjects,
    currentPage,
    dataSubjects,
    totalSubjects,
    setActionModal,
    setCurrentPage,
    handlePageClick,
  }
};