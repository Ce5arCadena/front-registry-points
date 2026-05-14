import Select from 'react-select';
import { useEffect } from 'react';
import { IoMdBook } from "react-icons/io";
import { YEARS } from "../../shared/data";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import AsyncSelect from 'react-select/async';
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelectHelpers } from '../hooks/useSelectHelpers';
import { MdOutlineDateRange, MdPeopleOutline } from "react-icons/md";
import { actionModalAtom, assignmentAtom, valuesAssignmentAtom } from "../store/assignmentsStore";

export const ModalCreateAndUpdateAssignment = () => {
  const {
    onSubmit,
    handleChange,
    promiseOptions,
  } = useSelectHelpers();

  const assignment = useAtomValue(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const [valuesAssignment, setValuesAssignment] = useAtom(valuesAssignmentAtom);

  useEffect(() => {
    if (assignment) {
      console.log(assignment);
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

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setActionModal("");
        }}
      />

      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className='w-[35%] flex flex-col gap-2 p-3 rounded-lg border border-dark-bg-elevated'
      >
        {/* Select de maestros */}
        {
          !assignment && (
            <div className="">
              <label className="flex gap-2 items-center"><FaChalkboardTeacher />Maestros</label>
              <AsyncSelect
                cacheOptions
                placeholder="Buscar maestro..."
                loadingMessage={() => "Buscando..."}
                noOptionsMessage={() => "Sin resultados"}
                loadOptions={(value: string) => promiseOptions(value, 'teacher')}
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
                onChange={(value) => handleChange(value, 'teacher')}
              />
              {
                valuesAssignment.teacher.id <= 0 && (
                  <span className="text-xs text-secondary">El maestro es requerido</span>
                )
              }
            </div>
          )
        }

        {/* Select de cursos */}
        <div className="">
          <label className="flex gap-2 items-center"><MdPeopleOutline />Cursos</label>
          <AsyncSelect
            cacheOptions
            placeholder="Buscar curso..."
            loadingMessage={() => "Buscando..."}
            noOptionsMessage={() => "Sin resultados"}
            loadOptions={(value: string) => promiseOptions(value, 'grade')}
            unstyled
            value={valuesAssignment.grade.id > 0 ? [{value: valuesAssignment.grade.id, label: valuesAssignment.grade.label}] : null}
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
            onChange={(value) => handleChange(value, 'grade')}
            menuPosition="fixed"
          />
          {
            valuesAssignment.grade.id <= 0 && (
              <span className="text-xs text-secondary">El curso es requerido</span>
            )
          }
        </div>

        {/* Select de asignaturas */}
        <div className="">
          <label className="flex gap-2 items-center"><IoMdBook />Asignaturas</label>
          <AsyncSelect
            cacheOptions
            placeholder="Buscar asignatura..."
            loadingMessage={() => "Buscando..."}
            noOptionsMessage={() => "Sin resultados"}
            loadOptions={(value: string) => promiseOptions(value, 'subject')}
            unstyled
            value={valuesAssignment.subject.id > 0 ? [{value: valuesAssignment.subject.id, label: valuesAssignment.subject.label}] : null}
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
            onChange={(value) => handleChange(value, 'subject')}
            menuPosition="fixed"
          />
          {
            valuesAssignment.subject.id <= 0 && (
              <span className="text-xs text-secondary">El curso es requerido</span>
            )
          }
        </div>

        <div>
          <label htmlFor="full_name" className="font-medium text-dark-text flex gap-2 items-center">
            <MdOutlineDateRange /> Año
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaChalkboardTeacher className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <Select
              placeholder="Año de aisgnación"
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
              unstyled
              value={valuesAssignment.academic_year.id > 0  ? [{value: valuesAssignment.academic_year.id, label: valuesAssignment.academic_year.label}] : null}
              classNamePrefix="select"
              defaultValue={YEARS[0]}
              name="year"
              options={YEARS}
              onChange={(value) => handleChange(value, 'academic_year')}
            />
            {
              valuesAssignment.academic_year.id <= 0 && (
                <span className="text-xs text-secondary">El año es requerido</span>
              )
            }
          </div>
        </div>

        <div className="mt-2 flex gap-2 justify-center">
          <button className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary
          ">
            Asignar
          </button>

          <button
            type="button"
            onClick={() => setActionModal("")}
            className="
            text-warning px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border border-warning hover:border-primary hover:text-primary
          ">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
