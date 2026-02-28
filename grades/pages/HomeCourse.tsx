import { Toaster } from "react-hot-toast";
import { useCourses } from "../hooks/useCourses"
import Loading from "../../shared/components/Loading";
import { ListCourses } from "../components/ListCourses";

export const HomeCourse = () => {
  const {
    courses,
    loading
  } = useCourses();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right"/>
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Cursos</h1>

          <button 
            // onClick={() => setShowModalAddSchool(!showModalAddSchool)}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary">
            Agregar Curso
          </button>
        </div>

        {/* Lista de cursos */}
        <ListCourses 
          courses={courses}
        />

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading/>
              <span>Listando cursos...</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
