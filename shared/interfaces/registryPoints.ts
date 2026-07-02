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

// Estudiantes de registro de puntos con categorías de puntos para registro de puntos
export interface StudentWithPointCategoriesResponse {
  ok: number;
  data: StudentsWithPointCategories;
  message: string;
}

export interface StudentsWithPointCategories {
  students: RegistryPointStudent[];
  point_category_contexts: RegistryPointCategory[];
}

export interface RegistryPointStudent {
  id: number;
  name: string;
  last_name: string;
  registered_points: Record<string, number | null>;
}

export interface RegistryPointCategory {
  id: number;
  name: string;
  max_points: number;
}

export type DraftPoints = Record<number, Record<string, number>>;

export interface StudentsPointsMatrixProps {
  students: RegistryPointStudent[];
  categories: RegistryPointCategory[];
  draftPoints: DraftPoints;
  hasUnsavedChanges: boolean;
  courseName: string;
  subjectName: string;
  onPointChange: (studentId: number, categoryId: string, value: number) => void;
  onSave: () => void;
  onBack: () => void;
}