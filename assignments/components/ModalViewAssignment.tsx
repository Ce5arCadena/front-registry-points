import { MdSubject } from "react-icons/md";
import { useAtomValue, useSetAtom } from "jotai";
import { FaGraduationCap } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { INITIAL_ASSIGNMENT_STATE } from "../../shared/interfaces/assignments";
import { actionModalAtom, assignmentAtom, valuesAssignmentAtom } from "../store/assignmentsStore";

export const ModalViewAssignment = () => {
  const assignment = useAtomValue(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const setValuesAssignment = useSetAtom(valuesAssignmentAtom);

  if (!assignment) {
    setActionModal("");
    return null;
  }

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer transition ease-in duration-200 hover:text-secondary"
        onClick={() => {
          setActionModal("");
          setValuesAssignment(INITIAL_ASSIGNMENT_STATE)
        }}
      />

      <div
        className="bg-dark-bg-elevated rounded-lg border border-secondary overflow-y-auto min-w-96 max-h-[80vh] pb-3 px-3 relative"
      >
        <div className="flex gap-2 items-center justify-between mb-2 w-full sticky top-0 bg-dark-bg-elevated pt-3 pb-1">
          <IoCloseCircleOutline
            className="text-2xl absolute right-2 top-5 cursor-pointer transition ease-in duration-200 hover:text-secondary"
            onClick={() => {
              setActionModal("");
              setValuesAssignment(INITIAL_ASSIGNMENT_STATE)
            }}
          />
          <div className="flex gap-2 items-center max-w-[80%]">
            <span className="rounded-full min-w-10 h-10 bg-light-bg-secondary text-dark-bg font-bold flex justify-center items-center">
              {assignment.full_name[0]}{assignment.full_name.split(" ")[1]?.[0] ?? ""}
            </span>
            <h3 className="font-bold truncate">{assignment.full_name}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {
            assignment.assignments.length > 0 && assignment.assignments.map(item => (
              <div key={item.grade_id} className="bg-dark-bg-secondary rounded-xl mb-1 flex-col px-2 py-2">
                <div className="flex items-center justify-between">
                  <h4 className="flex text-sm items-center gap-2 truncate"><FaGraduationCap />{item.grade}</h4>

                  <div className="bg-primary/50 rounded-full px-2 py-1 text-xs">
                    <span>
                      {item.subjects.length} {item.subjects.length > 1 ? "asignaturas" : "asignatura"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 mb-1">
                  {
                    item.subjects.length > 0 && item.subjects.map(subject => (
                      <div className="flex gap-1 items-center bg-light-bg rounded-lg p-1" key={subject.id}>
                        <MdSubject className="text-dark-bg-secondary" />
                        <h5 className="text-sm bg-light-bg-secondary rounded-lg px-1 text-dark-bg truncate">{subject.name}</h5>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
