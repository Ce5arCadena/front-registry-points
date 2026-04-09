import { Toaster } from "react-hot-toast"
import { useTeachers } from "../hooks/useTeachers";
import Loading from "../../shared/components/Loading";
import { ListTeachers } from "../components/ListTeachers";
import { Pagination } from "../../courses/components/Pagination";
import { ModalViewTeacher } from "../components/ModalViewTeacher";
import { ModalDelete } from "../../shared/components/ModalDelete";
import { ModalCreateAndUpdateTeacher } from "../components/ModalCreateAndUpdateTeacher";

export const HomeTeacherPage = () => {
  const {
    end,
    start,
    teacher,
    loading,
    pageCount,
    toggleOne,
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
              setTeacher(null);
              setActionModal("create");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Agregar Maestro
          </button>
        </div>

        {/* Lista de asignaturas */}
        <ListTeachers
          toggleOne={toggleOne}
          teachers={dataTeachers}
          setTeacher={setTeacher}
          setActionModal={setActionModal}
        />

        {
          dataTeachers.length > 0 && (
            <Pagination
              end={end}
              start={start}
              pageCount={pageCount}
              total={totalTeachers}
              handlePageClick={handlePageClick}
            />
          )
        }

        {
          (actionModal === "create" || actionModal === "edit") && (
            <ModalCreateAndUpdateTeacher
              teacher={teacher}
              setActionModal={setActionModal}
              createTeacher={createTeacher}
            />
          )
        }

        {
          actionModal === "view" && (
            <ModalViewTeacher
              teacher={teacher}
              setActionModal={setActionModal}
            />
          )
        }

        {
          actionModal === "delete" && (
            <ModalDelete
              model={teacher}
              setActionModal={setActionModal}
              deleteModel={deleteTeacher}
              message="el maestro"
              nameModel={`${teacher?.full_name}`}
            />
          )
        }

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading && actionModal !== "" ? <>Por favor, espere...</> : <>Listando los maestros.</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
