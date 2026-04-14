import {
  type Teacher,
  type TeachersInterface,
  type ResponseTeacherInterface,
} from "../../shared/interfaces/teachers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import React, { useState, useEffect, useMemo } from "react";
import { type PaginateClickEvent } from "../../shared/interfaces";
import { type FormCourseData } from "../../shared/interfaces/teachers";

export const useTeachers = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [actionModal, setActionModal] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacher, setTeacher] = useState<Teacher | null>();

  // Paginación
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTeachers, setTotalTeachers] = useState(0);

  const getTeachers = async () => {
    setloading(true);
    try {
      const responseTeachers = await useApi<TeachersInterface>(`/teachers?page=${currentPage}`);
      console.log(responseTeachers);
      setTotalTeachers(responseTeachers.meta.total);
      setTotalPages(responseTeachers.meta.last_page);
      setTeachers(prev => [...prev, ...responseTeachers.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los maestros. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setloading(false);
    };
  };

  const createTeacher = async (data: FormCourseData, method: string, url: string): Promise<boolean> => {
    setloading(true);
    try {
      const cleanData = method === 'PUT'
        ? Object.fromEntries(Object.entries(data).filter(([_, value]) => Boolean(value)))
        : data;
      const responseTeacher = await useApi<ResponseTeacherInterface>(url, method, cleanData);

      // Mostrar errores cuando es un solo error o varios. Se hace así por formato del backend
      if (responseTeacher.errors && Array.isArray(responseTeacher.errors)) {
        const errorsFormat = responseTeacher.errors.join(" ");
        toast.error(errorsFormat);
        return false;
      } else if (responseTeacher.errors && Object.keys(responseTeacher.errors).length > 0) {
        const errors = responseTeacher.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };

      toast.success(responseTeacher.message);
      const newTeachers = teachers.filter(teacher => teacher.id !== responseTeacher.data?.id);
      setTeachers([...newTeachers, responseTeacher.data as Teacher]);
      setTeacher(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear el maestro. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setloading(false);
    };
  };

  const deleteTeacher = async (id: number): Promise<boolean> => {
    setloading(true);
    try {
      const responseDeleteTeacher = await useApi<ResponseTeacherInterface>(`/teachers/${id}`, 'DELETE');

      if (responseDeleteTeacher.errors && Array.isArray(responseDeleteTeacher.errors) && responseDeleteTeacher.errors.length > 0) {
        const errorsFormat = responseDeleteTeacher.errors.join(" ");
        toast.error(errorsFormat);
        return false;
      } else if (responseDeleteTeacher.errors && Object.keys(responseDeleteTeacher.errors).length > 0) {
        const errors = responseDeleteTeacher.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };

      toast.success(responseDeleteTeacher.message);
      const newTeachers = teachers.filter(teacher => teacher.id !== id);
      setTeachers(newTeachers);
      setTeacher(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar el maestro. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setloading(false);
    };
  };

  const changeStatusTeachersByIds = async () => {
    if (selectedIds.length <= 0) return;

    setloading(true);
    try {
      const responseChangeStatus = await useApi<TeachersInterface>('/teachers/state', 'PATCH', { ids: selectedIds });
      console.log(responseChangeStatus);
      setTotalTeachers(responseChangeStatus.meta.total);
      setTotalPages(responseChangeStatus.meta.last_page);
      setCurrentPage(1);
      setTeachers(prev => [...prev, ...responseChangeStatus.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los maestros. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setloading(false);
    };
  };

  const dataTeachers = useMemo(() => {
    if (!teachers) return [];
    setSelectedIds([]);

    const endOffset = itemOffset + perPage;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + perPage, teachers.length));
    
    return teachers.slice(itemOffset, endOffset);
  }, [itemOffset, teachers]);

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;

    if (event.nextSelectedPage === pageCount - 1 && teachers.length < totalTeachers) setCurrentPage(prev => prev + 1);
    const newOffset = (event.nextSelectedPage * perPage) % teachers.length;
    setItemOffset(newOffset);
  };

  // Lógica de seleccionar todos
  const toggleOne = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? selectedIds.filter(item => item !== id) : [...prev, id]
    );
  };

  const getIdsTeachers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(dataTeachers.map(teacher => teacher.id));
    } else {
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    setPageCount(Math.ceil(teachers.length / perPage));
  }, [teachers]);

  useEffect(() => {
    getTeachers();
  }, []);

  return {
    end,
    start,
    teacher,
    loading,
    pageCount,
    toggleOne,
    setTeacher,
    totalPages,
    actionModal,
    selectedIds, 
    getTeachers,
    currentPage,
    dataTeachers,
    deleteTeacher,
    createTeacher,
    totalTeachers,
    getIdsTeachers,
    setActionModal,
    setCurrentPage,
    handlePageClick,
    changeStatusTeachersByIds
  }
};