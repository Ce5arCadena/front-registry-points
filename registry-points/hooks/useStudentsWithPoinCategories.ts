import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  teacherAtom,
  loadingAtom,
  draftPointsAtom,
  hasUnsavedChangesAtom,
  studentsWithPointCategoriesAtom,
} from "../store/registryPointsStore";
import { getStudentsByCourseWithPointCategories, saveStudentsPoints } from "../api/queries";
import type { DraftPoints, RegistryPointStudent } from "../../shared/interfaces/registryPoints";

// Arma la estructura de los estudiantes para la tabla de asignación de puntos.
const initializeDraft = (students: RegistryPointStudent[]): DraftPoints =>
  students.reduce((acc, student) => {
    acc[student.id] = Object.entries(student.registered_points).reduce(
      (pts, [catId, val]) => ({ ...pts, [catId]: val ?? 0 }),
      {} as Record<string, number>
    );
    return acc;
  }, {} as DraftPoints);

export default function useStudentsWithPoinCategories(courseId: number, subjectId: number) {
  const navigate = useNavigate();
  const teacher = useAtomValue(teacherAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [draftPoints, setDraftPoints] = useAtom(draftPointsAtom);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useAtom(hasUnsavedChangesAtom);
  const [studentsData, setStudentsWithPointCategories] = useAtom(studentsWithPointCategoriesAtom);

  const courseName = teacher?.grades.find(g => g.id === courseId)?.name ?? '';
  const subjectName = teacher?.grades
    .flatMap(g => g.subjects)
    .find(s => s.id === subjectId)?.name ?? '';

  const fetchStudentsWithCategories = async () => {
    setLoading(true);
    try {
      const response = await getStudentsByCourseWithPointCategories(courseId, subjectId);
      setStudentsWithPointCategories(response);
      setDraftPoints(initializeDraft(response.data.students));
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los estudiantes con sus categorías de puntos. Comuniquese.');
      navigate('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handlePointChange = (studentId: number, categoryId: string, value: number) => {
    setDraftPoints(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [categoryId]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const savePoints = async () => {
    setLoading(true);
    try {
      const response = await saveStudentsPoints(courseId, draftPoints);
      toast.success(response.message);
      setHasUnsavedChanges(false);
      setDraftPoints({});
      navigate('/teacher/registry-points');
    } catch (error) {
      toast.error('Ha ocurrido un error al guardar los puntos. Inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return {
    studentsData,
    draftPoints,
    hasUnsavedChanges,
    courseName,
    subjectName,
    fetchStudentsWithCategories,
    handlePointChange,
    savePoints,
  };
}
