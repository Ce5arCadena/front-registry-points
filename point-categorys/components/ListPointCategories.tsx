import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useAtomValue, useSetAtom } from "jotai";
import { type PointCategory } from "../../shared/interfaces/pointCategories";
import { actionModalAtom, idsPointCategoriesAtom, pointCategoryAtom } from "../store/pointCategoryStore";

export const ListAssignments = ({ 
  toggleOne,
  pointCategories,
  getIdsPointCategories,
}: { 
  toggleOne: (id: number) => void,
  pointCategories: PointCategory[],
  getIdsPointCategories: () => void,
}) => {
  const setActionModal = useSetAtom(actionModalAtom);
  const setPointCategory = useSetAtom(pointCategoryAtom);
  const pointCategoriesIds = useAtomValue(idsPointCategoriesAtom);

  return (
    <div className="table text-gray-400 border-separate space-y-6 text-sm w-full">
      <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead className="bg-gray-800 rounded-md text-light-bg">
          <tr className="">
            <th className="p-3 text-center">
              <label className="relative flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pointCategoriesIds.length === pointCategories.length}
                  onChange={getIdsPointCategories}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border border-gray-500 bg-transparent
                    peer-checked:bg-primary peer-checked:border-primary
                    flex items-center justify-center transition-all duration-150">
                  <svg
                    className="hidden peer-checked:block w-3 h-3 text-white"
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </label>
            </th>
            <th className="p-3 text-center">Nombre de la Categoría</th>
            <th className="p-3 text-center">Puntos Máximos</th>
            <th className="p-3 text-center">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            pointCategories.length > 0 && pointCategories.map((category) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={category.id}>
                <td>
                  <label className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={category.id}
                      checked={pointCategoriesIds.includes(category.id)}
                      onChange={() => toggleOne(category.id)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded border border-gray-500 bg-transparent
                    peer-checked:bg-primary peer-checked:border-primary
                    flex items-center justify-center transition-all duration-150">
                      <svg
                        className="hidden peer-checked:block w-3 h-3 text-white"
                        viewBox="0 0 12 12" fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                </td>
                <td className="p-2 font-bold">
                  {category.name}
                </td>
                <td className="p-2">
                  {category.max_points}
                </td>
                <td className="p-2 font-medium">
                  <span className={`${category.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"} px-1.5 py-1 rounded-full text-xs`}>
                    {category.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setPointCategory(category);
                      setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setPointCategory(category);
                      setActionModal("edit");
                    }}
                  />
                  {/* <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setPointCategory(category);
                      setActionModal("delete");
                    }}
                  /> */}
                </td>
              </tr>
            ))
          }

          {
            pointCategories && pointCategories.length <= 0 && (
              <tr className="text-center">
                <td colSpan={5} className="p-2">
                  No hay categorías de puntos para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
