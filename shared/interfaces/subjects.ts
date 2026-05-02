export interface SubjectsInterface {
    data:    Subject[];
    links:   Links;
    ok:      number;
    meta:    Meta;
    message: string;
}

export interface ResponseSubjectInterface {
    ok: number;
    message: string;
    data?: Subject
    errors?: string[]
}

export interface Subject {
    id:         number;
    name:       string;
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

export interface SearchSubjectInterface {
    message: string;
    data:    Subject[];
}

// Fourmulario crear o editar
export interface FormCourseData {
    name: string
}