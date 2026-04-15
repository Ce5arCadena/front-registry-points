import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { type Student } from "../../shared/interfaces/students";

export const ListStudents = (
  {
    students,
    // toggleOne,
    // setTeacher,
    // selectedIds,
    // getIdsTeachers,
    // setActionModal,
  }: {
    students: Student[],
    // selectedIds: number[],
    // toggleOne: (id: number) => void,
    // setTeacher: (subject: Teacher) => void,
    // setActionModal: (value: string) => void
    // getIdsTeachers: (e: React.ChangeEvent<HTMLInputElement>) => void,
  }
) => {
  return (
    <div className="h-full">
      <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead className="bg-gray-800 rounded-md text-light-bg">
          <tr className="">
            <th className="p-3 text-center">
              <label className="relative flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  // checked={selectedIds.length === students.length}
                  // onChange={getIdsTeachers}
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
            <th className="p-3 text-center">Nombres</th>
            <th className="p-3 text-center">Apellidos</th>
            <th className="p-3 text-center">Documento</th>
            <th className="p-3 text-center">Celular</th>
            <th className="p-3 text-center">Curso</th>
            <th className="p-3 text-center">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            students.length > 0 && students.map((student) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={student.id}>
                <td>
                  <label className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={student.id}
                      // checked={selectedIds.includes(student.id)}
                      // onChange={() => toggleOne(student.id)}
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
                  {student.name}
                </td>
                <td className="p-2 font-bold">
                  {student.last_name}
                </td>
                <td className="p-2 font-bold">
                  {student.document}
                </td>
                <td className="p-2 font-bold">
                  {student.phone}
                </td>
                <td className="p-2 font-bold">
                  {student.grade.name}
                </td>
                <td className="p-2 font-medium">
                  <span className={`${student.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"} px-1.5 py-1 rounded-full text-xs`}>
                    {student.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      // setTeacher(student);
                      // setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      // setTeacher(student);
                      // setActionModal("edit");
                    }}
                  />
                  <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      // setTeacher(student);
                      // setActionModal("delete");
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            students && students.length <= 0 && (
              <tr className="text-center">
                <td colSpan={8} className="p-2">
                  No hay estudiantes para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
