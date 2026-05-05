import { useState } from "react";
import { type SingleValue } from "react-select";
import { searchCourses } from "../../courses/api/queries";
import { searchStudents } from "../../teachers/api/queries";
import { searchSubjects } from "../../subjects/api/queries";
import { type CourseSearch } from "../../shared/interfaces/courses";
import { type TeacherSearch } from "../../shared/interfaces/teachers";
import { type AssignmentDataForm } from "../../shared/interfaces/assignments";

type Option = 'teacher' | 'grade' | 'subject' | 'academic_year';

export const useSelectHelpers = () => {
  const [valuesAssignment, setValuesAssignment] = useState<AssignmentDataForm>({
    grade: 0,
    subject: 0,
    teacher: 0,
    academic_year: 0
  });

  const getData = async (value: string, type: Option) => {
    let result: TeacherSearch[] | CourseSearch[] = [];
    if(type === "grade" || type === "subject") {
      result = type === "grade" ? await searchCourses(value) : await searchSubjects(value);
      if (result && result?.length > 0) {
        return result.map(teacher => ({
          value: teacher.id,
          label: teacher.name
        }));
      }
    } else {
      result = await searchStudents(value);
      if (result && result?.length > 0) {
        return result.map(teacher => ({
          value: teacher.id,
          label: teacher.full_name
        }));
      }
    }
  
    return [];
  };
  
  const promiseOptions = (inputValue: string, type: Option) =>
    new Promise<{ value: number, label: string }[]>((resolve) => {
      setTimeout(() => {
        resolve(getData(inputValue, type));
      }, 1000);
    });
  
  const handleChange = (newValue: SingleValue<{ value: number, label: string }>, type: Option) => {
    setValuesAssignment((prev) => ({
      ...prev,
      [type]: newValue?.value
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (0 in valuesAssignment) return;
  };

  return {
    onSubmit,
    handleChange,
    promiseOptions,
    valuesAssignment
  }
}

