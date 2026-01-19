import { CreateDepartmentDTO } from "../dtos/department/createDepartment.dto.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import departmentService from "../services/department.service.js";
import ApiResponse from "../utils/apiResponse.js";
import { Request, Response } from "express";

class DepartmentController{

    async index(req: Request, res: Response){
        const departments = await departmentService.index();

        return ApiResponse.success(res, departments, "Sucesso ao enviar os departamentos", 200);
    }

    async store(req: Request, res: Response){
        const dto: CreateDepartmentDTO = {
            name: req.body.name,
            slaMinutes: req.body.slaMinutes
        }

        const department = await departmentService.create(dto);

        return ApiResponse.success(res, department, "Sucesso ao criar departamento", 201);
    }

    async destroy(req: Request, res: Response){
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError("ID do usuário não informado");
        }

        departmentService.delete(id);

        return res.status(204).send();
    }
}

export default new DepartmentController();