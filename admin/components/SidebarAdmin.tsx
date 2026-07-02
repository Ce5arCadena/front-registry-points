import { NavLink } from "react-router";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineSchool } from "react-icons/md";
import { useLogouts } from "../../auth/hooks/useLogouts";

const SidebarAdmin = () => {
  const { logout } = useLogouts();

  return (
    <div className="h-screen w-64 bg-dark-bg border-r border-gray-700 transform transition-transform duration-300 ease-in-out">
      {/* Sidebar */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="p-4 flex justify-between items-center border-b border-gray-700">
          <a className="font-semibold text-xl text-white" href="#">
            Admin Panel
          </a>
        </header>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {/* Menú Users con acordeón */}
            <li>
              <NavLink
                to='/admin/home'
                className={({ isActive }) =>
                  `w-full text-left flex items-center gap-x-3 py-2 px-3 text-sm text-white rounded-lg transition-colors ${isActive ? 'bg-dark-bg-elevated' : 'justify-between'}
                            `}
              >
                <MdOutlineSchool className="w-4 h-4" />
                <span>Colegios</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className='p-4 flex flex-col'>
          <span
            onClick={logout}
            className='flex gap-2 items-center hover:bg-primary/20 hover:rounded-md transition-all duration-300 ease-in-out cursor-pointer p-2 text-sm '>
            <TbLogout2 className='w-4 h-4' /> Cerrar Sesión
          </span>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin