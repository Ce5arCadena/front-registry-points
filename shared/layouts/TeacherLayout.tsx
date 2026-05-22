import { Outlet } from "react-router"
import { SidebarTeacher } from "../components/SidebarTeacher"

export const TeacherLayout = () => {
  return (
    <div className="bg-dark-bg w-screen h-screen flex text-dark-text">
      <SidebarTeacher />
      <div className="p-4 w-screen h-screen">
        <Outlet />
      </div>
    </div>
  )
}
