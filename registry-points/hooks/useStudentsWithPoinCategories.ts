import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { getStudentsByCourseWithPointCategories, saveStudentsPoints } from "../api/queries";
import {
  draftPointsAtom,
  hasUnsavedChangesAtom,
  loadingAtom,
  studentsWithPointCategoriesAtom,
  teacherAtom,
} from "../store/registryPointsStore";
import type { DraftPoints, RegistryPointStudent } from "../../shared/interfaces/registryPoints";

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
  const [studentsData, setStudentsWithPointCategories] = useAtom(studentsWithPointCategoriesAtom);
  const [draftPoints, setDraftPoints] = useAtom(draftPointsAtom);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useAtom(hasUnsavedChangesAtom);

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
      await saveStudentsPoints(courseId, subjectId, draftPoints);
      toast.success('Puntos guardados correctamente.');
      setHasUnsavedChanges(false);
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
