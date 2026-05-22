import { useSetAtom } from 'jotai';
import { NavLink } from 'react-router';
import { TbLogout2 } from "react-icons/tb";
import { type NavItem } from '../interfaces';
import { ROLES } from '../../shared/auth/roles';
import { useLogouts } from '../../auth/hooks/useLogouts';

export const SidebarSchool = () => {
  const { logout } = useLogouts();

  return (
    <div className="h-screen w-64 bg-dark-bg border-r border-gray-700 transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <header className="p-4 flex justify-between items-center border-b border-gray-700">
          <NavLink className="font-semibold text-xl text-white" to="/school/home">
            Bienvenido
          </NavLink>
        </header>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <li>
              {
                ROLES.SCHOOL.routes.map(({defaultUrl, url, IconType, label}: NavItem) => {
                  return !defaultUrl &&
                    <NavLink
                      key={url}
                      to={`${url}`}
                      className={({ isActive }) =>
                        `w-full text-left flex items-center gap-x-3 py-2 px-3 text-sm  rounded-lg transition-colors 
                          ${isActive ? 'bg-light-bg text-dark-bg' : 'text-white'}
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

        <div className='p-4 flex flex-col'>
          <span
            onClick={logout}
            className='flex gap-2 items-center hover:bg-primary/20 hover:rounded-md transition-all duration-300 ease-in-out cursor-pointer p-2 text-sm '>
            <TbLogout2 className='w-4 h-4' /> Cerrar Sesión
          </span>
        </div>
      </div>
    </div>
  )
}
