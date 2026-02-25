export interface SchoolsInterface {
    data:    School[];
    links:   Links;
    ok:      number;
    meta:    Meta;
    message: string;
}

export interface School {
    id:         number;
    name:       string;
    status:     string;
    user:       User;
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

// Formulario agregar
export interface FormSchoolData{
    name: string;
    email: string;
    password: string;
}

// Creación de colegio
export interface SchoolResponse {
    ok:      number;
    message: string;
    data:    School;
}