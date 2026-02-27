export const ROLES = {
    SUPERADMIN: {
        defaultRoute: '/admin/home',
        routes: [
            '/admin/home',
            '/admin/schools',
            '/admin/grades',
        ]
    },
    SCHOOL: {
        defaultRoute: '/school/home',
        routes: [
            '/school/home',
            '/school/grades',
            '/school/teachers'
        ]
    },
    TEACHER: {
        defaultRoute: '/admin/home',
        routes: [
            
        ]
    } 
};

export type RoleKey = keyof typeof ROLES;


// SCHOOL = 'SCHOOL',
//     STUDENT = 'STUDENT',
//     TEACHER = 'TEACHER',
//     SUPERADMIN = 'SUPERADMIN',