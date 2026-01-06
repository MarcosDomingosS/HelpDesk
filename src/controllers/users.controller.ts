import { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.js";
import UserService from "../services/user.service.js";
import { EditUserDTO } from "../dtos/user/editUser.dto.js";

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

    async index(req: Request, res: Response){
        try{
            const users = await UserService.index();

            return ApiResponse.success(res, users, "Sucesso ao enviar os usuários", 200);
        }catch(error){
            console.error(error);

            return ApiResponse.error;
        }
    }

    async edit(req: Request, res: Response){
        try{
            const { id } = req.params;
            const { name, email, role, department_id } = req.body;

            if (!id) {
                return ApiResponse.error(res, "ID do usuário não informado", 400);
            }

            const dto: EditUserDTO = {
                id: id,
                name: name,
                email: email,
                role: role,
                department_id: department_id,
            }

            const user = await UserService.update(dto);

            return ApiResponse.success(res, user, "Sucesso ao editar o usuário", 200);
        }catch(error){
            console.error(error);

            return ApiResponse.error;            
        }
    }

    async destroy(req: Request, res: Response){
        try{
            const { id } = req.params;

            if (!id) {
                return ApiResponse.error(res, "ID do usuário não informado", 400);
            }

            UserService.delete(id);

            return res.status(204).send();
        }catch(error: any){
            if (error.message === "USER_NOT_FOUND") {
                return ApiResponse.error(res, "Usuário não encontrado", 404);
            }

            console.error(error);

            return ApiResponse.error;
        }
    }
}

export default UsersController;