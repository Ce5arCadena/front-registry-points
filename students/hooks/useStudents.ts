import toast from "react-hot-toast";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { type StudentsInterface, type Student } from "../../shared/interfaces/students";

export const useStudents = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  const getStudents = async (course: number) => {
    setLoading(true);
    setStudents([]);
    try {
      const responseStudents = await useApi<StudentsInterface>(`/students?gradeId=${course}`);
      console.log(responseStudents);
      // setTotalTeachers(responseStudents.meta.total);
      // setTotalPages(responseStudents.meta.last_page);
      setStudents(prev => [...prev, ...responseStudents.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los estudiantes. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  // useEffect(() => {
  //   getStudents();
  // }, []);

  return {
    students,
    loading,
    getStudents
  }
}
