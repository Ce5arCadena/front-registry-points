import { MdOutlineSchool } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type FormCourseData } from "../../shared/interfaces/courses";

export const ModalCreateAndUpdateCourse = ({
  onSubmitCourse,
  setActionModal
}: {
  onSubmitCourse: (values: FormCourseData) => Promise<boolean>,
  setActionModal: (value: string) => void,
}) => {
  const {
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<FormCourseData>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<FormCourseData> = async (values) => {
    const success = await onSubmitCourse(values);
    if (success) reset();
  };

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
        onSubmit={handleSubmit(onSubmit)}
        className='w-[30%] flex flex-col gap-2'
      >
        <div>
          <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-dark-text">
            Nombre del curso
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineSchool className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: {
                  // value: schoolAction === "edit" ? false : true,
                  value: true,
                  message: 'El nombre es requerido.'
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="Sexto A, Sexto B, Decimo A"
            />
          </div>
          {
            errors.name && (
              <span className="text-xs text-secondary">{errors.name.message}</span>
            )
          }
        </div>

        <div className="mt-2">
          <button className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary
          ">
            {/* {
              schoolAction === "edit" ? "Editar" : "Agregar"
            } */}
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}

