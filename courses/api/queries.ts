import toast from "react-hot-toast";
import { useApi } from "../../utils/useApi";
import { type SearchCourseInterface } from "../../shared/interfaces/courses";

export const searchCourses = async (value: string, field: string = 'name') => {
  try {
    const responseCourses = await useApi<SearchCourseInterface>(`/courses/search?field=${field}&value=${value}`);
    return responseCourses.data.length > 0 ? responseCourses.data : [];
  } catch (error) {
    toast.error('Ha ocurrido un error al buscar los cursos. Comuniquese.');
    return [];
  };
};