import { useSetAtom } from "jotai";
import { IoMdBook } from "react-icons/io";
import AsyncSelect from "react-select/async";
import { MdPeopleOutline } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { actionModalAtom } from "../store/pointCategoryAssignmentStore";

export const CreateAndUpdatePointCategoryAssignment = () => {
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
          <label className="flex gap-2 items-center"><MdPeopleOutline />Cursos</label>
          <AsyncSelect
            cacheOptions
            placeholder="Buscar curso..."
            loadingMessage={() => "Buscando..."}
            noOptionsMessage={() => "Sin resultados"}
            // loadOptions={(value: string) => promiseOptions(value, 'grade')}
            unstyled
            // value={valuesAssignment.grade.id > 0 ? [{ value: valuesAssignment.grade.id, label: valuesAssignment.grade.label }] : null}
            classNames={{
              control: ({ isFocused }) =>
                `bg-[#1e2130] border rounded-lg px-2 py-3 ${isFocused ? "border-purple-600" : "border-[#2e3347]"
                }`,
              input: () => "text-white",
              placeholder: () => "text-white-500",
              menu: () => "bg-[#1e2130] border border-[#2e3347] rounded-lg mt-1",
              menuList: () => "p-1",
              option: ({ isFocused }) =>
                `rounded-md px-3 py-2 cursor-pointer text-white ${isFocused ? "bg-[#2e3347]" : "bg-transparent"
                }`,
              singleValue: () => "text-white",
              dropdownIndicator: () => "text-gray-500 hover:text-white",
              indicatorSeparator: () => "hidden",
              loadingMessage: () => "text-gray-500 py-2",
              noOptionsMessage: () => "text-gray-500 py-2",
            }}
            // onChange={(value) => handleChange(value, 'grade')}
            menuPosition="fixed"
          />
          {/* {
            valuesAssignment.grade.id <= 0 && (
              <span className="text-xs text-secondary">El curso es requerido</span>
            )
          } */}
        </div>

        {/* Select de asignaturas */}
        <div className="flex flex-col gap-1">
          <label className="flex gap-2 items-center"><IoMdBook />Asignaturas</label>
          <AsyncSelect
            cacheOptions
            placeholder="Buscar asignatura..."
            loadingMessage={() => "Buscando..."}
            noOptionsMessage={() => "Sin resultados"}
            // loadOptions={(value: string) => promiseOptions(value, 'subject')}
            unstyled
            // value={valuesAssignment.subject.id > 0 ? [{ value: valuesAssignment.subject.id, label: valuesAssignment.subject.label }] : null}
            classNames={{
              control: ({ isFocused }) =>
                `bg-[#1e2130] border rounded-lg px-2 py-3 ${isFocused ? "border-purple-600" : "border-[#2e3347]"
                }`,
              input: () => "text-white",
              placeholder: () => "text-white-500",
              menu: () => "bg-[#1e2130] border border-[#2e3347] rounded-lg mt-1",
              menuList: () => "p-1",
              option: ({ isFocused }) =>
                `rounded-md px-3 py-2 cursor-pointer text-white ${isFocused ? "bg-[#2e3347]" : "bg-transparent"
                }`,
              singleValue: () => "text-white",
              dropdownIndicator: () => "text-gray-500 hover:text-white",
              indicatorSeparator: () => "hidden",
              loadingMessage: () => "text-gray-500 py-2",
              noOptionsMessage: () => "text-gray-500 py-2",
            }}
            // onChange={(value) => handleChange(value, 'subject')}
            menuPosition="fixed"
          />
          {/* {
            valuesAssignment.subject.id <= 0 && (
              <span className="text-xs text-secondary">El curso es requerido</span>
            )
          } */}
        </div>
      </form>
    </div>
  )
}
