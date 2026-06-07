import { atom } from "jotai";
import { type SelectOption } from "../../shared/interfaces";
import { INITIAL_VALUES_ASSIGNMENT, type PointCategory } from "../../shared/interfaces/pointCategories";

export const loadingAtom = atom(false);
export const actionModalAtom = atom("");
export const teacherCoursesAtom = atom<SelectOption[]>([]);
export const teacherSubjectsAtom = atom<SelectOption[]>([]);
export const pointsCategorySelectAtom = atom<SelectOption[]>([]);
export const pointCategoryAssignmentAtom = atom<PointCategory>();
export const idsPointCategoriesAssignmentsAtom = atom<number[]>([]);
export const pointCategoriesAssignmentsAtom = atom<PointCategory[]>([]);
export const formAssignmentPointCategoryAtom = atom(INITIAL_VALUES_ASSIGNMENT);

// Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);
export const itemOffsetAtom = atom(0);
export const currentPageAtom = atom(1);
export const totalPointCategoriesAssignmentAtom = atom(0);