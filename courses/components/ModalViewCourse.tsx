import { LiaBookSolid } from "react-icons/lia";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type Course } from "../../shared/interfaces/courses"

export const ModalViewCourse = ({
  course,
  setActionModal
}: {
  course: Course | null | undefined,
  setActionModal: (value: string) => void,
}) => {
  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">

      <div className="bg-dark-bg relative max-w-sm w-full rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
        <IoCloseCircleOutline
          className="text-2xl absolute right-2 top-2 cursor-pointer hover:text-cyan-400 transition-all ease-in duration-300"
          onClick={() => {
            setActionModal("");
          }}
        />
        <span className={`self-start text-xs font-semibold bg-green-400 px-3 py-1 rounded-full`}>
          Activo
        </span>

        <div>
          <h3 className="text-xl font-bold leading-snug">
            {
              course?.name
            }
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        <div>
          <h4 className="font-bold leading-snug">
            Asignaturas
          </h4>

          <div className="flex gap-2">
            {
              course?.subjects && course.subjects.length > 0 ? course?.subjects.map(subject =>
                <div key={subject.id} className="
                  flex gap-1 mt-1 bg-dark-bg-elevated w-auto rounded-full px-2 py-1 cursor-pointer
                  hover:bg-primary/70 transition-all ease-in-out duration-500
                ">
                  <LiaBookSolid />
                  <h5 className="text-xs font-bold leading-snug">{subject.name}</h5>
                </div>
              ) : (
                <h4 className="bg-dark-bg-elevated px-2 py-1 rounded-full mt-2">Este curso no tiene asignaturas aún.</h4>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
