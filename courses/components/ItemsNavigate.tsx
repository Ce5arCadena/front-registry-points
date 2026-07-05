import { useNavigate } from "react-router";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { GrStreetView, GrUserAdd } from "react-icons/gr";

export const ItemsNavigate = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="text-lg text-left">Acciones Rápidas</span>
      <div className="flex gap-4 flex-wrap">
        <div 
          className="flex items-center gap-4 cursor-pointer bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 hover:border-primary"
          onClick={() => navigate('/school/courses')}
        >
          <div className="bg-primary/10 p-3 rounded-lg">
            <GrUserAdd className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-white font-semibold">Ver Cursos</p>
          </div>
        </div>
        <div 
          className="flex items-center gap-4 cursor-pointer bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 hover:border-primary"
          onClick={() => navigate('/school/students')}
        >
          <div className="bg-primary/10 p-3 rounded-lg">
            <GrStreetView className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-white font-semibold">Ver Estudiantes</p>
          </div>
        </div>
        <div 
          className="flex items-center gap-4 cursor-pointer bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 hover:border-primary"
          onClick={() => navigate('/school/teachers')}
        >
          <div className="bg-primary/10 p-3 rounded-lg">
            <FaChalkboardTeacher className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-white font-semibold">Ver Maestros</p>
          </div>
        </div>
        <div 
          className="flex items-center gap-4 cursor-pointer bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 hover:border-primary"
          onClick={() => navigate('/school/subjects')}
        >
          <div className="bg-primary/10 p-3 rounded-lg">
            <MdOutlinePlaylistAdd className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-white font-semibold">Ver Asignaturas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
