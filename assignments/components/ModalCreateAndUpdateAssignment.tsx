import { useSetAtom } from "jotai";
import AsyncSelect from 'react-select/async';
import { IoCloseCircleOutline } from "react-icons/io5"
import { searchStudents } from "../../teachers/api/queries";
import { actionModalAtom, assignmentAtom } from "../store/assignmentsStore";

export const ModalCreateAndUpdateAssignment = () => {
  const setAssignment = useSetAtom(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  const getTeachers = async (value: string) => {
    const result = await searchStudents(value);
    if (result && result?.length > 0) {
      return result.map(teacher => ({
        value: teacher.id,
        label: teacher.full_name
      }));
    }

    return [];
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<{ value: number, label: string }[]>((resolve) => {
      setTimeout(() => {
        resolve(getTeachers(inputValue));
      }, 1000);
    });

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
        className='w-[30%] flex flex-col gap-2'
      >
        <AsyncSelect
          cacheOptions
          placeholder="Buscar maestro..."
          loadingMessage={() => "Buscando..."}
          noOptionsMessage={() => "Sin resultados"}
          loadOptions={promiseOptions}
          unstyled
          classNames={{
            control: ({ isFocused }) =>
              `bg-[#1e2130] border rounded-lg px-2 py-1 ${isFocused ? "border-purple-600" : "border-[#2e3347]"
              }`,
            input: () => "text-white",
            placeholder: () => "text-gray-500",
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
        />
      </form>
    </div>
  )
}
