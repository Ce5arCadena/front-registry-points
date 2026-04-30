import { useSetAtom } from "jotai";
import { actionModalAtom, assignmentAtom } from "../store/assignmentsStore";

export const ActionsAssignments = () => {
  const setAssignment = useSetAtom(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  return (
    <div className='flex gap-2'>
      <button
        onClick={() => {
          setAssignment(null);
          setActionModal("create");
        }}
        className="text-white px-3 py-1.5 bg-dark-bg-secondary rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
        Crear Asignación
      </button>
    </div>
  )
}
