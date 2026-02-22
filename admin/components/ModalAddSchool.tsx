import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { type SubmitHandler, useForm } from "react-hook-form"
import { EMAILREGEX, PASSWORDREGEX } from "../../shared/regex";
import { MdOutlineMail, MdOutlineSchool } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { FormSchoolData } from "../../shared/interfaces/schools";

export const ModalAddSchool = () => {
  const {
    watch,
    handleSubmit,
    formState: {errors},
    register
  } = useForm<FormSchoolData>({
    mode: 'onChange'
  });
  
  const passwordValue = watch('password');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormSchoolData> = async(values) => {
    console.log(values)
  };

  return (
    <div className="absolute bg-dark-bg-secondary/80 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
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
    </div>
  )
}
