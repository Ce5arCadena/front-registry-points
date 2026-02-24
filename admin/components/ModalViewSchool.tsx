import { useAtomValue, useSetAtom } from 'jotai';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ActionSchool, SchoolAtom } from '../store/AdminStore';

export const ModalViewSchool = ({
    setShowModalAddSchool
} : {
    setShowModalAddSchool : (value: boolean) => void
}) => {
    const setSchoolAction = useSetAtom(ActionSchool);
    const schoolAtomValue = useAtomValue(SchoolAtom);

    return (
        <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
            <IoCloseCircleOutline 
                className="text-2xl absolute right-2 top-2 cursor-pointer"
                onClick={() => {
                    setSchoolAction("");
                    setShowModalAddSchool(false);
                }}
            />

            <div className="bg-dark-bg max-w-sm w-full rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
                <span className={`self-start text-xs font-semibold ${schoolAtomValue?.status === "ACTIVE" ? "bg-green-400" : "bg-red-400"} px-3 py-1 rounded-full`}>
                    {
                        schoolAtomValue?.status === "ACTIVE" ? "Activo" : "Inactivo"
                    }
                </span>

                <div>
                    <h3 className="text-xl font-bold leading-snug">
                        { 
                            schoolAtomValue?.name
                        }
                    </h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100" />

                {/* Info rows */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Creado</span>
                        <span className="">
                            {
                                schoolAtomValue?.created_at ?
                                    new Date(schoolAtomValue.created_at).toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    }) : "Sin fecha"
                            }
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Email</span>
                        <span className="">
                            {
                                schoolAtomValue?.user.email
                            }
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}
