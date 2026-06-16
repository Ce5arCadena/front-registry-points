export interface TeacherWithCoursesResponse {
  ok: number;
  data: Teacher;
  message: string;
  errors?: string[];
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
  grades: Course[];
}

export interface Course {
  id: number;
  name: string;
  school_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  students_count: number;
  subjects: Subject[];
}

export interface Subject {
  id: number;
  name: string;
  school_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  point_category_contexts: PointCategoryContext[];
  max_points?: number;
  teacher_id?: number;
}

export interface PointCategoryContext {
  id: number;
  point_category_id: number;
  grade_id: number;
  subject_id: number;
  status: string;
  school_id: number;
  created_at: Date;
  updated_at: Date;
  point_category: Subject;
}