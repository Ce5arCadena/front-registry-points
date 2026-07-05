import { TbBook } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { type DashboardDataInterface } from "../../shared/interfaces";

export const ItemsCards = ({
  dataDashboard
} : {
  dataDashboard: DashboardDataInterface
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-lg">Resumen general del sistema</h3>
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-3 bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FaPeopleGroup className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Cursos Activos</p>
            <p className="text-white text-2xl font-bold">
              {
                dataDashboard?.data && dataDashboard.data.total_courses > 0 ? dataDashboard.data.total_courses : "0"
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1">
          <div className="bg-primary/10 p-3 rounded-lg">
            <BsPeople className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Estudiantes Activos</p>
            <p className="text-white text-2xl font-bold">
              {
                dataDashboard?.data && dataDashboard.data.total_subjects > 0 ? dataDashboard.data.total_subjects : "0"
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FaGraduationCap className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Maestros Activos</p>
            <p className="text-white text-2xl font-bold">
              {
                dataDashboard?.data && dataDashboard.data.total_teachers > 0 ? dataDashboard.data.total_teachers : "0"
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-dark-bg-elevated border border-primary/40 rounded-lg px-5 py-4 min-w-55 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1">
          <div className="bg-primary/10 p-3 rounded-lg">
            <TbBook className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Asignaturas Activas</p>
            <p className="text-white text-2xl font-bold">
              {
                dataDashboard?.data && dataDashboard.data.total_subjects > 0 ? dataDashboard.data.total_subjects : "0"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
