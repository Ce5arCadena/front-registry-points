import {
  type DraftPoints,
  type TeacherWithCoursesResponse,
  type StudentWithPointCategoriesResponse,
} from "../../shared/interfaces/registryPoints";
import { useApi } from "../../utils/useApi";

export const getTeacherWithCourses = async () => {
  const response = await useApi<TeacherWithCoursesResponse>(`/teacher/courses?hasSubjectsAssignment=1`);
  return response;
};

export const getStudentsByCourseWithPointCategories = async (course: number, subject: number) => {
  const response = await useApi<StudentWithPointCategoriesResponse>(`/registry-points/courses/${course}/subjects/${subject}`);
  return response;
};

export const saveStudentsPoints = async (course: number, draftPoints: DraftPoints) => {
  const students = Object.entries(draftPoints).map(([studentId, points]) => ({
    id: Number(studentId),
    registered_points: points,
  }));

  const response = await useApi<StudentWithPointCategoriesResponse>(
    `/registry-points`,
    'POST',
    { points: students, grade: course }
  );
  return response;
};