import { Outlet } from "react-router"
import { SidebarSchool } from "../components/SidebarSchool"

export const SchoolLayout = () => {
  return (
    <div className="bg-dark-bg w-screen h-screen flex text-dark-text">
        <SidebarSchool/>
        <div className="p-4 w-screen h-screen">
            <Outlet/>
        </div>
    </div>
  )
}
