import { Toaster } from "react-hot-toast";
import { useStudents } from "../hooks/useStudents";
import Loading from "../../shared/components/Loading";
import { ListStudents } from "../components/ListStudents";
import { useCourses } from "../../courses/hooks/useCourses";
import { MdClass, MdKeyboardArrowDown } from "react-icons/md";
import { ActionsStudents } from "../components/ActionsStudents";

export const HomeStudentPage = () => {
  const {
    loading,
    students,
    isSearch,
    getStudents
  } = useStudents();

  const {
    courses
  } = useCourses({allCourses: true});

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Buscar Estudiantes</h1>

          <ActionsStudents
            courses={courses}
            getStudents={getStudents}
          />
        </div>

        <ListStudents
          isSearch={isSearch}
          students={students}
        />

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading ? <>Por favor, espere...</> : <>Listando los estudiantes.</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
