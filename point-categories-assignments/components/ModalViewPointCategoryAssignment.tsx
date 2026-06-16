import { useAtom } from "jotai";
import { IoCloseCircleOutline, IoSchool, IoBook, IoPeople } from 'react-icons/io5';
import { pointCategoryAssignmentAtom } from "../store/pointCategoryAssignmentStore";

export const ModalViewPointCategoryAssignment = () => {
  const [pointCategoryAssignment, setPointCategoryAssignment] = useAtom(pointCategoryAssignmentAtom);

  if (!pointCategoryAssignment) return null;

  const formatDate = (d: any) => d ? new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '-';

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center p-4">
      <IoCloseCircleOutline 
        className="text-2xl absolute right-4 top-4 cursor-pointer text-white"
        onClick={() => setPointCategoryAssignment(undefined)}
      />

      <div className="bg-dark-bg max-w-2xl w-full rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold leading-snug">{pointCategoryAssignment.name}</h3>
            <p className="text-sm text-gray-300">Puntos máximos: <span className="font-semibold">{pointCategoryAssignment.max_points}</span></p>
          </div>

          <div className="self-start">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pointCategoryAssignment.status === "ACTIVE" ? "bg-green-400 text-black" : "bg-red-400 text-black"}`}>
              {pointCategoryAssignment.status === "ACTIVE" ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-200"><IoBook /><span className="font-medium">Asignaciones en cursos</span></div>
          <div className="flex">
            {pointCategoryAssignment.context?.length ? (
              <div className="flex flex-wrap gap-2">
                {pointCategoryAssignment.context.map((c) => (
                  <div key={c.id} className={`bg-dark-bg-secondary/30 p-2 rounded-lg border ${c.status === 'ACTIVE' ? 'border-green-600' : 'border-red-600'} flex flex-col gap-1`}>
                    <div className="font-semibold flex gap-2 items-center">
                      <IoPeople/> {c.course?.name}
                    </div>
                    <div className="text-xs text-gray-300 flex gap-2 items-center">
                      <IoSchool/> {c.subject?.name}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-300">No hay asignaciones aún.</div>
            )}
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex">
          <button 
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary"
            onClick={() => setPointCategoryAssignment(undefined as any)}
          >Cerrar</button>
        </div>
      </div>
    </div>
  )
}
