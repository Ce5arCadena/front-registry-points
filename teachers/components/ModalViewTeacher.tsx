import { FaRegIdCard } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { type Teacher } from "../../shared/interfaces/teachers";
import { MdOutlinePhoneAndroid, MdSubject } from "react-icons/md";
import { IoCloseCircleOutline, IoPersonOutline } from "react-icons/io5";

export const ModalViewTeacher = ({
  teacher,
  setActionModal
}: {
  teacher: Teacher | null | undefined,
  setActionModal: (value: string) => void,
}) => {
  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <div className="bg-dark-bg relative max-w-sm rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
        <IoCloseCircleOutline
          className="text-2xl absolute right-2 top-2 cursor-pointer hover:text-cyan-400 transition-all ease-in duration-300"
          onClick={() => {
            setActionModal("");
          }}
        />
        <span className={`self-start text-xs font-semibold ${teacher?.status === "ACTIVE" ? "bg-green-400" : "bg-red-400"}  px-3 py-1 rounded-full`}>
          {teacher?.status === "ACTIVE" ? "Activo" : "Inactivo"}
        </span>

        <div>
          <h3 className="text-xl font-bold leading-snug">
            {
              teacher?.full_name
            }
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />
        <h4 className="">Datos Básicos</h4>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-2 items-center bg-dark-bg-elevated/70 px-2 py-1 rounded-full">
            <HiOutlineMail />
            <span className="text-xs">
              {teacher?.user.email}
            </span>
          </div>

          <div className="flex gap-2 items-center bg-dark-bg-elevated/70 px-2 py-1 rounded-full">
            <MdOutlinePhoneAndroid />
            <span className="text-xs">
              {teacher?.phone}
            </span>
          </div>

          <div className="flex gap-2 items-center bg-dark-bg-elevated/70 px-2 py-1 rounded-full">
            <FaRegIdCard />
            <span className="text-xs">
              {teacher?.document}
            </span>
          </div>
        </div>

        {
          teacher?.subjects && teacher?.subjects.length > 0 && (
            <>
              <div className="h-px bg-gray-100" />
              <h4 className="">Asignaturas</h4>
              <div className="flex flex-wrap gap-2">
                {
                  teacher.subjects.map(subject => (
                    <div
                      key={subject.id}
                      className="flex gap-2 items-center bg-dark-bg-elevated/70 px-2 py-1 rounded-full">
                      <MdSubject />
                      <span className="text-xs">
                        {subject.name}
                      </span>
                    </div>
                  ))
                }
              </div>
            </>
          )
        }

        {
          teacher?.grades && teacher?.grades.length > 0 && (
            <>
              <div className="h-px bg-gray-100" />
              <h4 className="">Cursos</h4>
              <div className="flex flex-wrap gap-2">
                {
                  teacher.grades.map(grade => (
                    <div
                      key={grade.id}
                      className="flex gap-2 items-center bg-dark-bg-elevated/70 px-2 py-1 rounded-full">
                      <IoPersonOutline />
                      <span className="text-xs">
                        {grade.name}
                      </span>
                    </div>
                  ))
                }
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}
