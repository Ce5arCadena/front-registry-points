import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useApi } from "../../utils/useApi";
import { type AdminTeacherData, type AdminTeacher } from "../../shared/interfaces/adminTeacher";

export const useAdminTeacher = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataAdminTeacher, setDataAdminTeacher] = useState<AdminTeacherData>();

  const getInfoTeacher = async () => {
    setLoading(true);
    try {
      const responseInfoAdmin = await useApi<AdminTeacher>(`/teacher/info/dashboard`);
      setDataAdminTeacher(responseInfoAdmin.data);
      console.log(responseInfoAdmin)
      toast.success(responseInfoAdmin.message);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los cursos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  }

  useEffect(() => {
    getInfoTeacher();
  }, []);

  return {
    loading,
    getInfoTeacher,
    dataAdminTeacher,
  }
}
