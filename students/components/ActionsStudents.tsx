import { useSetAtom } from "jotai";
import { type Course } from "../../shared/interfaces/courses";
import { MdClass, MdKeyboardArrowDown } from "react-icons/md";
import { courseIdAtom, studentAtom } from "../store/studentsStore";
import { useChangeStatesStudents } from "../hooks/useChangeStatesStudents";

export const ActionsStudents = ({
  courses,
  getStudents,
  setActionModal
}: {
  courses: Course[],
  getStudents: (id: number, resetData?: boolean) => void,
  setActionModal: (value: string) => void
}) => {
  const setStudent = useSetAtom(studentAtom);
  const setCourseId = useSetAtom(courseIdAtom);

  const {
    changeStatusTeachersByIds
  } = useChangeStatesStudents();

  return <div className="flex gap-2">
    <button
      onClick={() => {
        setStudent(null);
        setActionModal("create");
      }}
      className="text-white px-3 py-1.5 bg-dark-bg-secondary rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
      Agregar Estudiante
    </button>

    <button
      onClick={() => {
        setStudent(null);
        changeStatusTeachersByIds();
      }}
      className="text-white px-3 py-1.5 bg-dark-bg-secondary rounded-lg transition-all duration-300 cursor-pointer border hover:border-primary hover:text-primary">
      Cambiar Estado
    </button>

    <div className="relative min-w-42">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MdClass className="w-4 h-4 text-dark-text-secondary" />
      </div>
      <select
        id="grade_id"
        className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border transition-all duration-300 hover:border-primary hover:text-primary text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary outline-none appearance-none cursor-pointer"
        onChange={(e) => {
          if (!e.target.value) return;
          setCourseId(Number(e.target.value));
          getStudents(Number(e.target.value), true);
        }}
      >
        <option value="">Buscar por curso</option>
        {
          courses.length > 0 && courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))
        }
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <MdKeyboardArrowDown className="w-4 h-4 text-dark-text-secondary" />
      </div>
    </div>
  </div>
}
