import { type Course } from "../interfaces/courses";
import { type Teacher } from "../interfaces/teachers";
import { type Subject } from "../interfaces/subjects";
import { type Student } from "../interfaces/students";
import { IoCloseCircleOutline } from "react-icons/io5";

export const ModalDelete = ({
  model,
  message,
  nameModel,
  deleteModel,
  setActionModal
}: {
  message: string,
  nameModel: string,
  setActionModal: (value: string) => void,
  deleteModel: (id: number) => Promise<boolean>,
  model: Subject | Teacher | Course | Student | null | undefined,
}) => {
  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setActionModal("");
        }}
      />

      <div className="bg-dark-bg max-w-sm w-full rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold leading-snug">
            ¿Estás seguro que deseas eliminar {message}
            <span className='text-error ml-1'>
              {
                nameModel
              }
            </span>?
          </h3>
        </div>

        <div className="h-px bg-gray-100" />

        <div className='flex gap-2 justify-center'>
          <button
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-warning hover:text-warning"
            onClick={() => {
              deleteModel(Number(model?.id));
            }}
          >
            Eliminar
          </button>

          <button
            onClick={() => {
              setActionModal("");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
