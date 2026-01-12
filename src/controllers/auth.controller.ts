import { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.js";
import authService from "../services/auth.service.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";

class AuthController {

    async login(req: Request, res: Response) {
        const dto: LoginDTO = {
            email: req.body.email,
            password: req.body.password,
        }

        const data = await authService.login(dto);    

        return ApiResponse.success(res, data, "Login realizado com sucesso", 200);
    }

    async register(req: Request, res: Response) {
        const dto: RegisterDTO = req.body;
        const user = authService.register(dto);

        return ApiResponse.success(res, user, "Sucesso ao registrar o usuário", 201);
    }

    async me(req: Request, res: Response) {
        const data = {
            user: res.locals.user,
        }

        return ApiResponse.success(res, data, "Acesso autorizado", 200);
    }
}

export default new AuthController();