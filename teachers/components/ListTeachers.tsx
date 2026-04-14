import React, { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { type Teacher } from "../../shared/interfaces/teachers";

export const ListTeachers = (
  {
    teachers,
    toggleOne,
    setTeacher,
    selectedIds, 
    getIdsTeachers,
    setActionModal,
  }: {
    teachers: Teacher[],
    selectedIds: number[],
    toggleOne: (id: number) => void,
    setTeacher: (subject: Teacher) => void,
    setActionModal: (value: string) => void
    getIdsTeachers: (e: React.ChangeEvent<HTMLInputElement>) => void,
  }
) => {
  return (
    <div className="h-full">
      <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead className="bg-gray-800 rounded-md text-light-bg">
          <tr className="">
            <th className="p-3 text-center">
              <label className="relative flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIds.length === teachers.length}
                  onChange={getIdsTeachers}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border border-gray-500 bg-transparent
                    peer-checked:bg-primary peer-checked:border-primary
                    flex items-center justify-center transition-all duration-150">
                  <svg
                    className="hidden peer-checked:block w-3 h-3 text-white"
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </label>
            </th>
            <th className="p-3 text-center">Nombres</th>
            <th className="p-3 text-center">Documento</th>
            <th className="p-3 text-center">Celular</th>
            <th className="p-3 text-center">Correo</th>
            <th className="p-3 text-center">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers.length > 0 && teachers.map((teacher) => (
              <tr className="bg-gray-800 text-center text-light-bg" key={teacher.id}>
                <td>
                  <label className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={teacher.id}
                      checked={selectedIds.includes(teacher.id)}
                      onChange={() => toggleOne(teacher.id)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded border border-gray-500 bg-transparent
                    peer-checked:bg-primary peer-checked:border-primary
                    flex items-center justify-center transition-all duration-150">
                      <svg
                        className="hidden peer-checked:block w-3 h-3 text-white"
                        viewBox="0 0 12 12" fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                </td>
                <td className="p-2 font-bold">
                  {teacher.full_name}
                </td>
                <td className="p-2 font-bold">
                  {teacher.document}
                </td>
                <td className="p-2 font-bold">
                  {teacher.phone}
                </td>
                <td className="p-2 font-bold">
                  {teacher.user.email}
                </td>
                <td className="p-2 font-medium">
                  <span className={`${teacher.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"} px-1.5 py-1 rounded-full text-xs`}>
                    {teacher.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="flex gap-1 justify-center p-2">
                  <IoEyeOutline
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setTeacher(teacher);
                      setActionModal("view");
                    }}
                  />
                  <RiEdit2Line
                    className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setTeacher(teacher);
                      setActionModal("edit");
                    }}
                  />
                  <MdDeleteOutline className="text-lg cursor-pointer hover:text-primary-hover transition-all ease-in-out duration-300"
                    onClick={() => {
                      setTeacher(teacher);
                      setActionModal("delete");
                    }}
                  />
                </td>
              </tr>
            ))
          }

          {
            teachers && teachers.length <= 0 && (
              <tr className="text-center">
                <td colSpan={6} className="p-2">
                  No hay maestros para mostrar.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
