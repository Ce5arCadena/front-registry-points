import { useSetAtom } from "jotai";
import { studentAtom } from "../store/studentsStore";
import { type Course } from "../../shared/interfaces/courses";
import { MdClass, MdKeyboardArrowDown } from "react-icons/md";

export const ActionsStudents = ({
  courses,
  getStudents,
  setActionModal
}: {
  courses: Course[],
  getStudents: (id: number) => void,
  setActionModal: (value: string) => void
}) => {
  const setStudent = useSetAtom(studentAtom);

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
          getStudents(Number(e.target.value));
        }}
      >
        <option value="">Buscar por curso</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <MdKeyboardArrowDown className="w-4 h-4 text-dark-text-secondary" />
      </div>
    </div>
  </div>
}
