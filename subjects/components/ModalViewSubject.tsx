import { IoCloseCircleOutline } from "react-icons/io5";
import { type Subject } from "../../shared/interfaces/subjects";

export const ModalViewSubject = ({
  subject,
  setActionModal
}: {
  subject: Subject | null | undefined,
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
              subject?.name
            }
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />
      </div>
    </div>
  )
}
