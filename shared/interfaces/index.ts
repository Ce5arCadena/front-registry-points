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