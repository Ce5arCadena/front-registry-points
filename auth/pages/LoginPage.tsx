import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import SvgLogin from '../../shared/imgs/svg-login.svg';
import WaveLogin from '../../shared/imgs/wave-login.svg';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/useApi";
import toast, { Toaster } from "react-hot-toast";
import { ROLES, type RoleKey } from "../../shared/auth/roles";
import { useForm, type SubmitHandler } from "react-hook-form";
import { EMAILREGEX, PASSWORDREGEX } from "../../shared/regex";
import type { LoginData, LoginResponse } from "../../shared/interfaces";

export const LoginPage = () => {
  const {
    watch, 
    register, 
    handleSubmit, 
    formState: {errors}, 
  } = useForm<LoginData>({
    mode: 'onChange'
  });
  const passwordValue = watch('password');
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginData> = async (values) => {
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
      console.log(error)
      toast.error('Ocurrió un error al realizar la petición', {
        duration: 4000,
        position: 'top-right'
      });
    };
  };

  return (
    <div className="bg-linear-to-b from-dark-bg to-dark-bg-elevated flex flex-col justify-between items-center rounded-2xl w-[25vw]">
      <Toaster/>
      {/* Imagen */}
      <div className='h-20 w-20 rounded-full relative -top-5 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2'>
        <img src={SvgLogin} alt="Svg Login" className='h-full w-full' />
      </div>

      {/* formulario */}
      <div className="h-full w-full flex flex-col items-center gap-2">
        <h2 className='text-2xl'>¡Bienvenido!</h2>
        <form className='w-[80%] flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-dark-text">
              Correo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdOutlineMail className="w-4 h-4 text-dark-text-secondary"/>
              </div>
              <input 
                id="email"
                type="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'El correo es requerido.'
                  },
                  pattern: {
                    value: EMAILREGEX,
                    message: 'El correo no cumple el formato'
                  }
                })} 
                className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all" 
                placeholder="cesar@cesar.com"
              />
            </div>
            {
              errors.email && (
                <span className="text-xs text-secondary">{errors.email.message}</span>
              )
            }
          </div>

          <div>
            <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-dark-text">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiLockPasswordLine className="w-4 h-4 text-dark-text-secondary"/>
              </div>
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                {...register('password', {
                  required: {
                    value: true,
                    message: 'La contraseña es requerida.'
                  },
                  pattern: {
                    value: PASSWORDREGEX,
                    message: 'Tu contraseña debe incluir: mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos (@$!%*?&).'
                  }
                })} 
                className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all" 
                placeholder="********"
              />
              {
                passwordValue !== '' && (
                  <div className="absolute inset-y-0 right-3 flex items-center pl-3">
                    {showPassword && (
                      <AiOutlineEyeInvisible className="w-4 h-4 text-dark-text-secondary hover:cursor-pointer" onClick={() => setShowPassword(false)}/>
                    )}
                    {!showPassword && (
                      <AiOutlineEye className="w-4 h-4 text-dark-text-secondary hover:cursor-pointer" onClick={() => setShowPassword(true)}/>
                    )}
                  </div>
                )
              }
            </div>
            {
              errors.password && (
                <span className="text-xs text-secondary">{errors.password.message}</span>
              )
            }
          </div>

          <div className="mt-2">
            <button className="
              text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary
            ">
              Ingresar
            </button>
          </div>
        </form>
      </div>

      {/* imagen wave */}
      <img src={WaveLogin} alt="Wave" className='w-full rounded-b-2xl'/>
    </div>
  )
}
