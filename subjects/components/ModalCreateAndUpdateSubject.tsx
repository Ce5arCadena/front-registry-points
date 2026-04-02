import { useEffect } from "react";
import { MdSubject } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type FormCourseData, type Subject } from "../../shared/interfaces/subjects";

export const ModalCreateAndUpdateSubject = ({
  subject,
  createSubject,
  setActionModal
}: {
  subject: Subject | null | undefined,
  createSubject: (values: FormCourseData, method: string, url: string) => Promise<boolean>,
  setActionModal: (value: string) => void,
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
    const method = subject ? 'PUT' : 'POST';
    const url = subject ? `/subjects/${subject.id}` : '/subjects';
    const success = await createSubject(values, method, url);

    if (success) {
      reset();
      setActionModal("");
    };
  };

  useEffect(() => {
    if (subject) {
      reset({ name: subject.name });
    };
  }, [subject]);

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
            Nombre del curso
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdSubject className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: 'El nombre es requerido.'
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="Matemáticas, Física, Artistica"
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
            {
              subject ? "Editar" : "Agregar"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

