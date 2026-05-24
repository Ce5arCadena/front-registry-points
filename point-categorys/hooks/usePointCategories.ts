import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { getPointCategories } from "../api/queries";
import { loadingAtom, pageCountAtom, pointCategorysAtom } from "../store/pointCategoryStore";

export const usePointCategories = () => {
  const navigate = useNavigate();
  const page = useAtomValue(pageCountAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setPointCategories = useSetAtom(pointCategorysAtom);

  const getInitialData = async () => {
    try {
      const response = await getPointCategories(page);
      console.log(response);
      setPointCategories(prev => [...prev, ...response.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  }

  useEffect(() => {
    getInitialData();
  }, []);
}
