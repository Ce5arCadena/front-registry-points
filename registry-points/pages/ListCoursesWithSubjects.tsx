import { useAtomValue } from "jotai";
import { TbSchool } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";

import { teacherAtom } from "../store/registryPointsStore";

export const ListCoursesWithSubjects = ({}) => {
  const teacher = useAtomValue(teacherAtom);

  if (!teacher) return null;

  return (
    <div className="text-gray-400 border-separate text-sm w-full h-screen overflow-y-scroll grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-6 py-2 auto-rows-max">
      {
        teacher && teacher.grades.length > 0 ? (
          teacher.grades.map(course => (
            <div className="bg-dark-bg rounded-lg shadow-md border border-primary p-3 flex flex-col gap-4 max-h-96 overflow-y-auto" key={course.id}>
              {/* header de la card */}
              <div className="">
                <div className="flex gap-2 items-center text-white">
                  <TbSchool className="text-lg"/>
                  {course.name}
                </div>
                <span className="">
                  {course.students_count} Estudiantes - {course.subjects.length} Asignaturas
                </span>
              </div>

              {/* Asignaturas con las categorías */}
              {
                course.subjects && course.subjects.length > 0 ? (
                  course.subjects.map(subject => (
                    <div className="flex gap-2 items-center justify-between text-white border border-primary rounded-lg p-2 cursor-pointer transition-all ease-in-out duration-300 hover:bg-dark-bg-elevated" key={subject.id}>
                      <div className="flex items-center gap-2">
                        <IoBookOutline />
                        <span className="font-semibold">
                          {subject.name}
                        </span>
                      </div>
                      <span className="bg-white rounded-full w-6 h-6 text-dark-bg font-medium text-center">
                        {subject.point_category_contexts.length}
                      </span>
                    </div>
                  ))
                ) : (
                  <span>
                    No tienes asignaturas aún.
                  </span>
                )
              }
              <div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-96">
            Aún no tienes cursos asignados.
          </div>
        )
      }
    </div>
  )
}
