export interface CoursesInterface {
    data:    Course[];
    links:   Links;
    ok:      number;
    meta:    Meta;
    message: string;
}

export interface Course {
    id:       number;
    name:     string;
    subjects: Subject[];
}

interface Subject {
    id:              number;
    name:            string;
    pointCategories: PointCategory[];
}

interface PointCategory {
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