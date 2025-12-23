import { Request, Response } from "express";
import User, { roles } from "../models/user.js";
import argon2 from "argon2";


class UsersController {
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