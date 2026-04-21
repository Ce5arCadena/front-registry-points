import {
  type Student,
  type FormCourseData,
  type StudentsInterface,
  type ResponseStudentInterface
} from "../../shared/interfaces/students";

import { 
  studentAtom, 
  loadingAtom, 
  isSearchAtom, 
  studentsAtom, 
  currentPageAtom, 
  actionModalAtom,
  totalStudentsAtom, 
} from "../store/studentsStore";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";

export const useStudents = () => {
  const navigate = useNavigate();
  const student = useAtomValue(studentAtom);
  const setStudent = useSetAtom(studentAtom);
  const setIsSearch = useSetAtom(isSearchAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const [courseId, setCourseId] = useState<number | null>(null);
  
  const [loading, setLoading] = useAtom(loadingAtom);
  const [students, setStudents] = useAtom(studentsAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [totalStudents, setTotalStudents] = useAtom(totalStudentsAtom);

  const getStudents = async (course: number, resetData = false) => {
    setLoading(true);
    setIsSearch(true);
    setCourseId(course);
    try {
      console.log(currentPage, course, students)
      const responseStudents = await useApi<StudentsInterface>(`/students?page=${currentPage}&gradeId=${course}`);
      setTotalStudents(responseStudents.meta.total);
      resetData ? setStudents([...responseStudents.data]) : setStudents(prev => [...prev, ...responseStudents.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los estudiantes. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const createStudent = async (data: FormCourseData, method: string, url: string): Promise<boolean> => {
    setLoading(true);
    try {
      const responseCourse = await useApi<ResponseStudentInterface>(url, method, data);
      // Mostrar errores cuando es un solo error o varios. Se hace así por formato del backend
      if (responseCourse.errors && Array.isArray(responseCourse.errors)) {
        const errorsFormat = responseCourse.errors.join(" ");
        toast.error(errorsFormat);
        return false;
      } else if (responseCourse.errors && Object.keys(responseCourse.errors).length > 0) {
        const errors = responseCourse.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };

      toast.success(responseCourse.message);
      await getStudents(data.grade, true);
      setStudent(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear el estudiante. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setLoading(false);
    };
  };

  const deleteStudent = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const responseDeleteStudent = await useApi<ResponseStudentInterface>(`/students/${id}`, 'DELETE');

      if (responseDeleteStudent.errors && Array.isArray(responseDeleteStudent.errors) && responseDeleteStudent.errors.length > 0) {
        const errorsFormat = responseDeleteStudent.errors.join(" ");
        toast.error(errorsFormat);
        return false;
      } else if (responseDeleteStudent.errors && Object.keys(responseDeleteStudent.errors).length > 0) {
        const errors = responseDeleteStudent.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };

      toast.success(responseDeleteStudent.message);
      if (student && student.grade) await getStudents(student.grade.id, true);
      setStudent(null);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar el estudiante. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (currentPage > 1 && courseId) {
      getStudents(courseId);
    };
  }, [currentPage]);

  return {
    loading,
    students,
    getStudents,
    totalStudents,
    deleteStudent,
    createStudent,
  }
}
