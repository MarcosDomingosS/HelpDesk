import departmentRepo from "../repositories/department.repo.js";
import { DepartmentResponseDTO } from "../dtos/department/departmentResponse.dto.js";
import { CreateDepartmentDTO } from "../dtos/department/createDepartment.dto.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class DepartmentService{
    async index(): Promise<DepartmentResponseDTO[]>{
        const departments = await departmentRepo.findAll();

        const response: DepartmentResponseDTO[] = departments.map(department => ({
            id: department.id,
            name: department.name,
            slaMinutes: department.sla_minutes,
            createdAt: department.created_at,
        }));

        return response;
    }

    async create(dto: CreateDepartmentDTO): Promise<DepartmentResponseDTO>{
        const { name, slaMinutes } = dto;

        const department = await departmentRepo.create({
            name: name,
            sla_minutes: slaMinutes,
        });

        const response: DepartmentResponseDTO = {
            id: department.id,
            name: department.name,
            slaMinutes: department.sla_minutes,
            createdAt: department.created_at,
        }

        return response;
    }

    async delete(id: string): Promise<void>{
        const department = await departmentRepo.findById(id);

        if(!department){
            throw new NotFoundError("Departamento não encontrado");
        }

        await departmentRepo.destroy(department);

        return;
    }
}

export default new DepartmentService();