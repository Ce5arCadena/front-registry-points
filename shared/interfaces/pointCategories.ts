export interface PointCategoriesResponse {
  data: PointCategory[];
  links: Links;
  meta: Meta;
  ok: number;
  errors?: string[];
  message: string;
}

export interface PointCategory {
  id: number;
  name: string;
  max_points: number;
  teacher: Teacher;
  context: Context[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Context {
  id: number;
  point_category_id: number;
  grade_id: number;
  subject_id: number;
  status: string;
  school_id: number;
  created_at: Date;
  updated_at: Date;
  course: Course;
  subject: Course;
}

export interface Course {
  id: number;
  name: string;
  school_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Subject {
  id: number;
  name: string;
  status: string;
}

export interface Teacher {
  id: number;
  full_name: string;
  document: string;
  phone: string;
  status: string;
  school_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  page: number | null;
  active: boolean;
}

// Formulario 
export interface FormPointCategory {
  name: string;
  max_points: string;
}

// Formulario de crear o editar asignación de categoria de puntos
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

interface itemSelect {
  value: string;
  label: string;
}

export interface FormAssignPointCategories {
  pointCategoryContext?: number;
  course: itemSelect;
  subject: itemSelect;
  pointCategory: itemSelect;
}

export interface SaveAsisgnment {
  course: number,
  subject: number,
  pointCategoryId:  number,
}

export const INITIAL_VALUES_ASSIGNMENT: FormAssignPointCategories = {
  pointCategoryContext: 0,
  course: { value: '', label: '' },
  subject: { value: '', label: '' },
  pointCategory: { value: '', label: '' }
}