import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";
import { usePointCategoryAssignment } from "../hooks/usePointCategoryAssignment";
import { pointCategoriesAssignmentsAtom } from "../store/pointCategoryAssignmentStore";
import { ListPointCategoriesAssignments } from "../components/ListPointCategoriesAssignments";

export const PointCategoriesAssignmentsPage = () => {
  usePointCategoryAssignment();

  const pointCategoriesAssignments = useAtomValue(pointCategoriesAssignmentsAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Asignación de Categorias de Puntos</h1>

          <div className="flex gap-2">
            <button
              onClick={() => {
                // setActionModal("create");
              }}
              className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
              Asignar Categoria de Puntos
            </button>

            <button
              // disabled={pointCategoriesIds.length <= 0}
              onClick={() => {
                // changeStatusPointCategoriesByIds();
              }}
              className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 border cursor-pointer
              hover:border-primary hover:text-primary
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-current disabled:hover:text-white">
              Cambiar de Estado
            </button>
          </div>
        </div>

        <ListPointCategoriesAssignments
          pointCategoriesAssignments={pointCategoriesAssignments} 
        />
      </div>
    </div>
  )
}
