import { useApi } from "../../utils/useApi";
import { type TeacherWithCoursesResponse } from "../../shared/interfaces/registryPoints";

export const getTeacherWithCourses = async () => {
  const response = await useApi<TeacherWithCoursesResponse>(`/teacher/courses?hasSubjectsAssignment=1`);
  return response;
};