import { atom } from "jotai";
import { type PointCategory } from "../../shared/interfaces/pointCategories";

export const loadingAtom = atom(false);
export const actionModalAtom = atom("");
export const pointCategoryAssignmentAtom = atom<PointCategory>();
export const idsPointCategoriesAssignmentsAtom = atom<number[]>([]);
export const pointCategoriesAssignmentsAtom = atom<PointCategory[]>([]);

// Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);
export const itemOffsetAtom = atom(0);
export const currentPageAtom = atom(1);
export const totalPointCategoriesAssignmentAtom = atom(0);