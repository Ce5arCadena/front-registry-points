import { useSetAtom } from "jotai";
import AsyncSelect from 'react-select/async';
import { IoCloseCircleOutline } from "react-icons/io5"
import { handleChange, promiseOptions } from "../helpers/selectHelpers";
import { actionModalAtom, assignmentAtom } from "../store/assignmentsStore";

export const ModalCreateAndUpdateAssignment = () => {
  const setAssignment = useSetAtom(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          // reset();
          setActionModal("");
        }}
      />

      <form
        autoComplete="off"
        // onSubmit={handleSubmit(onSubmit)}
        className='w-[35%] flex flex-col gap-2 bg-light-bg-secondary p-2 rounded-lg'
      >
        {/* Select de maestros */}
        <div className="">
          <label className="text-dark-bg">Maestros</label>
          <AsyncSelect
            cacheOptions
            placeholder="Buscar maestro..."
            loadingMessage={() => "Buscando..."}
            noOptionsMessage={() => "Sin resultados"}
            loadOptions={(value: string) => promiseOptions(value, 'TEACHER')}
            unstyled
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
            onChange={handleChange}
          />
        </div>

        {/* Select de cursos */}
        <div className="">
          <label className="text-dark-bg">Cursos</label>
          <AsyncSelect
            cacheOptions
            placeholder="Buscar curso..."
            loadingMessage={() => "Buscando..."}
            noOptionsMessage={() => "Sin resultados"}
            loadOptions={(value: string) => promiseOptions(value, 'COURSE')}
            unstyled
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
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  )
}
