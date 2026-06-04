import Select from 'react-select';
import { useAtomValue, useSetAtom } from "jotai";
import { MdPeopleOutline } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SelectOption } from '../../shared/interfaces';
import { useSelectPointCategories } from '../hooks/useSelectPointCategories';
import { actionModalAtom, teacherCoursesAtom } from "../store/pointCategoryAssignmentStore";

export const CreateAndUpdatePointCategoryAssignment = () => {
  useSelectPointCategories();
  const teacherCourses = useAtomValue(teacherCoursesAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setActionModal("");
          // setValuesAssignment(INITIAL_ASSIGNMENT_STATE)
        }}
      />

      <form
        autoComplete="off"
        // onSubmit={onSubmit}
        className='w-[35%] flex flex-col gap-2 p-3 rounded-lg border border-dark-bg-elevated'
      >
        {/* Select de cursos */}
        <div className="flex flex-col gap-1">
          <label className="flex gap-2 items-center"><MdPeopleOutline />Mis Cursos</label>
          <Select<SelectOption>
            classNames={{
              control: () => "!bg-[#1e2130] !border-[#2e3347] !rounded-lg !shadow-none",
              container: () => "!bg-transparent",
              input: () => "!text-white",
              placeholder: () => "!text-gray-400",
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
            defaultValue={teacherCourses[0]}
            isSearchable={true}
            name="course"
            options={teacherCourses}
            placeholder="Selecciona un curso"
          />
          {/* {
            valuesAssignment.grade.id <= 0 && (
              <span className="text-xs text-secondary">El curso es requerido</span>
            )
          } */}
        </div>
      </form>
    </div>
  )
}
