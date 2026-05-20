import { TbBook } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { useDashboard } from "../hooks/useDashboard";
import Loading from "../../shared/components/Loading";

export const HomeDashboard = () => {
  const {
    loading,
    dataDashboard
  } = useDashboard();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-4">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex flex-col p-2 rounded-l-xl border-primary">
          <h2 className="text-2xl font-medium">Bienvenido</h2>
          <h3 className="text-md">Resumen general del sistema</h3>
        </div>

        <div className="flex gap-4 w-full items-center justify-center">
          <div className="rounded-md min-w-44 min-h-28 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
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
          <div className="rounded-md min-w-44 min-h-28 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
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
          <div className="rounded-md min-w-44 min-h-28 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
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
          <div className="rounded-md min-w-44 min-h-28 bg-dark-bg-elevated shadow-2xs p-2 transition-all ease-in duration-200 hover:shadow-lg hover:shadow-secondary/80 hover:-translate-y-1 shadow-primary flex flex-col items-center gap-2">
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

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading ? <>Por favor, espere...</> : <> Listando tus datos...</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
