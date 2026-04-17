export interface StudentsInterface {
    data:    Student[];
    links:   Links;
    ok:      number;
    meta:    Meta;
    message: string;
}

export interface ResponseStudentInterface {
    ok: number;
    message: string;
    data?: Student
    errors?: string[] | Record<string, string[]>
}

export interface Student {
    id:         number;
    name:       string;
    last_name:  string;
    document:   string;
    phone:      string;
    grade:      Grade;
    status:     string;
    created_at: Date;
    updated_at: Date;
}

interface Grade {
    id:       number;
    name:     string;
    subjects: Subject[];
}

interface Subject {
    id:              number;
    name:            string;
    pointCategories: PointCategory[];
}

export interface PointCategory {
    id:         number;
    name:       string;
    max_points: number;
    teacher_id: number;
    subject_id: number;
    school_id:  number;
    status:     string;
    created_at: Date;
    updated_at: Date;
}

interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  null;
}

interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        Link[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

interface Link {
    url:    null | string;
    label:  string;
    page:   number | null;
    active: boolean;
}

// Fourmulario crear o editar
export interface FormCourseData {
    name: string;
    last_name: string;
    document: number;
    phone: number;
    grade: number;
}