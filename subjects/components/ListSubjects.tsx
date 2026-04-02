import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdNavigateNext } from "react-icons/md";
import { type Subject } from "../../shared/interfaces/subjects";

export const ListSubjects = (
  {
    subjects,
    setSubject,
    setActionModal,
  }: {
    subjects: Subject[],
    setSubject: (subject: Subject) => void,
    setActionModal: (value: string) => void
  }
) => {
  return (
    <div className="h-full">
      <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead className="bg-gray-800 rounded-md text-light-bg">
          <tr className="">
            <th className="p-3">#</th>
            <th className="p-3 text-center">Nombre</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            subjects.length > 0 && subjects.map((subject) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={subject.id}>
                <td className="p-2">
                  <span>{subject.id}</span>
                </td>
                <td className="p-2 font-bold">
                  {subject.name}
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setSubject(subject);
                      setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setSubject(subject);
                      setActionModal("edit");
                    }}
                  />
                  <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setSubject(subject);
                      setActionModal("delete");
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            subjects && subjects.length <= 0 && (
              <tr className="text-center">
                <td colSpan={3} className="p-2">
                  No hay asignaturas para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
