import {
  actionModalAtom,
  teacherCoursesAtom,
  teacherSubjectsAtom,
  pointsCategorySelectAtom,
  formAssignmentPointCategoryAtom,
} from "../store/pointCategoryAssignmentStore";

import Select from 'react-select';
import { BiCategory } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type SelectOption } from '../../shared/interfaces';
import { MdOutlineSubject, MdPeopleOutline } from "react-icons/md";
import { useSelectPointCategories } from '../hooks/useSelectPointCategories';
import { INITIAL_VALUES_ASSIGNMENT } from "../../shared/interfaces/pointCategories";

export const CreateAndUpdatePointCategoryAssignment = () => {
  const setActionModal = useSetAtom(actionModalAtom);
  const teacherCourses = useAtomValue(teacherCoursesAtom);
  const teacherSubjects = useAtomValue(teacherSubjectsAtom);

  const { 
    onSubmit,
    onChangeSelectsAssignments, 
  } = useSelectPointCategories();
  const pointCategoriesSelect = useAtomValue(pointsCategorySelectAtom);
  const [formAssignmentPointCategory, setFormAssignmentPointCategory] = useAtom(formAssignmentPointCategoryAtom);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setActionModal("");
          setFormAssignmentPointCategory(INITIAL_VALUES_ASSIGNMENT);
        }}
      />

      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className='w-[35%] flex flex-col gap-2 p-3 rounded-lg border border-dark-bg-elevated'
      >
        {/* Select de categorías de puntos */}
        <div className="flex flex-col gap-1">
          <label className="flex gap-2 items-center text-sm"><BiCategory />Categorías de Puntos</label>
          <Select<SelectOption>
            classNames={{
              control: () => "!bg-[#1e2130] !border-[#2e3347] !rounded-lg !shadow-none",
              container: () => "!bg-transparent",
              input: () => "!text-white",
              placeholder: () => "!text-gray-400 text-sm",
              menu: () => "!bg-[#1e2130] !border !border-[#2e3347] !rounded-lg !mt-1",
              menuList: () => "!p-1",
              singleValue: () => "!text-white",
              option: (state) =>
                state.isFocused
                  ? "!bg-[#2e3347] !text-white !rounded-md"
                  : "!text-gray-300 !rounded-md",
              dropdownIndicator: () => "!text-gray-500 hover:!text-white",
              indicatorSeparator: () => "!hidden",
              noOptionsMessage: () => "!text-gray-500 !py-2",
            }}
            classNamePrefix="select"
            value={
              formAssignmentPointCategory.pointCategory && formAssignmentPointCategory.pointCategory.value ? formAssignmentPointCategory.pointCategory : pointCategoriesSelect[0]
            }
            isSearchable={true}
            name="course"
            options={pointCategoriesSelect}
            placeholder="Selecciona una categoría de puntos"
            onChange={(e) =>  onChangeSelectsAssignments(e, 'pointCategory')}
          />
          {
            !formAssignmentPointCategory.pointCategory.value && (
              <span className="text-xs text-secondary">La categoría de puntos es requerida</span>
            )
          }
        </div>

        {/* Select de cursos */}
        <div className="flex flex-col gap-1">
          <label className="flex gap-2 items-center text-sm"><MdPeopleOutline />Mis Cursos</label>
          <Select<SelectOption>
            classNames={{
              control: () => "!bg-[#1e2130] !border-[#2e3347] !rounded-lg !shadow-none",
              container: () => "!bg-transparent",
              input: () => "!text-white",
              placeholder: () => "!text-gray-400 text-sm",
              menu: () => "!bg-[#1e2130] !border !border-[#2e3347] !rounded-lg !mt-1",
              menuList: () => "!p-1",
              singleValue: () => "!text-white",
              option: (state) =>
                state.isFocused
                  ? "!bg-[#2e3347] !text-white !rounded-md"
                  : "!text-gray-300 !rounded-md",
              dropdownIndicator: () => "!text-gray-500 hover:!text-white",
              indicatorSeparator: () => "!hidden",
              noOptionsMessage: () => "!text-gray-500 !py-2",
            }}
            classNamePrefix="select"
            value={
              formAssignmentPointCategory.course && formAssignmentPointCategory.course.value ? formAssignmentPointCategory.course : teacherCourses[0]
            }
            isSearchable={true}
            name="course"
            options={teacherCourses}
            placeholder="Selecciona un curso"
            onChange={(e) => onChangeSelectsAssignments(e, 'course')} 
          />
          {
            !formAssignmentPointCategory.course.value && (
              <span className="text-xs text-secondary">El curso es requerido</span>
            )
          }
        </div>

        {/* Select de asignaturas */}
        <div className="flex flex-col gap-1">
          <label className="flex gap-2 items-center text-sm"><MdOutlineSubject />Mis Asignaturas</label>
          <Select<SelectOption>
            classNames={{
              control: () => "!bg-[#1e2130] !border-[#2e3347] !rounded-lg !shadow-none",
              container: () => "!bg-transparent",
              input: () => "!text-white",
              placeholder: () => "!text-gray-400 text-sm",
              menu: () => "!bg-[#1e2130] !border !border-[#2e3347] !rounded-lg !mt-1",
              menuList: () => "!p-1",
              singleValue: () => "!text-white",
              option: (state) =>
                state.isFocused
                  ? "!bg-[#2e3347] !text-white !rounded-md"
                  : "!text-gray-300 !rounded-md",
              dropdownIndicator: () => "!text-gray-500 hover:!text-white",
              indicatorSeparator: () => "!hidden",
              noOptionsMessage: () => "!text-gray-500 !py-2",
            }}
            classNamePrefix="select"
            value={
              formAssignmentPointCategory.subject && formAssignmentPointCategory.subject.value ? formAssignmentPointCategory.subject : teacherSubjects[0]
            }
            isSearchable={true}
            name="subject"
            options={teacherSubjects}
            placeholder="Selecciona una asignatura"
            onChange={(e) => onChangeSelectsAssignments(e, 'subject')}
          />
          {
            !formAssignmentPointCategory.subject.value && (
              <span className="text-xs text-secondary">La asignatura es requerida</span>
            )
          }
        </div>

        <div className="flex gap-2 mt-4 justify-center">
          <button
            type="submit"
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Asignar
          </button>

          <button
            type="button"
            onClick={() => {
              setFormAssignmentPointCategory(INITIAL_VALUES_ASSIGNMENT);
              setActionModal("");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
