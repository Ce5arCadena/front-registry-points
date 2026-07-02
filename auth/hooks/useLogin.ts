import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import { type SubmitHandler } from "react-hook-form";
import { type RoleKey, ROLES } from "../../shared/auth/roles";
import type { LoginData, LoginResponse } from "../../shared/interfaces";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginData> = async (values) => {
    setLoading(true);
    try {
      const responseLogin = await useApi<LoginResponse>('/auth/login', 'POST', values);
      toast(responseLogin.message, {
        icon: responseLogin.ok ? "✅" : "❌"
      });
      if (!responseLogin.ok) return;

      localStorage.setItem('rol', responseLogin.data.rol);
      localStorage.setItem('token', responseLogin.data.token);

      const rol = responseLogin.data.rol;
      navigate(ROLES[rol as RoleKey].defaultRoute);
    } catch (error) {
      toast.error('Ocurrió un error al realizar la petición', {
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    };
  };

  return { onSubmit, loading };
}
