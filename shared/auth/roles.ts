import { BsPeople } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { LiaHandPointerSolid } from "react-icons/lia";
import { PiBooksLight, PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn, MdSubject } from "react-icons/md";

export const ROLES = {
    SUPERADMIN: {
        defaultRoute: '/admin/home',
        routes: [
            {
                defaultUrl: true,
                label: "Home",
                url: '/admin/home',
                IconType: FaHome
            },
        ]
    },
    SCHOOL: {
        defaultRoute: '/school/home',
        routes: [
            {
                defaultUrl: true,
                label: "Home",
                url: '/school/home',
                IconType: FaHome
            },
            {
                defaultUrl: false,
                label: "Cursos",
                url: '/school/courses',
                IconType: BsPeople
            },
            {
                defaultUrl: false,
                label: "Asignaturas",
                url: '/school/subjects',
                IconType: MdSubject 
            },
            {
                defaultUrl: false,
                label: "Maestros",
                url: '/school/teachers',
                IconType: FaChalkboardTeacher 
            },
            {
                defaultUrl: false,
                label: "Estudiantes",
                url: '/school/students',
                IconType: PiStudentBold 
            },
            {
                defaultUrl: false,
                label: "Asignaciones",
                url: '/school/assignments',
                IconType: PiBooksLight 
            },
        ]
    },
    TEACHER: {
        defaultRoute: '/teacher/home',
        routes: [
            {
                defaultUrl: true,
                label: "Home",
                url: '/teacher/home',
                IconType: FaChalkboardTeacher  
            },
            {
                defaultUrl: false,
                label: "Categoria de Puntos",
                url: '/teacher/point-categories',
                IconType: TbCategory 
            },
            {
                defaultUrl: false,
                label: "Registro de Puntos",
                url: '/teacher/registry-points',
                IconType: LiaHandPointerSolid 
            },
            {
                defaultUrl: false,
                label: "Asignar Categorías",
                url: '/teacher/point-categories-assignments',
                IconType: MdOutlineAssignmentTurnedIn 
            },
        ]
    } 
};

export type RoleKey = keyof typeof ROLES;


// SCHOOL = 'SCHOOL',
//     STUDENT = 'STUDENT',
//     TEACHER = 'TEACHER',
//     SUPERADMIN = 'SUPERADMIN',