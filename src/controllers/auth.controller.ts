import { Request, Response } from "express";
import jwt, { type SignOptions } from 'jsonwebtoken';
import User, { roles } from "../models/user.js";
import argon2 from "argon2";
import { authConfig } from "../config/auth.js";
import ApiResponse from "../utils/apiResponse.js";

const options: SignOptions = {
  expiresIn: authConfig.expiresIn,
}

class AuthController {
    async login(req: Request, res: Response){
        try{
            const { email, password } = req.body;

            const user = await User.findOne({where: { email }});

            if(!user){
                return ApiResponse.error(res, "Usuário não encontrado", 404);
            }

            const validPass = await argon2.verify(user.password, password);

            if(!validPass){
                return res.status(401).json({
                    sucess: false,
                    message: "Senha incorreta",
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                authConfig.secret,
                options
            );

            const data = {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            };
            
            return ApiResponse.success(res, data, "Login realizado com sucesso", 200);
        }catch(error){
            console.error(error);
            return ApiResponse.error;
        }
    }

    async register(req: Request, res: Response){
        try{
            const { name, email, password } = req.body;
            const hash = await argon2.hash(password);
            const user = await User.create({
                name: name,
                email: email,
                password: hash,
                role: roles.CLIENT,
            });

            return ApiResponse.success(res, user, "Sucesso ao registrar o usuário", 201);
        }catch(error){
            console.error(error);
            return ApiResponse.error;
        }
    }

    async me(req: Request, res: Response){
        const data = {
            user: res.locals.user,
        }

        return ApiResponse.success(res, data, "Acesso autorizado", 200);
    }
}

export default AuthController;