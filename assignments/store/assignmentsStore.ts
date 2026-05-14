import { atom } from "jotai";
import { type AssignmentDataForm, type Assignments, type AssignmentsInterface } from "../../shared/interfaces/assignments";

export const loadingAtom = atom(false);
export const isSearchAtom = atom(false);
export const actionModalAtom = atom("");
export const totalAssignmentsAtom = atom(0);
export const selectedIdsAtom = atom<number[]>([]);
export const assignmentsAtom = atom<Assignments[]>([]);
export const idCourseAssignmentAtom = atom<null | number>();
export const idSubjectAssignmentAtom = atom<null | number>();
export const assignmentAtom = atom<Assignments | null>(null);
export const valuesAssignmentAtom = atom<AssignmentDataForm>({
  grade: { id: 0, label: "" },
  teacher: { id: 0, label: "" },
  subject: { id: 0, label: "" },
  academic_year: { id: 0, label: "" }
});
export const dataAssignmentsAtom = atom<AssignmentsInterface[]>([]);

// Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);
export const currentPageAtom = atom(1);