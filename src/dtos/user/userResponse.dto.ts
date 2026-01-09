import { roles } from "../../models/user.js";

export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: roles;
    department_id?: string;
}