export interface AssignmentsInterface {
    meta:    Meta;
    links:   Links;
    ok:      number;
    message: string;
    data:    AssignmentsCourseInterface[];
}

export interface AssignmentsCourseInterface {
    id:            number;
    teacher:       Teacher;
    grade:         Course;
    academic_year: string;
    status:        string;
    created_at:    Date;
    updated_at:    Date;
}

export interface TeacherSubject {
    id:     number;
    name:   string;
    status: string;
}

export interface GradeElement {
    id:   number;
    name: string;
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

export interface GradeSubject {
    id:              number;
    name:            string;
    pointCategories: PointCategory[];
}

export interface Teacher {
    id:         number;
    full_name:  string;
    document:   string;
    phone:      string;
    status:     string;
    user:       User;
    subjects:   TeacherSubject[];
    grades:     GradeElement[];
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id:         number;
    email:      string;
    role:       string;
    status:     string;
    created_at: Date;
    updated_at: Date;
}

export interface Course {
    id:       number;
    name:     string;
    subjects: GradeSubject[];
}

export interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  null;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        Link[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface Link {
    url:    null | string;
    label:  string;
    page:   number | null;
    active: boolean;
}

// Fourmulario crear o editar
export interface FormCourseData {
    teacher: number;
    grade: number;
    subject: number;
    academic_year?: number;
}