import toast from "react-hot-toast";
import { useApi } from "../../utils/useApi";
import { type SubjectsByTeacherInterface, type SearchSubjectInterface } from "../../shared/interfaces/subjects";

export const searchSubjects = async (value: string, field: string = 'name') => {
  try {
    const responseSubjects = await useApi<SearchSubjectInterface>(`/subjects/search?field=${field}&value=${value}`);
    return responseSubjects.data.length > 0 ? responseSubjects.data : [];
  } catch (error) {
    toast.error('Ha ocurrido un error al buscar las asignaturas. Comuniquese.');
    return [];
  };
};

export const getMySubjects = async () => {
  try {
    const responseSubjects = await useApi<SubjectsByTeacherInterface>(`/teacher/subjects/`);
    return responseSubjects;
  } catch (error) {
    toast.error('Ha ocurrido un error al buscar las asignaturas. Comuniquese.');
  };
};