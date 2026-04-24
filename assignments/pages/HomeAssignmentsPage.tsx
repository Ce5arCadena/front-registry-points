import { Toaster } from 'react-hot-toast';
import Loading from '../../shared/components/Loading';
import { useAssignments } from '../hooks/useAssignments';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ListAssignments } from '../components/ListAssignments';
import { actionModalAtom, assignmentAtom, loadingAtom } from '../store/assignmentsStore';

export const HomeAssignmentsPage = () => {
  useAssignments();

  const loading = useAtomValue(loadingAtom);
  const setAssignment = useSetAtom(assignmentAtom);
  const [actionModal, setActionModal] = useAtom(actionModalAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Asignación de materias por curso</h1>

          {/* <ActionsStudents
            courses={courses}
            getStudents={getStudents}
            setActionModal={setActionModal}
          /> */}
        </div>

        <ListAssignments
          setAssignment={setAssignment}
          setActionModal={setActionModal}
        />

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
