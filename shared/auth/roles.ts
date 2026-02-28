export const ROLES = {
    SUPERADMIN: {
        defaultRoute: '/admin/home',
        routes: [
            {
                default: true,
                label: "Home",
                url: '/admin/home',
            },
        ]
    },
    SCHOOL: {
        defaultRoute: '/school/home',
        routes: [
            {
                default: true,
                label: "Home",
                url: '/school/home',
            },
            {
                default: false,
                label: "Cursos",
                url: '/school/courses',
            },
        ]
    },
    TEACHER: {
        defaultRoute: '/teacher/home',
        routes: [
            {
                default: true,
                label: "Home",
                url: '/teacher/home',
            },
        ]
    } 
};

export type RoleKey = keyof typeof ROLES;


// SCHOOL = 'SCHOOL',
//     STUDENT = 'STUDENT',
//     TEACHER = 'TEACHER',
//     SUPERADMIN = 'SUPERADMIN',