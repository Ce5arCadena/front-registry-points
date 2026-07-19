import type React from "react";
import { Navigate, useLocation } from "react-router";
import { ROLES, type RoleKey } from "../../shared/auth/roles";

const ProtectedRoute = ({ children} : {children: React.ReactNode}) => {
    const { pathname } = useLocation();

    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to='/auth/login' />;
    };

    if (!rol || !(rol in ROLES)) {
        return <Navigate to='/auth/login' />;
    };

    const currentRole = ROLES[rol as RoleKey];
    const canNavigate = currentRole.routes.some((route) => pathname.startsWith(route.url));
    if (!canNavigate) {
        return <Navigate to={currentRole.defaultRoute} />;
    };

    return children;
}

export default ProtectedRoute