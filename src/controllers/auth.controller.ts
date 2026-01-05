import { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.js";
import AuthService from "../services/auth.service.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";

class AuthController {

    async login(req: Request, res: Response) {
        try {
            const dto: LoginDTO = {
                email: req.body.email,
                password: req.body.password,
            }

            const data = await AuthService.login(dto);    

            return ApiResponse.success(res, data, "Login realizado com sucesso", 200);
        } catch (error: any) {
            if(error.message === "USER_NOT_FOUND"){
                return ApiResponse.error(res, "Usuário não encontrado", 404)
            }

            if(error.message === "INVALID_PASSWORD"){
                return ApiResponse.error(res, "Senha incorreta", 401)
            }


            console.error(error);
            return ApiResponse.error;
        }
    }

    async register(req: Request, res: Response) {
        try {
            const dto: RegisterDTO = req.body;
            const user = AuthService.register(dto);

            return ApiResponse.success(res, user, "Sucesso ao registrar o usuário", 201);
        } catch (error) {
            console.error(error);
            return ApiResponse.error;
        }
    }

    async me(req: Request, res: Response) {
        const data = {
            user: res.locals.user,
        }

        return ApiResponse.success(res, data, "Acesso autorizado", 200);
    }
}

export default AuthController;