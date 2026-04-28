import { useAtomValue } from "jotai";
import { MdPeopleOutline } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { assignmentsAtom } from "../store/assignmentsStore";
import { type AssignmentsInterface } from "../../shared/interfaces/assignments";

export const ListAssignments = (
  {
    setAssignment,
    setActionModal,
  }: {
    setActionModal: (value: string) => void,
    setAssignment: (subject: AssignmentsInterface) => void,
  }
) => {
  const dataAssignments = useAtomValue(assignmentsAtom);

  return (
    <div className="h-full flex flex-wrap justify-between gap-3">
      {/* <label className="relative flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  // checked={selectedIds.length === dataStudents.length}
                  // onChange={getIdsStudents}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border border-gray-500 bg-transparent
                        peer-checked:bg-primary peer-checked:border-primary
                        flex items-center justify-center transition-all duration-150">
                  <svg
                    className="hidden peer-checked:block w-3 h-3 text-white"
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </label> */}
      {
        dataAssignments.length > 0 && dataAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-dark-bg-elevated rounded-lg border border-secondary min-w-80 max-h-52 overflow-y-scroll p-3">
            <div className="flex gap-2 items-center mb-2">
              <span className="rounded-full w-10 h-10 bg-light-bg-secondary text-dark-bg font-bold flex justify-center items-center">{assignment.full_name[0]}{assignment.full_name.split(" ")[1]?.[0] ?? ""}</span>
              <h3 className="font-bold">{assignment.full_name}</h3>
            </div>
            <div className="flex flex-col gap-1">
              {
                assignment.assignments.length > 0 && assignment.assignments.map(item => (
                  <div key={item.grade_id} className="bg-dark-bg-secondary rounded-xl mb-1 flex-col px-2 py-1">
                    <h4 className="flex text-sm items-center gap-2"><MdPeopleOutline /> {item.grade}</h4>
                    <div className="flex gap-2 mt-1">
                      {
                        item.subjects.length > 0 && item.subjects.map(subject => (
                          <h5 className="text-sm bg-light-bg-secondary rounded-xl px-1 text-dark-bg" key={subject.id}>{subject.name}</h5>
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
    </div >
  )
}
