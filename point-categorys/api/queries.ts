import { useApi } from "../../utils/useApi";
import { 
  type FormPointCategory, 
  type PointCategoriesResponse 
} from "../../shared/interfaces/pointCategories";

export const getPointCategories = async (page: number = 1) => {
  const response = await useApi<PointCategoriesResponse>(`/point-categories?page=${page}`);
  return response;
};

export const createPointCategories = async (data: FormPointCategory, METHOD: 'POST' | 'PUT', URL: string) => {
  const response = await useApi<PointCategoriesResponse>(URL, METHOD, data);
  return response;
}