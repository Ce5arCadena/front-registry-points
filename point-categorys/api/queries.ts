import { useApi } from "../../utils/useApi";
import { type PointCategoriesResponse } from "../../shared/interfaces/pointCategories";

export const getPointCategories = async (page: number = 1) => {
  const response = await useApi<PointCategoriesResponse>(`/point-categories?page=${page}`);
  return response;
}