import { Toaster } from "react-hot-toast";
import { useStudents } from "../hooks/useStudents";
import Loading from "../../shared/components/Loading";
import { ListStudents } from "../components/ListStudents";
import { useCourses } from "../../courses/hooks/useCourses";
import { MdClass, MdKeyboardArrowDown } from "react-icons/md";

export const HomeStudentPage = () => {
  const {
    students,
    loading,
    getStudents
  } = useStudents();

  const {
    courses
  } = useCourses({allCourses: true});

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Buscar Estudiantes</h1>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdClass className="w-4 h-4 text-dark-text-secondary" />
              </div>
              <select
                id="grade_id"
                className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary outline-none transition-all appearance-none cursor-pointer"
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
        </div>

        <ListStudents
          students={students}
        />

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading ? <>Por favor, espere...</> : <>Listando los estudiantes.</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
