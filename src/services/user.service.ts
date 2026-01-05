import { CreateUserDTO } from "../dtos/user/createUser.dto.js";
import argon2 from "argon2";
import User, { roles } from "../models/user.js";
import { UserResponseDTO } from "../dtos/user/userResponse.dto.js";


export default class UserService{
    static async create(dto: CreateUserDTO): Promise<UserResponseDTO> {
        const { name, password, email, role, department_id } = dto;
        const hash = await argon2.hash(password);

        const user = await User.create({
            name: name,
            email: email,
            password: hash,
            role: role ?? roles.CLIENT,
            ...(department_id && { department_id })
        });
        const responseDTO: UserResponseDTO = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            ...(user.department_id && { department_id: user.department_id })
        } 
        return responseDTO;
    }

    static async index(){

    }

    static async update(){

    }

    static async delete(){

    }
}