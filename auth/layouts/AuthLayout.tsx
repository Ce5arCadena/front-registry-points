import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <div className="bg-dark-bg w-screen h-screen p-2 flex justify-center items-center text-dark-text">
        <Outlet/>
    </div>
  )
}

export default AuthLayout