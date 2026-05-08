import { useState } from "react";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { type SingleValue } from "react-select";
import { searchCourses } from "../../courses/api/queries";
import { searchStudents } from "../../teachers/api/queries";
import { searchSubjects } from "../../subjects/api/queries";
import { type CourseSearch } from "../../shared/interfaces/courses";
import { type TeacherSearch } from "../../shared/interfaces/teachers";
import { actionModalAtom, assignmentsAtom, loadingAtom } from "../store/assignmentsStore";
import { type AssignmentsInterface, type AssignmentDataForm } from "../../shared/interfaces/assignments";

type Option = 'teacher' | 'grade' | 'subject' | 'academic_year';

export const useSelectHelpers = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const setAssignments = useSetAtom(assignmentsAtom);
  const setActionModal = useSetAtom(actionModalAtom);

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (0 in valuesAssignment) return;

    setLoading(true);
    try {
      const responseAssignments = await useApi<AssignmentsInterface>(`/teachers-subjects`, 'POST', valuesAssignment);
      if (responseAssignments.errors && Object.keys(responseAssignments.errors).length > 0) {
        const errors = responseAssignments.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };
      setAssignments([...responseAssignments.data]);
      setActionModal("");
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  return {
    onSubmit,
    handleChange,
    promiseOptions,
    valuesAssignment
  }
}

