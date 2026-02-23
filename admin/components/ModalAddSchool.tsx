import toast from "react-hot-toast";
import React, { useState } from "react";
import { useApi } from "../../utils/useApi";
import { RiLockPasswordLine } from "react-icons/ri";
import Loading from "../../shared/components/Loading";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SubmitHandler, useForm } from "react-hook-form"
import { EMAILREGEX, PASSWORDREGEX } from "../../shared/regex";
import { MdOutlineMail, MdOutlineSchool } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { CreateSchool, FormSchoolData, School } from "../../shared/interfaces/schools";

export const ModalAddSchool = (
  { 
    setSchools,
    setShowModalAddSchool 
  } : 
  { 
    setSchools: React.Dispatch<React.SetStateAction<School[]>>,
    setShowModalAddSchool: (value: boolean) => void 
  }
) => {
  const {
    watch,
    handleSubmit,
    formState: {errors},
    reset,
    register
  } = useForm<FormSchoolData>({
    mode: 'onChange'
  });
  
  const [loading, setLoading] = useState(false);
  
  const passwordValue = watch('password');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormSchoolData> = async(values) => {
    setLoading(true);
    try {
      console.log(values)
      const responseSchool = await useApi<CreateSchool>('/schools/', 'POST', values);
      toast(responseSchool.message, {
        icon: responseSchool.ok ? "✅" : "❌"
      });
      if (!responseSchool.ok) return;

      setSchools((prevSchools) => {
        return [
          ...prevSchools,
          responseSchool.data as School
        ];
      });
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Ocurrió un error al realizar la petición', {
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline 
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={
          () => {
            reset();
            setShowModalAddSchool(false)
          }
        }
      /> 
      <h2 className='text-2xl'>Agregar Colegio</h2>
      <form className='w-[30%] flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-dark-text">
            Nombre del colegio
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineSchool className="w-4 h-4 text-dark-text-secondary"/>
            </div>
            <input 
              id="name"
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: 'El nombre es requerido.'
                }
              })} 
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all" 
              placeholder="Instritución El Libertador"
            />
          </div>
          {
            errors.name && (
              <span className="text-xs text-secondary">{errors.name.message}</span>
            )
          }
        </div>

        {/* Correo */}
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
              autoComplete="off"
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
              placeholder="institucion@ejemplo.com"
            />
          </div>
          {
            errors.email && (
              <span className="text-xs text-secondary">{errors.email.message}</span>
            )
          }
        </div>

        {/* Contraseña */}
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
              autoComplete="off"
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
            Agregar
          </button>
        </div>
      </form>

      {
        loading && (
          <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
            <Loading/>
            <span>Por favor, espera.</span>
          </div>
        )
      }
    </div>
  )
}
