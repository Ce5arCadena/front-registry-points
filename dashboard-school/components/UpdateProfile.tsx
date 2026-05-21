import { useSetAtom } from "jotai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { showUpdateProfileAtom } from "../store/dashboardStore";

export const UpdateProfile = () => {
  const setUpdateProfile = useSetAtom(showUpdateProfileAtom);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setUpdateProfile(false);
        }}
      />
    </div>
  )
}
