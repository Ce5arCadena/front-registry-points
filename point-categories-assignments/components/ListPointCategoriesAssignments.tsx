import {
  actionModalAtom,
  pointCategoryAssignmentAtom,
  formAssignmentPointCategoryAtom,
  idsPointCategoriesAssignmentsAtom,
} from "../store/pointCategoryAssignmentStore";
import { RiEdit2Line } from "react-icons/ri";
import { useAtomValue, useSetAtom } from "jotai";
import { MdPublishedWithChanges } from "react-icons/md";
import { IoBook, IoEyeOutline, IoPeople, IoSchool } from "react-icons/io5";
import { type PointCategory } from "../../shared/interfaces/pointCategories";

export const ListPointCategoriesAssignments = ({
  // toggleOne,
  pointCategoriesAssignments,
  // getIdsPointCategories,
}: {
  // toggleOne: (id: number) => void,
  pointCategoriesAssignments: PointCategory[],
  // getIdsPointCategories: () => void,
}) => {
  const setActionModal = useSetAtom(actionModalAtom);
  const setPointCategoryAssignment = useSetAtom(pointCategoryAssignmentAtom);
  const pointCategoriesIds = useAtomValue(idsPointCategoriesAssignmentsAtom);
  const setFormAssignmentPointCategoryAtom = useSetAtom(formAssignmentPointCategoryAtom);

  return (
    <div className="text-gray-400 border-separate text-sm w-full h-screen overflow-y-scroll grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-6 py-2 auto-rows-max">
      {
        pointCategoriesAssignments.length > 0 && pointCategoriesAssignments.map((category) => (
          <div className="bg-dark-bg rounded-2xl shadow-md border border-gray-100 p-3 flex flex-col gap-4 max-h-96 overflow-y-auto" key={category.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold leading-snug">{category.name}</h3>
                <p className="text-sm text-gray-300">Puntos máximos: <span className="font-semibold">{category.max_points}</span></p>
              </div>

              <div className="flex flex-col gap-2">
                <span className={`text-xs text-black font-bold text-center px-3 py-1 rounded-full ${category.status === "ACTIVE" ? "bg-green-400" : "bg-red-400"}`}>
                  {category.status === "ACTIVE" ? "Activo" : "Inactivo"}
                </span>
                <div className="flex justify-center gap-2 bg-light-bg-secondary text-dark-bg px-2 py-1 rounded-full">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setPointCategoryAssignment(category);
                      setActionModal("view");
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-200"><IoBook /><span className="font-medium">Asignaciones en cursos</span></div>
              <div className="flex overflow-y-auto">
                {category.context?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {category.context.map((c) => (
                      <div key={c.id} className={`bg-dark-bg-secondary/30 p-2 rounded-lg border ${c.status === 'ACTIVE' ? 'border-green-600' : 'border-red-600'} flex flex-col gap-1`}>
                        <div className="font-semibold flex gap-2 items-center">
                          <IoPeople /> {c.course?.name}
                        </div>
                        <div className="text-xs text-gray-300 flex gap-2 items-center">
                          <IoSchool /> {c.subject?.name}
                        </div>
                        <div className="flex gap-2 justify-center bg-light-bg-secondary text-dark-bg px-2 py-1 rounded-full">
                          <RiEdit2Line
                            className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                            onClick={() => {
                              setFormAssignmentPointCategoryAtom({
                                pointCategoryContext: c.id,
                                pointCategory: {
                                  value: category.id ? String(category.id) : '',
                                  label: category.name,
                                },
                                course: {
                                  value: c.course?.id ? String(c.course.id) : '',
                                  label: c.course?.name || '',
                                },
                                subject: {
                                  value: c.subject?.id ? String(c.subject.id) : '',
                                  label: c.subject?.name || '',
                                }
                              });
                              setActionModal("edit");
                            }}
                          />
                          <MdPublishedWithChanges className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                            onClick={() => {
                              setFormAssignmentPointCategoryAtom({
                                pointCategoryContext: c.id,
                                pointCategory: {
                                  value: category.id ? String(category.id) : '',
                                  label: category.name,
                                },
                                course: {
                                  value: c.course?.id ? String(c.course.id) : '',
                                  label: c.course?.name || '',
                                },
                                subject: {
                                  value: c.subject?.id ? String(c.subject.id) : '',
                                  label: c.subject?.name || '',
                                }
                              });
                              setActionModal("delete");
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-300">No hay asignaciones aún.</div>
                )}
              </div>
            </div>
          </div>
        ))
      }

      {
        pointCategoriesAssignments && pointCategoriesAssignments.length <= 0 && (
          <div className="col-span-full flex items-center justify-center h-96">
            No hay categorías de puntos para mostrar.
          </div>
        )
      }
    </div>
  )
}
