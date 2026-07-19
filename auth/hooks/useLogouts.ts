import { useNavigate } from "react-router";

export const useLogouts = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    localStorage.removeItem("nameUser");
    navigate("/login");
  }

  return { logout };
}
