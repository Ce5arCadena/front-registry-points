import { 
  type TeacherWithCoursesResponse, 
  type StudentWithPointCategoriesResponse, 
} from "../../shared/interfaces/registryPoints";
import { useApi } from "../../utils/useApi";

export const getTeacherWithCourses = async () => {
  const response = await useApi<TeacherWithCoursesResponse>(`/teacher/courses?hasSubjectsAssignment=1`);
  return response;
};

export const getStudentsByCourseWithPointCategories = async(course: number, subject: number) => {
  const response = await useApi<StudentWithPointCategoriesResponse>(`/registry-points/courses/${course}/subjects/${subject}`);
  return response;
}