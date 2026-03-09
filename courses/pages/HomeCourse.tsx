import { Toaster } from "react-hot-toast";
import { useCourses } from "../hooks/useCourses";
import Loading from "../../shared/components/Loading";
import { Pagination } from "../components/Pagination";
import { ListCourses } from "../components/ListCourses";
import { ModalViewCourse } from "../components/ModalViewCourse";
import { ModalDeleteCourse } from "../components/ModalDeleteCourse";
import { ModalCreateAndUpdateCourse } from "../components/ModalCreateAndUpdateCourse";

export const HomeCourse = () => {
  const {
    end,
    start,
    course,
    loading,
    courses,
    setCourse,
    totalPages,
    actionModal,
    dataCourses,
    totalCourses,
    deleteCourse,
    createCourse,
    setActionModal,
    setCurrentPage
  } = useCourses();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right"/>
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Cursos</h1>

          <button 
            onClick={() => {
              setCourse(null);
              setActionModal("create");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Agregar Curso
          </button>
        </div>

        {/* Lista de cursos */}
        <ListCourses 
          courses={dataCourses}
          setCourse={setCourse}
          setActionModal={setActionModal}
        />

        {
          dataCourses.length > 0 && (
            <Pagination 
              end={end}
              start={start}
              totalCourses={totalCourses}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )
        }

        {
          (actionModal === "create" || actionModal === "edit") && (
            <ModalCreateAndUpdateCourse 
              course={course}
              setActionModal={setActionModal}
              createCourse={createCourse}
            />
          )
        }

        {
          actionModal === "view" && (
            <ModalViewCourse
              course={course}
              setActionModal={setActionModal}
            /> 
          )
        }

        {
          actionModal === "delete" && (
            <ModalDeleteCourse
              course={course}
              setActionModal={setActionModal}
              deleteCourse={deleteCourse}
            /> 
          )
        }

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading/>
              <span>
                {
                  loading && actionModal !== "" ? <>Por favor, espere...</> : <>Listando los cursos.</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
