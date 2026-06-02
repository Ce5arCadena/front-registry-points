import { 
  loadingAtom, 
  currentPageAtom, 
  pointCategoriesAssignmentsAtom, 
  totalPointCategoriesAssignmentAtom 
} from "../store/pointCategoryAssignmentStore";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";
import { getPointCategories } from "../../point-categorys/api/queries";

export const usePointCategoryAssignment = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [pointCategoriesAssignment, setPointCategoriesAssignment] = useAtom(pointCategoriesAssignmentsAtom);
  const [totalPointCategoriesAssignment, setTotalPointCategoriesAssignment] = useAtom(totalPointCategoriesAssignmentAtom);

  const getInitialData = async () => {
    setLoading(true);
    try {
      const response = await getPointCategories(currentPage);
      setTotalPointCategoriesAssignment(response.data.length);
      setPointCategoriesAssignment(prev => [...prev, ...response.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones de categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    setPointCategoriesAssignment([]);
    getInitialData();
  }, []);
  
  return {}
}
