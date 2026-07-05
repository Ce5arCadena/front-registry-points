import { NavLink } from "react-router";
import { Toaster } from "react-hot-toast";

import { HiOutlineTag } from "react-icons/hi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

import { cards } from "../api/data";
import Loading from "../../shared/components/Loading";
import { useAdminTeacher } from "../hooks/useAdminTeacher";

export const HomeTeacherAdmin = () => {
  const { loading, dataAdminTeacher } = useAdminTeacher();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-4">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex flex-col p-3 rounded-l-xl border-primary">
          <h2 className="text-2xl font-medium">Bienvenido</h2>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-gray-900 border border-blue-500/40 rounded-lg px-5 py-4 min-w-[220px]">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <HiOutlineTag className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Categorías de puntos</p>
              <p className="text-white text-2xl font-bold">{dataAdminTeacher?.pointCategoriesCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-900 border border-blue-500/40 rounded-lg px-5 py-4 min-w-[220px]">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <HiOutlineClipboardDocumentCheck className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Asignaciones</p>
              <p className="text-white text-2xl font-bold">{dataAdminTeacher?.hasPoincategoryContext}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <NavLink
              key={card.title}
              to={card.to}
              className="flex items-center gap-4 bg-gray-900 border border-blue-500/40 rounded-lg px-5 py-4 hover:border-blue-400 hover:bg-gray-800 transition-colors"
            >
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <card.icon className="text-blue-400 text-2xl" />
              </div>
              <div>
                <p className="text-white font-semibold">{card.title}</p>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </div>
            </NavLink>
          ))}
        </div>

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                Por favor, espere...
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
