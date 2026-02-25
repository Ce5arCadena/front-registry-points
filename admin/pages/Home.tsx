import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";
import TableList from "../components/TableList";
import toast, { Toaster } from "react-hot-toast";
import { ActionSchool } from "../store/AdminStore";
import Loading from "../../shared/components/Loading";
import { ModalAddSchool } from "../components/ModalAddSchool";
import { ModalViewSchool } from "../components/ModalViewSchool";
import { ModalDeleteSchool } from "../components/ModalDeleteSchool";
import type { School, SchoolResponse, SchoolsInterface } from "../../shared/interfaces/schools";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const schoolAction = useAtomValue(ActionSchool);
  const [schools, setSchools] = useState<School[]>([]);
  const [showModalAddSchool, setShowModalAddSchool] = useState(false);

  const deleteSchool = async (id: number) => {
    setLoading(true);
    try {
      const URL = `/schools/${id}`;
      const responseSchools = await useApi<SchoolResponse>(URL, 'DELETE');
      toast(responseSchools.message, {
        icon: responseSchools.ok ? "✅" : "❌"
      });

      if (responseSchools.ok) {
        setSchools(() => {
          return schools.filter(school => school.id !== id);
        });
      };
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar el colegio. Comuniquese.');
    } finally {
      setLoading(false);
    };
  };

  const getSchools = async () => {
    try {
      const responseSchools = await useApi<SchoolsInterface>('/schools');
      const dataSchool = responseSchools.ok && responseSchools.data?.length > 0 ? responseSchools.data : [];
      setSchools(dataSchool);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los colegios. Comuniquese.');
    };
  };

  useEffect(() => {
    getSchools();
  }, []);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right"/>
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center justify-between p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Colegios inscritos</h1>

          <button 
            onClick={() => setShowModalAddSchool(!showModalAddSchool)}
            className="text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary">
            Agregar Colegio
          </button>
        </div>
        <TableList 
          schools={schools}
          setShowModalAddSchool={setShowModalAddSchool}
        />

        {/* Modal de agregar colegio */}
        {
          showModalAddSchool && (schoolAction !== "view" && schoolAction !== "delete") && (
            <ModalAddSchool 
              setSchools={setSchools}
              setShowModalAddSchool={setShowModalAddSchool}
            />
          )
        }

        {/* Modal detalle del colegio */}
        {
          schoolAction === "view" && (
            <ModalViewSchool
              setShowModalAddSchool={setShowModalAddSchool}
            />
          )
        }

        {/* Modal eliminar colegio */}
        { 
          schoolAction === "delete" && (
            <ModalDeleteSchool
              setShowModalAddSchool={setShowModalAddSchool}
              deleteSchool={deleteSchool}
            />
          )
        }

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading/>
              <span>Por favor, espera.</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home