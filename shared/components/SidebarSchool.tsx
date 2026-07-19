import { NavLink } from 'react-router';
import { TbLogout2 } from "react-icons/tb";
import { type NavItem } from '../interfaces';
import { ROLES } from '../../shared/auth/roles';
import { useLogouts } from '../../auth/hooks/useLogouts';

export const SidebarSchool = () => {
  const { logout } = useLogouts();
  const nameUser = localStorage.getItem('nameUser') ?? '';

  return (
    <div className="h-screen w-64 bg-dark-bg border-r border-gray-700 shadow-xl shadow-black/20 transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <header className="p-4 flex justify-between items-center border-b border-gray-700 bg-dark-bg-elevated/50">
          <NavLink className="font-semibold text-xl text-white flex items-center gap-2 min-w-0" to="/teacher/home">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span className="truncate max-w-32">
              Hola{nameUser ? `, ${nameUser.split(" ")[0]}` : ''}
            </span>
          </NavLink>
        </header>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1.5">
            <li>
              {
                ROLES.SCHOOL.routes.map(({ defaultUrl, url, IconType, label }: NavItem) => {
                  return !defaultUrl &&
                    <NavLink
                      key={url}
                      to={`${url}`}
                      className={({ isActive }) =>
                        `w-full text-left flex items-center gap-x-3 py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-200
                          ${isActive ? 'bg-primary text-white shadow-md shadow-primary/30' : 'text-gray-300 hover:bg-dark-bg-elevated hover:text-white'}
                        `}
                    >
                      <IconType className="w-4 h-4" />
                      <span>{label}</span>
                    </NavLink>
                })
              }
            </li>
          </ul>
        </nav>

        <div className='p-4 flex flex-col border-t border-gray-700'>
          <span
            onClick={logout}
            className='flex gap-2 items-center hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2.5 text-sm text-gray-300 font-medium'>
            <TbLogout2 className='w-4 h-4' /> Cerrar Sesión
          </span>
        </div>
      </div>
    </div>
  )
}
