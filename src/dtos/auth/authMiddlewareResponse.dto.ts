import { roles } from "../../models/user.js";

export interface AuthMiddlewareResponseDTO{
    id: string;
    name: string;
    email: string;
    role: roles;
    departmentId?: string;
}