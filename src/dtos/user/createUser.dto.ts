import { roles } from "../../models/user.js";

export interface CreateUserDTO{
    name: string;
    email: string;
    password: string;
    role: roles;
    department_id?: string;
}