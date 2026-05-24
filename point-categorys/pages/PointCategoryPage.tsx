import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";
import { usePointCategories } from "../hooks/usePointCategories";
import { pointCategorysAtom } from "../store/pointCategoryStore";
import { ListAssignments } from "../components/ListPointCategories";

export const PointCategoryPage = () => {
  const pointCategories = useAtomValue(pointCategorysAtom);
  usePointCategories();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Categorias de Puntos</h1>

          <button
            onClick={() => {
              // setActionModal("create");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Agregar Categoria de Puntos
          </button>
        </div>
          
        <ListAssignments pointCategories={pointCategories} />
      </div>
    </div>
  )
}
