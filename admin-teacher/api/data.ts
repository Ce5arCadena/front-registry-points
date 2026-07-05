import { HiOutlineTag } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export const cards = [
  {
    to: "/teacher/point-categories",
    icon: HiOutlineTag,
    title: "Categoría de Puntos",
    description: "Crea y administra las categorías",
  },
  {
    to: "/teacher/point-categories-assignments",
    icon: HiOutlinePencilSquare,
    title: "Asignar Categorías",
    description: "Asigna categorías a las asignaturas",
  },
  {
    to: "/teacher/registry-points",
    icon: HiOutlineClipboardDocumentList,
    title: "Registro de Puntos",
    description: "Registra puntos por estudiante",
  },
];