import { CreateDepartmentDTO } from "../dtos/department/createDepartment.dto.js";
import departmentService from "../services/department.service.js";
import ApiResponse from "../utils/apiResponse.js";
import { Request, Response } from "express";

class DepartmentController{
    async index(req: Request, res: Response){
        try{
            const departments = await departmentService.index();

            return ApiResponse.success(res, departments, "Sucesso ao enviar os departamentos", 200);
        }catch(error){
            console.error(error);
            
            return ApiResponse.error;
        }
    }

    async store(req: Request, res: Response){
        try{
            const dto: CreateDepartmentDTO = {
                name: req.body.name,
                slaMinutes: req.body.slaMinutes
            }

            const department = await departmentService.create(dto);

            return ApiResponse.success(res, department, "Sucesso ao criar departamento", 201);
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

            departmentService.delete(id);

            return res.status(204).send();            
        }catch(error: any){
            if (error.message === "DEPARTMENT_NOT_FOUND") {
                return ApiResponse.error(res, "Usuário não encontrado", 404);
            }

            console.error(error);

            return ApiResponse.error;
        }
    }
}

export default new DepartmentController();