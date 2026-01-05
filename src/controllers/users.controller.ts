import { Request, Response } from "express";
import User, { roles } from "../models/user.js";
import argon2 from "argon2";
import ApiResponse from "../utils/apiResponse.js";
import UserService from "../services/user.service.js";

class UsersController {
    async store(req: Request, res: Response){
        try{
            const dto = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                department_id: req.body.department_id,
            }
            
            const user = await UserService.create(dto);

            return ApiResponse.success(res, user, "Sucesso ao criar o usuário", 201);
        }catch(error){
            console.error(error);
            return ApiResponse.error;
        }
    }
}

export default UsersController;