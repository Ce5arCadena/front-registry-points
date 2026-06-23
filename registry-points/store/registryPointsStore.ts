import { atom } from "jotai";
import {
    type Teacher,
    type StudentWithPointCategoriesResponse,
    type DraftPoints,
} from "../../shared/interfaces/registryPoints";

export const loadingAtom = atom(false);
export const actionModalAtom = atom("");
export const teacherAtom = atom<Teacher>();
export const studentsWithPointCategoriesAtom = atom<StudentWithPointCategoriesResponse>();
export const draftPointsAtom = atom<DraftPoints>({});
export const hasUnsavedChangesAtom = atom(false);

// Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);
export const itemOffsetAtom = atom(0);
export const currentPageAtom = atom(1);
export const totalCourses = atom(0);