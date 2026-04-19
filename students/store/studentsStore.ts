import { atom } from 'jotai';
import { type Student } from '../../shared/interfaces/students';

export const loadingAtom = atom(false);
export const currentPageAtom = atom(1);
export const isSearchAtom = atom(false);
export const totalStudentsAtom = atom(0);
export const studentsAtom = atom<Student[]>([]);
export const selectedIdsAtom = atom<number[]>([]);
export const dataStudentsAtom = atom<Student[]>([]);