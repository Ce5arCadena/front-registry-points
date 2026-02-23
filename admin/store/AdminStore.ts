import { atom } from "jotai";
import type { School } from "../../shared/interfaces/schools";

export const SchoolAtom = atom<School>();
export const ActionSchool = atom("create");

