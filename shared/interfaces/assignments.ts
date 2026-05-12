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
    grade: number;
    teacher: number;
    subject: number;
    academic_year: number;
}