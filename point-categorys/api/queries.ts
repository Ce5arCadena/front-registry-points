import { useApi } from "../../utils/useApi";
import { 
  type SaveAsisgnment,
  type FormPointCategory, 
  type PointCategoriesResponse 
} from "../../shared/interfaces/pointCategories";

export const getPointCategories = async (page: number = 1) => {
  const response = await useApi<PointCategoriesResponse>(`/point-categories?page=${page}`);
  return response;
};

export const createOrUpdateAssignment = async (data: SaveAsisgnment, METHOD: 'POST' | 'PUT', URL: string) => {
  const responseAssignments = await useApi<PointCategoriesResponse>(URL, METHOD, data);
  return responseAssignments;
};

export const createPointCategories = async (data: FormPointCategory, METHOD: 'POST' | 'PUT', URL: string) => {
  const response = await useApi<PointCategoriesResponse>(URL, METHOD, data);
  return response;
}

export const changeStatesPointCategories = async (data: number[]) => {
  const response = await useApi<PointCategoriesResponse>(`/point-categories/state`, 'PATCH', { ids: data });
  return response;
}