import { Toaster } from "react-hot-toast"
import { useSubjects } from "../hooks/useSubjects";
import Loading from "../../shared/components/Loading";
import { ListSubjects } from "../components/ListSubjects";
import { Pagination } from "../../courses/components/Pagination";
import { ModalDeleteSubject } from "../components/ModalDeleteSubject";
import { ModalCreateAndUpdateSubject } from "../components/ModalCreateAndUpdateSubject";
import { ModalViewSubject } from "../components/ModalViewSubject";

export const HomeSubjectPage = () => {
  const {
    end,
    start,
    subject,
    loading,
    pageCount,
    setSubject,
    actionModal,
    dataSubjects,
    deleteSubject,
    createSubject,
    totalSubjects,
    setActionModal,
    handlePageClick,
  } = useSubjects();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Asignaturas</h1>

          <button
            onClick={() => {
              setSubject(null);
              setActionModal("create");
            }}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
            Agregar Asignatura
          </button>
        </div>

        {/* Lista de asignaturas */}
        <ListSubjects
          subjects={dataSubjects}
          setSubject={setSubject}
          setActionModal={setActionModal}
        />

        {
          dataSubjects.length > 0 && (
            <Pagination
              end={end}
              start={start}
              pageCount={pageCount}
              total={totalSubjects}
              handlePageClick={handlePageClick}
            />
          )
        }

        {
          (actionModal === "create" || actionModal === "edit") && (
            <ModalCreateAndUpdateSubject
              subject={subject}
              setActionModal={setActionModal}
              createSubject={createSubject}
            />
          )
        }

        {
          actionModal === "view" && (
            <ModalViewSubject
              subject={subject}
              setActionModal={setActionModal}
            />
          )
        }

        {
          actionModal === "delete" && (
            <ModalDeleteSubject
              subject={subject}
              setActionModal={setActionModal}
              deleteSubject={deleteSubject}
            />
          )
        }

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading && actionModal !== "" ? <>Por favor, espere...</> : <>Listando las asignaturas.</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
