import { NavLink } from "react-router";
import { MdOutlineSchool } from "react-icons/md";

const SidebarAdmin = () => {
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

    // const toggleAccordion = (id: string) => {
    //     setOpenAccordions(prev => ({
    //         ...prev,
    //         [id]: !prev[id]
    //     }));
    // };

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
                                `w-full text-left flex items-center gap-x-3 py-2 px-3 text-sm text-white rounded-lg transition-colors ${
                                isActive ? 'bg-dark-bg-elevated' : 'justify-between'}
                            `}
                        >
                            <MdOutlineSchool className="w-4 h-4" />
                            <span>Colegios</span>
                        </NavLink>
                        {/* <button
                            onClick={() => toggleAccordion('users-main')}
                            className="w-full text-left flex items-center justify-between gap-x-3 py-2 px-3 text-sm text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <div className="flex items-center gap-x-3 cursor-pointer">
                                
                            </div>
                        </button> */}
                            {/* Si se necesita submenu se deja este codigo */}
                            {/* {openAccordions['users-main'] ? (
                                <MdOutlineKeyboardArrowUp className="w-5 h-5 cursor-pointer"/>
                            ) : (
                                <IoIosArrowDown className="w-5 h-5 cursor-pointer"/>
                            )} */}

                        {/* Submenú nivel 1. Lo dejo por si luego necesito menu con subnivel */}
                        {/* <div
                            className={`
                                overflow-hidden transition-all duration-300 ease-in-out
                                ${openAccordions['users-main'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                            `}
                        >
                            <ul className="ml-7 space-y-1">
                                <li>
                                <button
                                    onClick={() => toggleAccordion('submenu-1')}
                                    className="w-full text-left cursor-pointer flex items-center gap-2 py-2 px-3 text-sm text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <IoMdAddCircleOutline className="w-4 h-4" />
                                    <span>Crear</span>
                                </button>
                                </li>
                            </ul>
                        </div>  */}
                    </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SidebarAdmin