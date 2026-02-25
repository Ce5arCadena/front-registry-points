import { useAtomValue, useSetAtom } from 'jotai';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ActionSchool, SchoolAtom } from '../store/AdminStore';

export const ModalDeleteSchool = ({
    deleteSchool,
    setShowModalAddSchool
} : {
    deleteSchool: (id: number) => void,
    setShowModalAddSchool : (value: boolean) => void
}) => {
    const setSchoolAction = useSetAtom(ActionSchool);
    const schoolAtomValue = useAtomValue(SchoolAtom);

    return (
        <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
            <IoCloseCircleOutline 
                className="text-2xl absolute right-2 top-2 cursor-pointer"
                onClick={
                    () => {
                        setSchoolAction("");
                        setShowModalAddSchool(false);
                    }
                }
            />

            <div className="bg-dark-bg max-w-sm w-full rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
                <div>
                    <h3 className="text-xl font-bold leading-snug">
                        ¿Estás seguro que deseas eliminar el colegio 
                        <span className='text-error ml-1'>
                            { 
                                schoolAtomValue?.name
                            }
                        </span>?
                    </h3>
                </div>

                <div className="h-px bg-gray-100" />

                <div className='flex gap-2 justify-center'>
                    <button 
                        className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-warning hover:text-warning"
                        onClick={() => {
                            deleteSchool(Number(schoolAtomValue?.id));
                            setSchoolAction("");
                            setShowModalAddSchool(false);
                        }}
                    >
                        Eliminar
                    </button>

                    <button
                        onClick={() => {
                            setSchoolAction("");
                            setShowModalAddSchool(false);
                        }} 
                        className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary">
                        Cancelar
                    </button>
                </div>
            </div> 
        </div>
    )
}
