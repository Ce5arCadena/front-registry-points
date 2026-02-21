import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import type { School } from "../../shared/interfaces/schools";

const TableList = ({ schools } : { schools: School[] }) => {
    return (
        <div className="h-full">
            <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                <thead className="bg-gray-800 rounded-md text-light-bg">
                    <tr className="">
                        <th className="p-3">#</th>
                        <th className="p-3 text-center">Nombre</th>
                        <th className="p-3 text-center">Creado</th>
                        <th className="p-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schools.length > 0 && schools.map((school) => (
                            <tr className="bg-gray-800 text-center text-light-bg" key={school.id}>
                                <td className="p-2">
                                    <span>{school.id}</span>
                                </td>
                                <td className="p-2 font-bold">
                                    {school.name}
                                </td>
                                <td className="p-2">
                                    {new Date(school.created_at).toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </td>
                                <td className="flex gap-1 justify-center p-2">
                                    <IoEyeOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"/>
                                    <RiEdit2Line className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"/>
                                    <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"/>
                                </td>
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableList