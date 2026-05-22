export interface SchoolUserForm {
    name?: string;
    email?: string;
    password?: string;
}

export interface ProfileInterface {
    message: string;
    data:    SchoolUser;
}

export interface SchoolUser {
    id:         number;
    name:       string;
    status:     string;
    user:       User;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id:         number;
    email:      string;
    role:       string;
    status:     string;
    created_at: Date;
    updated_at: Date;
}