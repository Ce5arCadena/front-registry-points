import { BsPeople } from "react-icons/bs";
import { MdSubject } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher, FaHome } from "react-icons/fa";

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
        ]
    },
    TEACHER: {
        defaultRoute: '/teacher/home',
        routes: [
            {
                defaultUrl: true,
                label: "Home",
                url: '/teacher/home',
                IconType: MdSubject 
            },
        ]
    } 
};

export type RoleKey = keyof typeof ROLES;


// SCHOOL = 'SCHOOL',
//     STUDENT = 'STUDENT',
//     TEACHER = 'TEACHER',
//     SUPERADMIN = 'SUPERADMIN',