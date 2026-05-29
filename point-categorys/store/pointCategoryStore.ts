import { atom } from "jotai";
import { type PointCategory } from "../../shared/interfaces/pointCategories";

export const loadingAtom = atom(false);
export const actionModalAtom = atom("");
export const pointCategoryAtom = atom<PointCategory>();
export const idsPointCategoriesAtom = atom<number[]>([]);
export const pointCategorysAtom = atom<PointCategory[]>([]);

// Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);
export const itemOffsetAtom = atom(0);
export const currentPageAtom = atom(1);
export const totalPointCategoriesAtom = atom(0);