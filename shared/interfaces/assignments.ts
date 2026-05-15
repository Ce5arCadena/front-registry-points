// Estado inicial de asignaciones
export const INITIAL_ASSIGNMENT_STATE = {
  grade: { id: 0, label: "" },
  teacher: { id: 0, label: "" },
  subject: { id: 0, label: "" },
  academic_year: { id: 0, label: "" }
};

export interface AssignmentsInterface {
    data:    Assignments[];
    message: string;
    errors?: string[] | Record<string, string[]>
}

export interface Assignments {
    id:          number;
    full_name:   string;
    assignments: Assignment[];
}

export interface Assignment {
    grade:    string;
    grade_id: number;
    subjects: Subject[];
}

export interface Subject {
    id:   number;
    name: string;
    assignment_id: number;
    year: number;
}

// Fourmulario crear o editar
export interface AssignmentDataForm {
    grade: AssignmentLabel;
    teacher: AssignmentLabel;
    subject: AssignmentLabel;
    academic_year: AssignmentLabel;
    assignment_id?: number;
}

interface AssignmentLabel {
    id: number;
    label: string;
}