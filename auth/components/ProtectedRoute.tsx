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

    if (!rol) {
        return <Navigate to='/auth/login' />;
    };
    
    const canNavigate = ROLES[rol as RoleKey].routes.some(route => pathname.startsWith(route));
    if (!canNavigate) {
        return <Navigate to={ROLES[rol as RoleKey].defaultRoute} />;
    };

    return children;
}

export default ProtectedRoute