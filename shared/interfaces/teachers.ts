export interface TeachersInterface {
    data:    Teacher[];
    links:   Links;
    ok:      number;
    meta:    Meta;
    message: string;
}

export interface ResponseTeacherInterface {
    ok: number;
    message: string;
    data?: Teacher
    errors?: string[] | Record<string, string[]>
}

export interface Teacher {
    id:         number;
    full_name:  string;
    document:   string;
    phone:      string;
    status:     string;
    user:       User;
    subjects:   Subject[];
    grades:     Grade[];
    created_at: Date;
    updated_at: Date;
}

interface User {
    id:         number;
    email:      string;
    role:       string;
    status:     string;
    created_at: Date;
    updated_at: Date;
}

interface Grade {
    id:   number;
    name: string;
}

interface Subject {
    id:     number;
    name:   string;
    status: string;
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
    full_name: string;
    document: number;
    phone: number;
    password?: string;
    email: string;
}

// Búsqueda de maestros
export interface SearchTeachersInterface {
    message: string;
    data:    TeacherSearch[];
}

export interface TeacherSearch {
    id:         number;
    full_name:  string;
    document:   string;
    phone:      string;
    status:     string;
    school_id:  number;
    user_id:    number;
    created_at: Date;
    updated_at: Date;
}