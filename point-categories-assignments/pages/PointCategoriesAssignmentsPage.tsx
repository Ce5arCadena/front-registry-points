import { Toaster } from "react-hot-toast";
import { useAtom, useAtomValue } from "jotai";

import Loading from "../../shared/components/Loading";
import { Pagination } from "../../courses/components/Pagination";
import { usePointCategoryAssignment } from "../hooks/usePointCategoryAssignment";
import { ListPointCategoriesAssignments } from "../components/ListPointCategoriesAssignments";
import { ModalViewPointCategoryAssignment } from "../components/ModalViewPointCategoryAssignment";
import { CreateAndUpdatePointCategoryAssignment } from "../components/CreateAndUpdatePointCategoryAssignment";
import { actionModalAtom, endAtom, loadingAtom, pageCountAtom, startAtom, totalPointCategoriesAssignmentAtom } from "../store/pointCategoryAssignmentStore";

export const PointCategoriesAssignmentsPage = () => {
  const {
    handlePageClick,
    dataPointCategoriesAssignment
  } = usePointCategoryAssignment();

  const end = useAtomValue(endAtom);
  const start = useAtomValue(startAtom);
  const loading = useAtomValue(loadingAtom);
  const pageCount = useAtomValue(pageCountAtom);
  const [actionModal, setActionModal] = useAtom(actionModalAtom);
  const totalPointCategoriAssignment = useAtomValue(totalPointCategoriesAssignmentAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Asignación de Categorias de Puntos</h1>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActionModal("create");
              }}
              className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
              Asignar Categoria de Puntos
            </button>
          </div>
        </div>

        <ListPointCategoriesAssignments
          pointCategoriesAssignments={dataPointCategoriesAssignment}
        />

        {
          dataPointCategoriesAssignment.length > 0 && (
            <Pagination
              end={end}
              start={start}
              pageCount={pageCount}
              total={totalPointCategoriAssignment}
              handlePageClick={handlePageClick}
            />
          )
        }

        {
          actionModal === "view" && (
            <ModalViewPointCategoryAssignment />
          )
        }

        {(actionModal === "create" || actionModal === "edit") && (
          <CreateAndUpdatePointCategoryAssignment />
        )}

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
