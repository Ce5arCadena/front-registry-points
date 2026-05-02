import toast from "react-hot-toast";
import { useApi } from "../../utils/useApi";
import { type SearchSubjectInterface } from "../../shared/interfaces/subjects";

export const searchSubjects = async (value: string, field: string = 'name') => {
  try {
    const responseSubjects = await useApi<SearchSubjectInterface>(`/subjects/search?field=${field}&value=${value}`);
    return responseSubjects.data.length > 0 ? responseSubjects.data : [];
  } catch (error) {
    toast.error('Ha ocurrido un error al buscar las asignaturas. Comuniquese.');
    return [];
  };
};