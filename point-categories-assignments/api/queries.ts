import { useApi } from "../../utils/useApi";
import { type PointCategoriesResponse } from "../../shared/interfaces/pointCategories";

export const changeStatesPointCategoriesAssignment = async (id: number) => {
  const response = await useApi<PointCategoriesResponse>(`/point-category-contexts/state`, 'PATCH', { ids: [id]});
  return response;
}