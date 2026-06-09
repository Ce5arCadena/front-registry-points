import { 
  loadingAtom, 
  actionModalAtom,
  teacherCoursesAtom, 
  teacherSubjectsAtom,
  pointsCategorySelectAtom,
  pointCategoriesAssignmentsAtom, 
  formAssignmentPointCategoryAtom,
  totalPointCategoriesAssignmentAtom,
} from "../store/pointCategoryAssignmentStore";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";
import { type SingleValue } from "react-select";
import { getMyCourses } from "../../courses/api/queries";
import { getMySubjects } from "../../subjects/api/queries";
import { type SelectOption } from "../../shared/interfaces";
import { createOrUpdateAssignment } from "../../point-categorys/api/queries";
import { INITIAL_VALUES_ASSIGNMENT } from "../../shared/interfaces/pointCategories";

export const useSelectPointCategories = () => {
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const setTeacherCoursesAtom = useSetAtom(teacherCoursesAtom);
  const setTeacherSubjectsAtom = useSetAtom(teacherSubjectsAtom);
  const setPointsCategorySelect = useSetAtom(pointsCategorySelectAtom);
  const setPointCategoriesAssignment = useSetAtom(pointCategoriesAssignmentsAtom);
  const setTotalPointCategoriesAssignment = useSetAtom(totalPointCategoriesAssignmentAtom);
  const [formAssignmentPointCategory, setFormAssignmentPointCategory] = useAtom(formAssignmentPointCategoryAtom);

  const getCoursesOptions = async() => {
    setLoading(true);
    try {
      const response = await getMyCourses();
      if(response && response.data && response.data.grades.length > 0) {
        const formatGrades = response.data.grades.map(grade => ({
          value: String(grade.id),
          label: grade.name
        }));
        setTeacherCoursesAtom(formatGrades);
      } else {
        setTeacherCoursesAtom([]);
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener tus cursos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const getSubjectsOptions = async(courseId: number) => {
    setLoading(true);
    try {
      const response = await getMySubjects(courseId);
      if(response && response.data && response.data.subjects.length > 0) {
        const formatSubjects = response.data.subjects.map(subject => ({
          value: String(subject.id),
          label: subject.name
        }));
        setTeacherSubjectsAtom(formatSubjects);
      } else {
        setTeacherSubjectsAtom([]);
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener tus asignaturas. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const onChangeSelectsAssignments = (data: SingleValue<SelectOption>, type: string) => {
    if(type === 'course' && data) {
      setTeacherSubjectsAtom([]);
      setFormAssignmentPointCategory(prev => ({
        ...prev,
        subject: { value: '', label: '' },
      }));
      
      getSubjectsOptions(Number(data.value));
    };

    setFormAssignmentPointCategory(prev => ({
      ...prev,
      [type]: data ? data : { value: '', label: '' }
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(
      !formAssignmentPointCategory.pointCategory.value || 
      !formAssignmentPointCategory.course.value || 
      !formAssignmentPointCategory.subject.value
    ) return toast.error('Todos los campos son requeridos');

    setLoading(true);
    try {
      const URL = '/point-category-contexts';
      const METHOD = 'POST';
  
      const data = {
        pointCategoryId: Number(formAssignmentPointCategory.pointCategory.value),
        course: Number(formAssignmentPointCategory.course.value),
        subject: Number(formAssignmentPointCategory.subject.value)
      };
  
      const response = await createOrUpdateAssignment(data, METHOD, URL);
      if (response.ok !== 200 && response.errors) {
        const errors = response.errors?.join(" ");
        toast.error(errors);
        return false;
      };
  
      toast.success(response.message);
      setTotalPointCategoriesAssignment(response.data.length);
      setPointsCategorySelect(response.data.map(pointCategory => ({
        value: String(pointCategory.id),
        label: pointCategory.name
      })));
      setPointCategoriesAssignment(response.data);
      setFormAssignmentPointCategory(INITIAL_VALUES_ASSIGNMENT);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al guardar la asignación de categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoursesOptions();
  }, []);

  return {
    onSubmit,
    getCoursesOptions, 
    getSubjectsOptions,
    onChangeSelectsAssignments 
  }
}
