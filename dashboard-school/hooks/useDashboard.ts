import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { type DashboardDataInterface } from "../../shared/interfaces";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState<DashboardDataInterface>();

  const getInitialData = async () => {
    setLoading(true);
    try {
      const responseData = await useApi<DashboardDataInterface>(`/info`);
      console.log(responseData)
      setDataDashboard(responseData);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener la información del dashboard. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };


  useEffect(() => {
    getInitialData();
  }, []);

  return {
    loading,
    dataDashboard
  }
}
