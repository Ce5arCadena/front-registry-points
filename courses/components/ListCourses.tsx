import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import { MdDeleteOutline, MdNavigateNext } from "react-icons/md";
import { type Course, type CoursesInterface } from "../../shared/interfaces/courses";

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
                      setCourse(course);
                      setActionModal("delete");
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            courses && courses.length <= 0 && (
              <tr className="text-center">
                <td colSpan={3} className="p-2">
                  No hay cursos para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

      {/* <div className="flex mt-2">
        <button className="rounded-md py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 hover:bg-slate-700 focus:text-white        disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer">
          <GrFormPrevious />
        </button>
        <button className="min-w-9 rounded-md bg-slate-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:opacity-50 disabled:shadow-none ml-2">
          1
        </button>
        <button className="rounded-md py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 hover:bg-slate-700 focus:text-white        disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer">
          <MdNavigateNext />
        </button>
      </div> */}
    </div>
  )
}
