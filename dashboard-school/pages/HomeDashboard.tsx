import { Toaster } from "react-hot-toast";
import { useDashboard } from "../hooks/useDashboard";
import Loading from "../../shared/components/Loading";
import { ItemsCards } from "../../courses/components/ItemsCards";
import { ItemsNavigate } from "../../courses/components/ItemsNavigate";

export const HomeDashboard = () => {
  const {
    loading,
    dataDashboard
  } = useDashboard();

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-4">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex flex-col p-2 rounded-l-xl border-primary">
          <h2 className="text-2xl font-medium">Bienvenido</h2>
          <h3 className="text-md">Resumen general del sistema</h3>
        </div>

        {
          dataDashboard?.data && (
            <ItemsCards dataDashboard={dataDashboard}/>
          )
        }

        <ItemsNavigate/>

        {
          loading && (
            <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
              <Loading />
              <span>
                {
                  loading ? <>Por favor, espere...</> : <> Listando tus datos...</>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
