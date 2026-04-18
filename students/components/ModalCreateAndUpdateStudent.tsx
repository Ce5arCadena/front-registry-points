import { useEffect } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Course } from "../../shared/interfaces/courses";
import { MdClass, MdKeyboardArrowDown } from "react-icons/md";
import { type Student, type FormCourseData } from "../../shared/interfaces/students";

export const ModalCreateAndUpdateStudent = ({
  student,
  courses,
  createStudent,
  setActionModal
}: {
  courses: Course[],
  student: Student | null | undefined,
  setActionModal: (value: string) => void,
  createStudent: (values: FormCourseData, method: string, url: string) => Promise<boolean>,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCourseData>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<FormCourseData> = async (values) => {
    const method = student ? 'PUT' : 'POST';
    const url = student ? `/students/${student.id}` : '/students';
    const success = await createStudent(values, method, url);

    if (success) {
      reset();
      setActionModal("");
    };
  };

  useEffect(() => {
    if (student) {
      reset({
        name: student.name,
        last_name: student.last_name,
        phone: Number(student.phone),
        document: Number(student.document),
        grade: student.grade.id
      });
    };
  }, [student]);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          reset();
          setActionModal("");
        }}
      />

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className='w-[30%] flex flex-col gap-2'
      >
        <div>
          <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-dark-text">
            Nombres
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <PiStudentBold className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: 'El nombre es requerido.'
                },
                minLength: {
                  value: 3,
                  message: "Mínimo 3 carácteres"
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="Juan Alberto"
            />
          </div>
          {
            errors.name && (
              <span className="text-xs text-secondary">{errors.name.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="last_name" className="block mb-2.5 text-sm font-medium text-dark-text">
            Apellidos
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <PiStudentBold className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="last_name"
              type="text"
              {...register('last_name', {
                required: {
                  value: true,
                  message: 'Los apellidos son requeridos.'
                },
                minLength: {
                  value: 3,
                  message: "Mínimo 3 carácteres"
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="Trujillo Almario"
            />
          </div>
          {
            errors.last_name && (
              <span className="text-xs text-secondary">{errors.last_name.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="document" className="block mb-2.5 text-sm font-medium text-dark-text">
            Documento
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaRegIdCard className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="document"
              type="text"
              {...register('document', {
                required: {
                  value: true,
                  message: 'El documento es requerido.'
                },
                minLength: {
                  value: 6,
                  message: "Mínimo 6 carácteres"
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'Solo se permiten números'
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="123456"
            />
          </div>
          {
            errors.document && (
              <span className="text-xs text-secondary">{errors.document.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-dark-text">
            Teléfono
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoMdPhonePortrait className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="phone"
              type="text"
              {...register('phone', {
                required: {
                  value: true,
                  message: 'El teléfono es requerido.'
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Solo números y exactamente 10 dígitos'
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="3205205202"
            />
          </div>
          {
            errors.phone && (
              <span className="text-xs text-secondary">{errors.phone.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="grade" className="block mb-2.5 text-sm font-medium text-dark-text">
            Curso
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdClass className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <select
              id="grade"
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border transition-all duration-300 hover:border-primary hover:text-primary text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary outline-none appearance-none cursor-pointer"
              {...register('grade', {
                required: {
                  value: true,
                  message: 'El Curso es requerido.'
                }
              })}
            >
              <option value="">Selecciona un curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <MdKeyboardArrowDown className="w-4 h-4 text-dark-text-secondary" />
            </div>
          </div>
          {
            errors.grade && (
              <span className="text-xs text-secondary">{errors.grade.message}</span>
            )
          }
        </div>

        <div className="mt-2 flex gap-2 justify-center">
          <button className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary
          ">
            {
              student ? "Editar" : "Agregar"
            }
          </button>

          <button
            type="button"
            onClick={() => setActionModal("")}
            className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-warning hover:text-warning
          ">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
