import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { type Course } from "../../shared/interfaces/courses"

export const ListCourses = (
  {
    courses,
    setCourse,
    setActionModal,
  }: {
    courses: Course[],
    setCourse: (course: Course) => void,
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
            courses.length > 0 && courses.map((course) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={course.id}>
                <td className="p-2">
                  <span>{course.id}</span>
                </td>
                <td className="p-2 font-bold">
                  {course.name}
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setCourse(course);
                      setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setCourse(course);
                      setActionModal("edit");
                    }}
                  />
                  <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      // setSchool(school);
                      // setActionSchool("delete");
                      // setShowModalAddSchool(true);
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            courses.length <= 0 && (
              <tr className="text-center">
                <td colSpan={3} className="p-2">
                  No hay cursos para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
