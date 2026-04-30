import toast from "react-hot-toast";
import { useApi } from "../../utils/useApi";
import { type SearchTeachersInterface } from "../../shared/interfaces/teachers";

export const searchStudents = async (value: string, field: string = 'full_name') => {
  try {
    const responseStudents = await useApi<SearchTeachersInterface>(`/teachers/search?field=${field}&value=${value}`);
    return responseStudents.data;
  } catch (error) {
    toast.error('Ha ocurrido un error al buscar los maestros. Comuniquese.');
    return;
  };
};