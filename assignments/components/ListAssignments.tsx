import { useSetAtom } from "jotai";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { type Assignments } from "../../shared/interfaces/assignments";
import { actionModalAtom, assignmentAtom } from "../store/assignmentsStore";

export const ListAssignments = ({ dataAssignments }: { dataAssignments: Assignments[] }) => {
  const setAssignment = useSetAtom(assignmentAtom);
  const setActionModal = useSetAtom(actionModalAtom);

  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 content-start overflow-y-auto px-2 py-1">
      {
        dataAssignments.length > 0 && dataAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-dark-bg-elevated rounded-lg border border-secondary h-44 overflow-y-auto pb-3 px-3 relative"
          >
            <div className="flex gap-2 items-center justify-between mb-2 w-full sticky top-0 bg-dark-bg-elevated pt-3 pb-1">
              <div className="flex gap-2 items-center max-w-[80%]">
                <span className="rounded-full min-w-10 h-10 bg-light-bg-secondary text-dark-bg font-bold flex justify-center items-center">
                  {assignment.full_name[0]}{assignment.full_name.split(" ")[1]?.[0] ?? ""}
                </span>
                <h3 
                  className="font-bold truncate decoration-2 underline hover:text-primary transition ease-in duration-200 cursor-pointer"
                  onClick={() => {
                    setActionModal("view");
                    setAssignment(assignment);
                  }}
                >
                  {assignment.full_name}
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {
                assignment.assignments.length > 0 && assignment.assignments.map(item => (
                  <div key={item.grade_id} className="bg-dark-bg-secondary rounded-xl mb-1 flex-col px-2 py-1">
                    <div className="flex items-center justify-between">
                      <h4 className="flex text-sm items-center gap-2 truncate"><MdPeopleOutline />{item.grade}</h4>
                    </div>
                    <div className="flex flex-col gap-2 mt-2 mb-1">
                      {
                        item.subjects.length > 0 && item.subjects.map(subject => (
                          <div className="flex gap-2 bg-light-bg rounded-lg justify-between p-1" key={subject.id}>
                            <h5 className="text-sm bg-light-bg-secondary rounded-lg px-1 text-dark-bg truncate">{subject.name}</h5>
                            <div className="flex gap-1 items-center">
                              <RiEdit2Line
                                className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300 text-dark-bg"
                                onClick={() => {
                                  setAssignment({
                                    ...assignment,
                                    assignments: assignment.assignments
                                      .map(assign => ({
                                        ...assign,
                                        subjects: assign.subjects.filter(subjectFilter => subjectFilter.assignment_id == subject.assignment_id)
                                      }))
                                      .filter(assign => assign.subjects.length > 0)
                                  });
                                  setActionModal("edit");
                                }}
                              />
                              <MdDeleteOutline
                                className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300 text-dark-bg"
                                onClick={() => {
                                  setAssignment({
                                    ...assignment,
                                    assignments: assignment.assignments
                                      .map(assign => ({
                                        ...assign,
                                        subjects: assign.subjects.filter(subjectFilter => subjectFilter.assignment_id == subject.assignment_id)
                                      }))
                                      .filter(assign => assign.subjects.length > 0)
                                  });
                                  setActionModal("delete");
                                }}
                              />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
