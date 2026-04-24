import { atom } from "jotai";
import { type AssignmentsCourseInterface } from "../../shared/interfaces/assignments";

export const loadingAtom = atom(false);
export const isSearchAtom = atom(false);
export const actionModalAtom = atom("");
export const totalAssignmentsAtom = atom(0);
export const selectedIdsAtom = atom<number[]>([]);
export const assignmentsAtom = atom<AssignmentsCourseInterface[]>([]);
export const dataAssignmentsAtom = atom<AssignmentsCourseInterface[]>([]);
export const assignmentAtom = atom<AssignmentsCourseInterface | null>(null);

// Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);
export const currentPageAtom = atom(1);