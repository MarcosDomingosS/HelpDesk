import { CreateUserDTO } from "../dtos/user/createUser.dto.js";
import argon2 from "argon2";
import { roles } from "../models/user.js";
import { UserResponseDTO } from "../dtos/user/userResponse.dto.js";
import { EditUserDTO } from "../dtos/user/editUser.dto.js";
import UserRepository from "../repositories/user.repo.js";
import { NotFoundError } from "../errors/NotFoundError.js";


class UserService{
    async create(dto: CreateUserDTO): Promise<UserResponseDTO> {
        const { name, password, email, role, department_id } = dto;
        const hash = await argon2.hash(password);

        const user = await UserRepository.create({
            name: name,
            email: email,
            password: hash,
            role: role ?? roles.CLIENT,
            ...(department_id && { department_id })
        });
        const response: UserResponseDTO = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            ...(user.department_id && { department_id: user.department_id })
        } 
        return response;
    }

    async index(): Promise<UserResponseDTO[]>{
        const users = await UserRepository.findAll();

        const response: UserResponseDTO[] = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            ...(user.department_id && { department_id: user.department_id })
        }));

        return response;
    }

    async update(dto: EditUserDTO): Promise<UserResponseDTO>{
        const user = await UserRepository.findById(dto.id);

        if(!user){
            throw new NotFoundError("Usuário não encontrado");
        }

        const data = await UserRepository.update(user, {
            ...(dto.name && { name: dto.name }),
            ...(dto.email && { email: dto.email }),
            ...(dto.role && { role: dto.role }),
            ...(dto.department_id && { department_id: dto.department_id }),
        });

        const response: UserResponseDTO = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            ...(data.department_id && { department_id: data.department_id })
        };

        return response;
    }

    async delete(id: string): Promise<void>{
        const user = await UserRepository.findById(id);

        if(!user){
            throw new Error("USER_NOT_FOUND");
        }

        await UserRepository.destroy(user);

        return;
    }
}

export default new UserService();