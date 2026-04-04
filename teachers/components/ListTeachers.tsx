import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { type Teacher } from "../../shared/interfaces/teachers";

export const ListTeachers = (
  {
    teachers,
    setTeacher,
    setActionModal,
  }: {
    teachers: Teacher[],
    setTeacher: (subject: Teacher) => void,
    setActionModal: (value: string) => void
  }
) => {
  return (
    <div className="h-full">
      <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead className="bg-gray-800 rounded-md text-light-bg">
          <tr className="">
            <th className="p-3">#</th>
            <th className="p-3 text-center">Nombres</th>
            <th className="p-3 text-center">Documento</th>
            <th className="p-3 text-center">Celular</th>
            <th className="p-3 text-center">Correo</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers.length > 0 && teachers.map((teacher) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={teacher.id}>
                <td className="p-2">
                  <span>{teacher.id}</span>
                </td>
                <td className="p-2 font-bold">
                  {teacher.full_name}
                </td>
                <td className="p-2 font-bold">
                  {teacher.document}
                </td>
                <td className="p-2 font-bold">
                  {teacher.phone}
                </td>
                <td className="p-2 font-bold">
                  {teacher.user.email}
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setTeacher(teacher);
                      setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setTeacher(teacher);
                      setActionModal("edit");
                    }}
                  />
                  <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setTeacher(teacher);
                      setActionModal("delete");
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            teachers && teachers.length <= 0 && (
              <tr className="text-center">
                <td colSpan={3} className="p-2">
                  No hay maestros para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
