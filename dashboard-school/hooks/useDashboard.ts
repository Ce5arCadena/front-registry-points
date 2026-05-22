import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getInitialDataDashboard } from "../api/query";
import { type DashboardDataInterface } from "../../shared/interfaces";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState<DashboardDataInterface>();

  const getInitialData = async () => {
    setLoading(true);
    try {
      const responseData = await getInitialDataDashboard();
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
    dataDashboard,
  }
}
