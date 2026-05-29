import { Toaster } from 'react-hot-toast';
import { useAtom, useAtomValue } from 'jotai';
import Loading from '../../shared/components/Loading';
import { useAssignments } from '../hooks/useAssignments';
import { ListAssignments } from '../components/ListAssignments';
import { Pagination } from '../../courses/components/Pagination';
import { ModalDelete } from '../../shared/components/ModalDelete';
import { ActionsAssignments } from '../components/ActionsAssignments';
import { ModalViewAssignment } from '../components/ModalViewAssignment';
import { ModalCreateAndUpdateAssignment } from '../components/ModalCreateAndUpdateAssignment';
import { actionModalAtom, assignmentAtom, assignmentsAtom, endAtom, loadingAtom, pageCountAtom, startAtom, totalAssignmentsAtom } from '../store/assignmentsStore';

export const HomeAssignmentsPage = () => {
  const { 
    deleteAssignment, 
    dataAssignments,
    handlePageClick
   } = useAssignments();

  const end = useAtomValue(endAtom);
  const start = useAtomValue(startAtom);
  const loading = useAtomValue(loadingAtom);
  const pageCount = useAtomValue(pageCountAtom);
  const assignment = useAtomValue(assignmentAtom);
  const totalAssignments = useAtomValue(totalAssignmentsAtom);
  const [actionModal, setActionModal] = useAtom(actionModalAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Asignación de materias por curso</h1>

          <ActionsAssignments />
        </div>

        <ListAssignments 
          dataAssignments={dataAssignments}
        />

        {
          dataAssignments.length > 0 && (
            <Pagination
              end={end}
              start={start}
              pageCount={pageCount}
              total={totalAssignments}
              handlePageClick={handlePageClick}
            />
          )
        }

        {
          (actionModal === "create" || actionModal === "edit") && (
            <ModalCreateAndUpdateAssignment />
          )
        }

        {
          actionModal === "view" && assignment && (
            <ModalViewAssignment />
          )
        }

        {
          actionModal === "delete" && assignment && (
            <ModalDelete
              idModel={assignment.assignments[0].subjects[0].assignment_id}
              setActionModal={setActionModal}
              deleteModel={deleteAssignment}
              message="la asignación de la materia"
              nameModel={`${assignment.assignments[0].subjects[0].name} al maestro ${assignment.full_name} del curso ${assignment.assignments[0].grade}`}
            />
          )
        }

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading ? <>Por favor, espere...</> : <>Listando las aisgnaciones.</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
