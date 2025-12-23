import { Request, Response } from "express";
import jwt, { type SignOptions } from 'jsonwebtoken';
import User, { roles } from "../models/user.js";
import argon2 from "argon2";
import { authConfig } from "../config/auth.js";

const options: SignOptions = {
  expiresIn: authConfig.expiresIn,
}

class UsersController {
    async login(req: Request, res: Response){
        try{
            const { email, password } = req.body;

            const user = await User.findOne({where: { email }});

            if(!user){
                return res.status(404).json({
                    sucess: false,
                    message: "Usuário não encontrado"
                });
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

            return res.json({
                sucess: true,
                message: "Login realizado",
                data: {
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                }
            })
        }catch(error){
            console.error(error);
            return res.status(500).json({
                sucess: false,
                message: "Erro interno.",
            });
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

            return res.status(201).json({
                sucess: true,
                message: "Sucesso ao criar o usuário.",
                data: user,
            });
        }catch(error){
            console.error(error);
            return res.status(500).json({
                sucess: false,
                message: "Erro interno.",
            });
        }
    }
}

export default UsersController;