import { 
  endAtom, 
  startAtom, 
  loadingAtom, 
  pageCountAtom, 
  actionModalAtom, 
  pointCategorysAtom, 
  idsPointCategoriesAtom,
  totalPointCategoriesAtom,
} from "../store/pointCategoryStore";
import { Toaster } from "react-hot-toast";
import { useAtom, useAtomValue } from "jotai";
import Loading from "../../shared/components/Loading";
import { usePointCategories } from "../hooks/usePointCategories";
import { Pagination } from "../../courses/components/Pagination";
import { ListAssignments } from "../components/ListPointCategories";
import { ModalViewPointCategory } from "../components/ModalViewPointCategory";
import { ModalCreateAndUpdatePointCategory } from "../components/ModalCreateAndUpdatePointCategory";

export const PointCategoryPage = () => {
  const {
    toggleOne,
    handlePageClick,
    dataPointCategories,
    getIdsPointCategories,
    createAndUpdatePointCategory,
    changeStatusPointCategoriesByIds
  } = usePointCategories();

  const end = useAtomValue(endAtom);
  const start = useAtomValue(startAtom);
  const loading = useAtomValue(loadingAtom);
  const pageCount = useAtomValue(pageCountAtom);
  const pointCategories = useAtomValue(pointCategorysAtom);
  const [actionModal, setActionModal] = useAtom(actionModalAtom);
  const pointCategoriesIds = useAtomValue(idsPointCategoriesAtom);
  const totalPointCategories = useAtomValue(totalPointCategoriesAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Categorias de Puntos</h1>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActionModal("create");
              }}
              className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
              Agregar Categoria de Puntos
            </button>

            <button
              disabled={pointCategoriesIds.length <= 0}
              onClick={() => {
                changeStatusPointCategoriesByIds();
              }}
              className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 border 
              hover:border-primary hover:text-primary
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-current disabled:hover:text-white">
              Cambiar de Estado
            </button>
          </div>
        </div>

        <ListAssignments 
          toggleOne={toggleOne}
          pointCategories={pointCategories} 
          getIdsPointCategories={getIdsPointCategories}
        />

        {
          dataPointCategories.length > 0 && (
            <Pagination
              end={end}
              start={start}
              pageCount={pageCount}
              total={totalPointCategories}
              handlePageClick={handlePageClick}
            />
          )
        }

        {
          actionModal === "create" || actionModal === "edit" && (
            <ModalCreateAndUpdatePointCategory
              createAndUpdatePointCategory={createAndUpdatePointCategory}
            />
          )
        }

        {
          actionModal === "view" && (
            <ModalViewPointCategory />
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
