import { type IconType } from "react-icons";

export interface LoginData {
    email: string,
    password: string
}

export interface LoginResponse {
    message: string;
    ok: number;
    data: {
        token: string;
        rol: string;
    }
}

// Schools
export interface SchoolsInterface {
    message: string;
    status:  number;
    icon:    string;
    data:    DataSchool;
}

export interface DataSchool {
    schools: School[];
    total:   number;
}

export interface School {
    id:       number;
    isActive: string;
    created:  Date;
    updated:  Date;
    user:     User;
    name:     string;
}

export interface User {
    id:       number;
    email:    string;
    rol:      string;
    isActive: string;
    created:  Date;
    updated:  Date;
}

// Dashboard data
export interface DashboardDataInterface {
    message: string;
    data: DashboardData;
}

interface DashboardData {
    total_courses: number;
    total_students: number;
    total_teachers: number;
    total_subjects: number;
}

// Jwt
export interface JwtPayload {
    email:  string;
    name:   string;
    school: null;
    sub:    number;
    rol:    string;
    iat:    number;
    exp:    number;
}

// Routes

export interface RolesInterface {
    SCHOOL: SimpleRoute;
}

export interface SimpleRoute {
    defaultRoute: string;
    routes: NavItem[]
}

export interface NavItem {
    url: string,
    label: string,
    defaultUrl: boolean,
    IconType: IconType
}

// Paginación evento click
export interface PaginateClickEvent {
  index: number | null;
  selected: number;
  nextSelectedPage: number;
  event: MouseEvent;
  isPrevious: boolean;
  isNext: boolean;
  isBreak: boolean;
  isPage: boolean;
  isActive: boolean;
}