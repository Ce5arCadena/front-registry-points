import { 
  type Student, 
  type FormCourseData, 
  type StudentsInterface, 
  type ResponseStudentInterface 
} from "../../shared/interfaces/students";
import toast from "react-hot-toast";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";

export const useStudents = () => {
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [actionModal, setActionModal] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const navigate = useNavigate();

  const getStudents = async (course: number) => {
    setLoading(true);
    setIsSearch(true);
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
      if (method === 'PUT') {
        const newStudents = students.filter(course => course.id !== responseCourse.data?.id);
        setStudents([...newStudents, responseCourse.data as Student]);
      } else {
        await getStudents(data.grade);
      }
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

  // useEffect(() => {
  //   getStudents();
  // }, []);

  return {
    loading,
    student,
    isSearch,
    students,
    setStudent,
    getStudents,
    actionModal,
    createStudent,
    setActionModal
  }
}
