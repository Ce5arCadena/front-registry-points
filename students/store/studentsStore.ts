import { atom } from 'jotai';
import { type Student } from '../../shared/interfaces/students';

// Estados de estudiantes
export const loadingAtom = atom(false);
export const currentPageAtom = atom(1);
export const isSearchAtom = atom(false);
export const actionModalAtom = atom("");
export const totalStudentsAtom = atom(0);
export const studentsAtom = atom<Student[]>([]);
export const selectedIdsAtom = atom<number[]>([]);
export const dataStudentsAtom = atom<Student[]>([]);
export const studentAtom = atom<Student | null>(null);

//Estados de Paginación
export const endAtom = atom(0);
export const startAtom = atom(0);
export const pageCountAtom = atom(0);