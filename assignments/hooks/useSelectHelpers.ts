import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { type SingleValue } from "react-select";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { searchCourses } from "../../courses/api/queries";
import { searchStudents } from "../../teachers/api/queries";
import { searchSubjects } from "../../subjects/api/queries";
import { type CourseSearch } from "../../shared/interfaces/courses";
import { type TeacherSearch } from "../../shared/interfaces/teachers";
import { INITIAL_ASSIGNMENT_STATE, type AssignmentsInterface } from "../../shared/interfaces/assignments";
import { actionModalAtom, assignmentAtom, assignmentsAtom, loadingAtom, valuesAssignmentAtom } from "../store/assignmentsStore";

type Option = 'teacher' | 'grade' | 'subject' | 'academic_year';

export const useSelectHelpers = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const assignment = useAtomValue(assignmentAtom);
  const setAssignments = useSetAtom(assignmentsAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  const [valuesAssignment, setValuesAssignment] = useAtom(valuesAssignmentAtom);

  const getData = async (value: string, type: Option) => {
    let result: TeacherSearch[] | CourseSearch[] = [];
    if (type === "grade" || type === "subject") {
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
    setValuesAssignment((prev) => {
      console.log(prev, type, newValue)
      return {
        ...prev,
        [type]: {
          id: newValue?.value,
          label: newValue?.label
        }
      }
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valuesAssignment || Object.keys(valuesAssignment).length <= 0) return;

    setLoading(true);
    try {
      const data = {
        grade: valuesAssignment.grade.id,
        teacher: valuesAssignment.teacher.id,
        subject: valuesAssignment.subject.id,
        academic_year: valuesAssignment.academic_year.id
      };

      const METHOD = valuesAssignment.assignment_id ? 'PUT' : 'POST'; 
      const URL = valuesAssignment.assignment_id ? `/teachers-subjects/${valuesAssignment.assignment_id}` : `/teachers-subjects`;
      const responseAssignments = await useApi<AssignmentsInterface>(URL, METHOD, data);
      if (responseAssignments.errors && Object.keys(responseAssignments.errors).length > 0) {
        const errors = responseAssignments.errors;
        const errorsFormat = Object.keys(errors).map(item => {
          return (errors as Record<string, string[]>)[item][0] + "\n ";
        }).join(" ");
        toast.error(errorsFormat);
        return false;
      };
      setValuesAssignment(INITIAL_ASSIGNMENT_STATE);
      setAssignments([...responseAssignments.data]);
      setActionModal("");
      toast.success(responseAssignments.message);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (assignment) {
      setValuesAssignment({
        academic_year: {
          id: assignment.assignments[0].subjects[0].year,
          label: String(assignment.assignments[0].subjects[0].year)
        },
        grade: {
          id: assignment.assignments[0].grade_id,
          label: assignment.assignments[0].grade
        },
        subject: {
          id: assignment.assignments[0].subjects[0].id,
          label: assignment.assignments[0].subjects[0].name
        },
        teacher: {
          id: assignment.id,
          label: assignment.full_name
        },
        assignment_id: assignment.assignments[0].subjects[0].assignment_id
      });
    };
  }, [assignment]);

  return {
    onSubmit,
    handleChange,
    promiseOptions,
  }
}

