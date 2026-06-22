import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";

import Loading from "../../shared/components/Loading";
import { loadingAtom } from "../store/registryPointsStore";
import { useRegistryPoints } from "../hooks/useRegistryPoints";
import { ListCoursesWithSubjects } from "../components/ListCoursesWithSubjects";

export const RegistryPointPage = () => {
  const {
    handleViewStudents
  } = useRegistryPoints();

  const loading = useAtomValue(loadingAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <div>
            <h1 className="text-2xl font-bold">Registro de puntos</h1>
            <h3 className="font-medium text-gray-300">Selecciona un curso y luego una asignatura para comenzar.</h3>
          </div>
        </div>

        <ListCoursesWithSubjects
          handleViewStudents={handleViewStudents}
        />

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                Por favor, espere...
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
