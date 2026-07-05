export interface AdminTeacher {
  ok: number;
  message: string;
  errors?: [] | string;
  data?: AdminTeacherData;
}

export interface AdminTeacherData {
  pointCategoriesCount: number,
  hasPoincategoryContext: number
}