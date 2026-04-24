import { useAtomValue } from "jotai";
import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { assignmentsAtom } from "../store/assignmentsStore";
import { type AssignmentsCourseInterface } from "../../shared/interfaces/assignments";

export const ListAssignments = (
  {
    setAssignment,
    setActionModal,
  }: {
    setActionModal: (value: string) => void,
    setAssignment: (subject: AssignmentsCourseInterface) => void,
  }
) => {
  const dataAssignments = useAtomValue(assignmentsAtom);

  return (
    <div className="h-full">
      <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead className="bg-gray-800 rounded-md text-light-bg">
          <tr className="">
            <th className="p-3 text-center">
              <label className="relative flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  // checked={selectedIds.length === dataStudents.length}
                  // onChange={getIdsStudents}
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
            <th className="p-3 text-center">Maestro</th>
            <th className="p-3 text-center">Curso</th>
            <th className="p-3 text-center">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            dataAssignments.length > 0 && dataAssignments.map((assignment) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={assignment.id}>
                <td>
                  <label className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={assignment.id}
                      // checked={selectedIds.includes(assignment.id)}
                      // onChange={() => toggleOne(assignment.id)}
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
                  {assignment.teacher.full_name}
                </td>
                <td className="p-2 font-bold">
                  {assignment.grade.name}
                </td>
                <td className="p-2 font-medium">
                  <span className={`${assignment.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"} px-1.5 py-1 rounded-full text-xs`}>
                    {assignment.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setAssignment(assignment);
                      setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setAssignment(assignment);
                      setActionModal("edit");
                    }}
                  />
                  <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setAssignment(assignment);
                      setActionModal("delete");
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            dataAssignments && dataAssignments.length <= 0 && (
              <tr className="text-center">
                <td colSpan={5} className="p-2">
                  No hay asignaciones para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
