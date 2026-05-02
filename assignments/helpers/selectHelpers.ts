import { type SingleValue } from "react-select";
import { searchCourses } from "../../courses/api/queries";
import { searchStudents } from "../../teachers/api/queries";
import { type CourseSearch } from "../../shared/interfaces/courses";
import { type TeacherSearch } from "../../shared/interfaces/teachers";

type Option = 'TEACHER' | 'COURSE' | 'SUBJECT';

const getData = async (value: string, type: Option) => {
  let result: TeacherSearch[] | CourseSearch[] = [];
  if (type === "TEACHER") {
    result = await searchStudents(value);
    if (result && result?.length > 0) {
      return result.map(teacher => ({
        value: teacher.id,
        label: teacher.full_name
      }));
    }
  } else if(type === "COURSE") {
    result = await searchCourses(value);
    if (result && result?.length > 0) {
      return result.map(teacher => ({
        value: teacher.id,
        label: teacher.name
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

const handleChange = (newValue: SingleValue<{ value: number, label: string }>) => {

}

export {
  promiseOptions,
  handleChange
}