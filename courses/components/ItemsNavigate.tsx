import { useNavigate } from "react-router";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { GrStreetView, GrUserAdd } from "react-icons/gr";

export const ItemsNavigate = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="text-lg text-left">Acciones Rápidas</span>
      <div className="flex gap-4">
        <div 
          className="rounded-md cursor-pointer min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2"
          onClick={() => navigate('/school/courses')}
        >
          <span className="flex gap-2">
            Ver Cursos
          </span>
          <span className="text-3xl font-bold">
            <GrUserAdd className="text-primary text-2xl" />
          </span>
        </div>
        <div 
          className="rounded-md cursor-pointer min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2"
          onClick={() => navigate('/school/students')}
        >
          <span className="flex gap-2">
            Ver Estudiantes
          </span>
          <span className="text-3xl font-bold">
            <GrStreetView className="text-primary text-2xl" />
          </span>
        </div>
        <div 
          className="rounded-md cursor-pointer min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2"
          onClick={() => navigate('/school/teachers')}
        >
          <span className="flex gap-2">
            Ver Maestros
          </span>
          <span className="text-3xl font-bold">
            <FaChalkboardTeacher className="text-primary text-2xl" />
          </span>
        </div>
        <div 
          className="rounded-md cursor-pointer min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2"
          onClick={() => navigate('/school/subjects')}
        >
          <span className="flex gap-2">
            Ver Asignaturas
          </span>
          <span className="text-3xl font-bold">
            <MdOutlinePlaylistAdd className="text-primary text-2xl" />
          </span>
        </div>
      </div>
    </div>
  )
}
