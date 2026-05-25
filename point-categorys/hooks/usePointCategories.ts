import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { createPointCategories, getPointCategories } from "../api/queries";
import { type FormPointCategory } from "../../shared/interfaces/pointCategories";
import { actionModalAtom, loadingAtom, pageCountAtom, pointCategoryAtom, pointCategorysAtom } from "../store/pointCategoryStore";

export const usePointCategories = () => {
  const navigate = useNavigate();
  const page = useAtomValue(pageCountAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const setPointCategories = useSetAtom(pointCategorysAtom);
  const [pointCategory, setPointCategory] = useAtom(pointCategoryAtom);

  const getInitialData = async () => {
    setLoading(true);
    try {
      const response = await getPointCategories(page);
      setPointCategories(prev => [...prev, ...response.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const createAndUpdatePointCategory = async (data: FormPointCategory, METHOD: 'POST' | 'PUT'): Promise<boolean> => {
    setLoading(true);
    try {
      const URL = METHOD === 'POST' ? '/point-categories' : `/point-categories/${pointCategory?.id}`;
      const responseCreatePointCategory = await createPointCategories(data, METHOD, URL);
      if (responseCreatePointCategory.ok !== 200 && responseCreatePointCategory.errors) {
        const errors = responseCreatePointCategory.errors?.join(" ");
        toast.error(errors);
        return false;
      };

      toast.success(responseCreatePointCategory.message);
      setPointCategories(responseCreatePointCategory.data);
      setPointCategory(undefined);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear la categoría de puntos. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return {
    createAndUpdatePointCategory
  }
}
