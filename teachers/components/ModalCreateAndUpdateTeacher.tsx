import { useEffect, useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { IoCloseCircleOutline } from "react-icons/io5";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaChalkboardTeacher, FaRegIdCard } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { type FormCourseData, type Teacher } from "../../shared/interfaces/teachers";

export const ModalCreateAndUpdateTeacher = ({
  teacher,
  createTeacher,
  setActionModal
}: {
  teacher: Teacher | null | undefined,
  createTeacher: (values: FormCourseData, method: string, url: string) => Promise<boolean>,
  setActionModal: (value: string) => void,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCourseData>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<FormCourseData> = async (values) => {
    const method = teacher ? 'PUT' : 'POST';
    const url = teacher ? `/teachers/${teacher.id}` : '/teachers';
    const success = await createTeacher(values, method, url);

    if (success) {
      reset();
      setActionModal("");
    };
  };

  useEffect(() => {
    if (teacher) {
      reset({
        phone: Number(teacher.phone),
        document: Number(teacher.document),
        full_name: teacher.full_name,
        email: teacher.user.email,
        password: ""
      });
    };
  }, [teacher]);

  return (
    <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
      <IoCloseCircleOutline
        className="text-2xl absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          reset();
          setActionModal("");
        }}
      />

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className='w-[30%] flex flex-col gap-2'
      >
        <div>
          <label htmlFor="full_name" className="block mb-2.5 text-sm font-medium text-dark-text">
            Nombre del maestro
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaChalkboardTeacher className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="full_name"
              type="text"
              {...register('full_name', {
                required: {
                  value: true,
                  message: 'El nombre es requerido.'
                },
                minLength: {
                  value: 3,
                  message: "Mínimo 3 carácteres"
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="Juan Alberto Trujillo Almario"
            />
          </div>
          {
            errors.full_name && (
              <span className="text-xs text-secondary">{errors.full_name.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="document" className="block mb-2.5 text-sm font-medium text-dark-text">
            N° Documento
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaRegIdCard className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="document"
              type="number"
              {...register('document', {
                required: {
                  value: true,
                  message: 'El documento es requerido.'
                },
                minLength: {
                  value: 5,
                  message: "Mínimo 5 carácteres"
                },
                maxLength: {
                  value: 12,
                  message: "Máximo 12 carácteres"
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="1234567890"
            />
          </div>
          {
            errors.document && (
              <span className="text-xs text-secondary">{errors.document.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-dark-text">
            N° Celular
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineLocalPhone className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="phone"
              type="number"
              {...register('phone', {
                required: {
                  value: true,
                  message: 'El número de celular es requerido.'
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "10 dígitos para el número de celular"
                },
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="322 000 1591"
            />
          </div>
          {
            errors.phone && (
              <span className="text-xs text-secondary">{errors.phone.message}</span>
            )
          }
        </div>

        <div>
          <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-dark-text">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineEmail className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="email"
              autoComplete="new-password"
              type="email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'El email es requerido.'
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingresa un correo válido"
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="ejemplo@ejemplo.com"
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
              <TbLockPassword className="w-4 h-4 text-dark-text-secondary" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register('password', {
                required: {
                  value: !teacher ? true : false,
                  message: 'El password es requerido.'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message: "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo"
                }
              })}
              className="block w-full pl-9 pr-3 py-2.5 bg-dark-bg-secondary border text-dark-text text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secring-secondary outline-none placeholder:text-dark-text-secondary transition-all"
              placeholder="ejemplo@ejemplo.com"
            />
            {
              <div className="absolute inset-y-0 right-3 flex items-center pl-3">
                {showPassword && (
                  <AiOutlineEyeInvisible className="w-4 h-4 text-dark-text-secondary hover:cursor-pointer" onClick={() => setShowPassword(false)} />
                )}
                {!showPassword && (
                  <AiOutlineEye className="w-4 h-4 text-dark-text-secondary hover:cursor-pointer" onClick={() => setShowPassword(true)} />
                )}
              </div>
            }
          </div>
          {
            errors.password && (
              <span className="text-xs text-secondary">{errors.password.message}</span>
            )
          }
        </div>

        <div className="mt-2 flex gap-2 justify-center">
          <button className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-secondary hover:text-secondary
          ">
            {
              teacher ? "Editar" : "Agregar"
            }
          </button>

          <button
            type="button"
            onClick={() => setActionModal("")}
            className="
            text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer border hover:border-warning hover:text-warning
          ">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

