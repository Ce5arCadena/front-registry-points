export const ROLES = {
    SUPERADMIN: {
        defaultRoute: '/admin/home',
        routes: [
            '/admin/home',
            '/admin/create/school',
            '/admin/edit/school'
        ]
    },
    TEACHER: {
        defaultRoute: '/admin/home'
    } 
};

export type RoleKey = keyof typeof ROLES;


// SCHOOL = 'SCHOOL',
//     STUDENT = 'STUDENT',
//     TEACHER = 'TEACHER',
//     SUPERADMIN = 'SUPERADMIN',