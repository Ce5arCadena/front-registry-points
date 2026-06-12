import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";
import { 
  loadingAtom, 
  currentPageAtom, 
  pointsCategorySelectAtom, 
  pointCategoriesAssignmentsAtom, 
  totalPointCategoriesAssignmentAtom
} from "../store/pointCategoryAssignmentStore";
import { changeStatesPointCategoriesAssignment } from "../api/queries";

export const useChangeStatePointCategoryAssignment = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const setPointsCategorySelect = useSetAtom(pointsCategorySelectAtom);
  const setPointCategoriesAssignment = useSetAtom(pointCategoriesAssignmentsAtom);
  const setTotalPointCategoriesAssignment = useSetAtom(totalPointCategoriesAssignmentAtom);

  const changeStatusPointCategoriesById = async (id: number) => {
    if (!id) return;

    setLoading(true);
    try {
      const responseChangeStatus = await changeStatesPointCategoriesAssignment(id);
      setTotalPointCategoriesAssignment(responseChangeStatus.meta.total);
      setPointsCategorySelect(responseChangeStatus.data.map(pointCategory => ({
        value: String(pointCategory.id),
        label: pointCategory.name
      })));
      setCurrentPage(1);
      setPointCategoriesAssignment(responseChangeStatus.data);
      toast.success(responseChangeStatus.message);
    } catch (error) {
      toast.error('Ha ocurrido un error al cambiar de estado la asignación de categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  return {
    changeStatusPointCategoriesById
  };
}
