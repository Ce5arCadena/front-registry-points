import { Toaster } from "react-hot-toast";
import { useAtom, useAtomValue } from "jotai";
import Loading from "../../shared/components/Loading";
import { usePointCategories } from "../hooks/usePointCategories";
import { ListAssignments } from "../components/ListPointCategories";
import { actionModalAtom, loadingAtom, pointCategorysAtom } from "../store/pointCategoryStore";
import { ModalCreateAndUpdatePointCategory } from "../components/ModalCreateAndUpdatePointCategory";

export const PointCategoryPage = () => {
  const loading = useAtomValue(loadingAtom);
  const pointCategories = useAtomValue(pointCategorysAtom);
  const [actionModal, setActionModal] = useAtom(actionModalAtom);
   const { createAndUpdatePointCategory } = usePointCategories();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Categorias de Puntos</h1>

          <button
            onClick={() => {
              setActionModal("create");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Agregar Categoria de Puntos
          </button>
        </div>
          
        <ListAssignments pointCategories={pointCategories} />

        {
          actionModal === "create" || actionModal === "edit" && (
            <ModalCreateAndUpdatePointCategory 
              createAndUpdatePointCategory={createAndUpdatePointCategory}
            />
          )
        }

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
