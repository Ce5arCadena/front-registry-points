import dayjs from 'dayjs';
import { PiBooksLight } from "react-icons/pi";
import { CiStar, CiUser } from "react-icons/ci";
import { useAtomValue, useSetAtom } from "jotai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { actionModalAtom, pointCategoryAtom } from "../store/pointCategoryStore";

export const ModalViewPointCategory = () => {
  const setActionModal = useSetAtom(actionModalAtom);
  const pointCategory = useAtomValue(pointCategoryAtom);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <div className="bg-dark-bg relative max-w-md w-full rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
        <IoCloseCircleOutline
          className="text-2xl absolute right-2 top-2 cursor-pointer hover:text-cyan-400 transition-all ease-in duration-300"
          onClick={() => {
            setActionModal("");
          }}
        />

        <div className="mt-3">
          {/* Header card */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-4">
            <div className="flex gap-3 items-center">
              <div className="bg-light-bg-secondary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-all ease-in-out duration-300">
                <CiStar className="text-primary font-bold text-3xl hover:text-white transition-all ease-in-out duration-300"/>
              </div>
              <div>
                <h4 className="text-xl font-bold">{pointCategory?.name}</h4>
                <h5 className="text-sm font-medium mt-1 text-light-bg-secondary/85">Categoría de puntos</h5>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h4 className="text-3xl font-bold text-primary">{pointCategory?.max_points}</h4>
              <h5 className="text-sm font-medium mt-1 text-light-bg-secondary/85">pts máx.</h5>
            </div>
          </div>

          {/* Body card */}
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <CiUser />
                <h5 className="text-sm font-medium text-light-bg-secondary/85">Docente</h5>
              </div>
              <h5 className="text-sm font-medium text-light-bg-secondary">{pointCategory?.teacher.full_name}</h5>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-medium mt-4 text-light-bg-secondary/85">CATEGORÍAS ASIGNADAS POR CURSO Y MATERIA</h4>
              {
                pointCategory?.context && pointCategory?.context.length > 0 ? pointCategory?.context.map((context) => (
                  <div key={context.id} className="rounded-md bg-dark-bg-elevated p-2 flex items-center justify-between">
                    <div className="flex gap-3 items-center justify-between">
                      <PiBooksLight className="text-primary text-xl"/>
                      <div className="flex flex-col">
                        <h5 className="text-sm font-medium text-light-bg-secondary">{context.course.name}</h5>
                        <h5 className="text-xs font-medium text-light-bg-secondary/55">{context.subject.name}</h5>
                      </div>
                    </div>
                    <div className="flex items-center bg-light-bg-secondary px-2 py-1 rounded-full p-2">
                      <span className="text-xs font-medium text-dark-bg-elevated">{context.status == "ACTIVE" ? "Activa" : "Inactiva"}</span>
                    </div>
                  </div>
                )) : (
                  <h5 className="text-sm font-medium mt-1 text-light-bg-secondary">Esta categoría de puntos no tiene cursos ni materias asignados aún.</h5>
                ) 
              }
            </div>
          </div>

          {/* footer */}
          <div className="mt-4 border-t border-gray-700 pt-4 flex justify-between items-center">
            <h5 className="text-sm font-medium text-light-bg-secondary">Creado el: {dayjs(pointCategory?.created_at).format('DD/MM/YYYY')}</h5>
            <div className="flex items-center bg-light-bg-secondary px-2 py-1 rounded-full p-2">
              <span className="text-xs font-medium text-dark-bg-elevated">{pointCategory?.status == "ACTIVE" ? "Activa" : "Inactiva"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
