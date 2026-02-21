import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";
import TableList from "../components/TableList";
import toast, { Toaster } from "react-hot-toast";
import type { School, SchoolsInterface } from "../../shared/interfaces";

const Home = () => {
  const [schools, setSchools] = useState<School[]>([]);

  const getSchools = async () => {
    try {
      const responseSchools = await useApi<SchoolsInterface>('/schools');

      if (responseSchools.status === 200 && responseSchools.data?.schools?.length > 0) {
        setSchools(responseSchools.data.schools);
      } else {
        setSchools([]);
      };
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los colegios. Comuniquese.');
    };
  };

  useEffect(() => {
    getSchools();
  }, []);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full">
      <Toaster/>
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center p-2 rounded-l-xl border-primary">
          <h1 className="text-2xl font-bold">Lista de Colegios inscritos</h1>
        </div>
        <TableList schools={schools}/>
      </div>
    </div>
  )
}

export default Home