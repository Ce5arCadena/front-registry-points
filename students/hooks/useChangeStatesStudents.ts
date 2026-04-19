import { useApi } from "../../utils/useApi";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { type StudentsInterface } from "../../shared/interfaces/students";
import { dataStudentsAtom, loadingAtom, selectedIdsAtom } from "../store/studentsStore";

export const useChangeStatesStudents = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const dataStudents = useAtomValue(dataStudentsAtom);
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);

  // TODO: Manejar jotai para los estados que son compartidos, y obtener ese estado en el hook que lo necesita

  // const changeStatusTeachersByIds = async () => {
  //   if (selectedIds.length <= 0) return;

  //   setLoading(true);
  //   try {
  //     const responseChangeStatus = await useApi<StudentsInterface>('/teachers/state', 'PATCH', { ids: selectedIds });
  //     console.log(responseChangeStatus);
  //     setTotalTeachers(responseChangeStatus.meta.total);
  //     setTotalPages(responseChangeStatus.meta.last_page);
  //     setCurrentPage(1);
  //     setTeachers(responseChangeStatus.data);
  //     toast.success(responseChangeStatus.message);
  //   } catch (error) {
  //     toast.error('Ha ocurrido un error al cambiar de estado los maestros. Comuniquese.');
  //     navigate('/auth/login');
  //     return;
  //   } finally {
  //     setLoading(false);
  //   };
  // };

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

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds])
  

  return {
    toggleOne,
    getIdsStudents,
  }
};
