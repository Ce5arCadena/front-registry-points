import { Toaster } from "react-hot-toast"
import { useTeachers } from "../hooks/useSubjects";

export const HomeTeacherPage = () => {
  const {
    end,
    start,
    teacher,
    loading,
    pageCount,
    setTeacher,
    actionModal,
    dataTeachers,
    deleteTeacher,
    createTeacher,
    totalTeachers,
    setActionModal,
    handlePageClick,
  } = useTeachers();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Maestros</h1>
          <button
            onClick={() => {
              // setSubject(null);
              // setActionModal("create");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Agregar Maestro
          </button>
        </div>
      </div>
    </div>
  )
}
