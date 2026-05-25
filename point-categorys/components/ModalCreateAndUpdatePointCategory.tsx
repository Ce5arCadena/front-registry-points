import { useSetAtom } from "jotai";
import { TbCategory, TbNumbers } from "react-icons/tb";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SubmitHandler, useForm } from "react-hook-form";
import { actionModalAtom } from "../store/pointCategoryStore";
import { type FormPointCategory } from "../../shared/interfaces/pointCategories";

export const ModalCreateAndUpdatePointCategory = ({
  createAndUpdatePointCategory
} : {
  createAndUpdatePointCategory: (data: FormPointCategory, METHOD: 'POST' | 'PUT') => Promise<boolean>;
}) => {
  const setActionModal = useSetAtom(actionModalAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPointCategory>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<FormPointCategory> = async (values) => {
    await createAndUpdatePointCategory(values, 'POST');
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
        className='w-full lg:w-[35%] flex flex-col gap-2'
      >
        <div>
          <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-dark-text">
            Nombre de la categoría
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <TbCategory className="w-4 h-4 text-dark-text-secondary" />
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
              placeholder="Responsabilidad, Participación, Puntualidad..."
            />
          </div>
          {
            errors.name && (
              <span className="text-xs text-secondary">{errors.name.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="max_points" className="block mb-2.5 text-sm font-medium text-dark-text">
            Puntos máximos
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <TbNumbers className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="max_points"
              type="text"
              {...register('max_points', {
                required: {
                  value: true,
                  message: 'Los puntos máximos son requeridos.'
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'Los puntos máximos deben ser un número entero.'
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="4"
            />
          </div>
          {
            errors.max_points && (
              <span className="text-xs text-secondary">{errors.max_points.message}</span>
            )
          }
        </div>

        <div className="mt-2 flex gap-3 justify-center">
          <button className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary
          ">
            Agregar
          </button>
          <button
            onClick={() => {
              setActionModal("");
            }}
            type="button"
            className="
            text-white px-3 py-1.5 rounded-lg transition-all border-primary duration-300 cursor-pointer border hover:border-primary hover:text-primary
          ">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
