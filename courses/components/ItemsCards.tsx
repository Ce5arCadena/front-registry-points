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
    <div className="flex gap-4 w-full items-center">
      <div className="rounded-md min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
        <span className="flex gap-2">
          <FaPeopleGroup className="text-primary text-2xl" />
          Cursos Activos
        </span>
        <span className="text-3xl font-bold">
          {
            dataDashboard?.data && dataDashboard.data.total_courses > 0 ? dataDashboard.data.total_courses : "0"
          }
        </span>
      </div>
      <div className="rounded-md min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
        <span className="flex gap-2">
          <BsPeople className="text-primary text-2xl" />
          Estudiantes Activos
        </span>
        <span className="text-3xl font-bold">
          {
            dataDashboard?.data && dataDashboard.data.total_subjects > 0 ? dataDashboard.data.total_subjects : "0"
          }
        </span>
      </div>
      <div className="rounded-md min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
        <span className="flex gap-2">
          <FaGraduationCap className="text-primary text-2xl" />
          Maestros Activos
        </span>
        <span className="text-3xl font-bold">
          {
            dataDashboard?.data && dataDashboard.data.total_teachers > 0 ? dataDashboard.data.total_teachers : "0"
          }
        </span>
      </div>
      <div className="rounded-md min-w-40 min-h-24 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
        <span className="flex gap-2">
          <TbBook className="text-primary text-2xl" />
          Asignaturas Activas
        </span>
        <span className="text-3xl font-bold">
          {
            dataDashboard?.data && dataDashboard.data.total_subjects > 0 ? dataDashboard.data.total_subjects : "0"
          }
        </span>
      </div>
    </div>
  )
}
