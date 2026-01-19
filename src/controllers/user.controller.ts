import { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.js";
import { EditUserDTO } from "../dtos/user/editUser.dto.js";
import { CreateUserDTO } from "../dtos/user/createUser.dto.js";
import userService from "../services/user.service.js";
import { BadRequestError } from "../errors/BadRequestError.js";

class UserController {

    async store(req: Request, res: Response){
        const dto: CreateUserDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            department_id: req.body.department_id,
        }
        
        const user = await userService.create(dto);

        return ApiResponse.success(res, user, "Sucesso ao criar o usuário", 201);
    }

    async index(req: Request, res: Response){
        const users = await userService.index();

        return ApiResponse.success(res, users, "Sucesso ao enviar os usuários", 200);
    }

    async edit(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, role, department_id } = req.body;

        if (!id) {
            throw new BadRequestError("ID do usuário não informado");
        }

        const dto: EditUserDTO = {
            id: id,
            name: name,
            email: email,
            role: role,
            department_id: department_id,
        }

        const user = await userService.update(dto);

        return ApiResponse.success(res, user, "Sucesso ao editar o usuário", 200);
    }

    async destroy(req: Request, res: Response){
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError("ID do usuário não informado");
        }

        userService.delete(id);

        return res.status(204).send();
    }
    
}

export default new UserController();