import argon2 from "argon2";
import { roles } from "../models/user.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";
import jwt, { type SignOptions } from 'jsonwebtoken';
import { authConfig } from "../config/auth.js";
import { LoginResponseDTO } from "../dtos/auth/loginResponse.dto.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";
import UserRepository from "../repositories/user.repo.js";

const options: SignOptions = {
    expiresIn: authConfig.expiresIn,
}

class AuthService{
    async login(dto: LoginDTO): Promise<LoginResponseDTO>{
        const { email, password } = dto;

        const user = await UserRepository.findByEmail(email);

        if(!user){
            throw new Error("USER_NOT_FOUND");
        }

        const validPass = await argon2.verify(user.password, password);

        if(!validPass){
            throw new Error("INVALID_PASSWORD")
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                ...(user.department_id && { departmentId: user.department_id }),
                createdAt: user.created_at,
                updatedAt: user.updated_at
            },
            authConfig.secret,
            options
        );

        const data: LoginResponseDTO = {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                ...(user.department_id && { departmentId: user.department_id }),
            }
        };

        return data;
    }

    async register(dto: RegisterDTO){
        const { name, email, password } = dto;
        const hash = await argon2.hash(password);
        const user = await UserRepository.create({
            name: name,
            email: email,
            password: hash,
            role: roles.CLIENT,
        });

        return user;
    }
}

export default new AuthService();