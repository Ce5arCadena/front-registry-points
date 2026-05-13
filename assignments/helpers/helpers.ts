import { type AssignmentDataForm, type Assignments } from "../../shared/interfaces/assignments";

export const formatAssignmentData = (assignment: Assignments, idSubject: number): AssignmentDataForm => {
  const idTeacher = assignment.id;
  const dataAssign = assignment.assignments
    .map(assign => ({
      ...assign,
      subjects: assign.subjects.filter(subjectFilter => subjectFilter.assignment_id == idSubject)
    }))
    .filter(assign => assign.subjects.length > 0);
  const idCourse = dataAssign[0].grade_id;
  const subjectId = dataAssign[0].subjects[0].id;
  const year = dataAssign[0].subjects[0].year;

  return {
    teacher: idTeacher,
    subject: subjectId,
    grade: idCourse,
    academic_year: year
  };
}