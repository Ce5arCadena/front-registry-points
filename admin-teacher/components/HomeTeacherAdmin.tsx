import { Toaster } from "react-hot-toast"

export const HomeTeacherAdmin = () => {
  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-4">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex flex-col p-3 rounded-l-xl border-primary">
          <h2 className="text-2xl font-medium">Bienvenido</h2>
        </div>
      </div>
    </div>
  )
}
