import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";
import { useDashboard } from "../hooks/useDashboard";
import Loading from "../../shared/components/Loading";
import { UpdateProfile } from "../components/UpdateProfile";
import { showUpdateProfileAtom } from "../store/dashboardStore";
import { ItemsCards } from "../../courses/components/ItemsCards";
import { ItemsNavigate } from "../../courses/components/ItemsNavigate";

export const HomeDashboard = () => {
  const {
    loading,
    dataDashboard
  } = useDashboard();

  const showUpdateProfile = useAtomValue(showUpdateProfileAtom);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-4">
        <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex flex-col p-3 rounded-l-xl border-primary">
          <h2 className="text-2xl font-medium">Bienvenido</h2>
        </div>

        {
          dataDashboard?.data && (
            <ItemsCards dataDashboard={dataDashboard}/>
          )
        }

        <ItemsNavigate/>

        {
          showUpdateProfile && (
            <UpdateProfile />
          )
        }

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
