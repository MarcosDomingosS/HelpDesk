import { AuthMiddlewareResponseDTO } from "../dtos/auth/authMiddlewareResponse.dto.js";
import { AssignTicketDTO } from "../dtos/ticket/assignTicket.dto.js";
import { CreateTicketDTO } from "../dtos/ticket/createTicket.dto.js";
import { TicketResponseDTO } from "../dtos/ticket/ticketResponse.dto.js";
import { UpdateTicketStatusDTO } from "../dtos/ticket/updateTicketStatus.dto.js";
import { ApiError } from "../errors/ApiError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { status } from "../models/ticket.js";
import User from "../models/user.js";
import { TicketPolicy } from "../policies/ticket.policy.js";
import ticketRepo from "../repositories/ticket.repo.js";

class TicketService{
    async create(dto: CreateTicketDTO, user: AuthMiddlewareResponseDTO): Promise<TicketResponseDTO>{
        if(!TicketPolicy.canCreate(user)){
            throw new ApiError("Só clientes podem criar tickets", 403);
        }

        const { title,  description, priority, departmentId } = dto;

        const ticket = await ticketRepo.create({
            title: title,
            ...(description && { description }),
            status: status.OPEN,
            priority: priority,
            user_id: user.id,
            department_id: departmentId,
        });

        const response: TicketResponseDTO = {
            id: ticket.id,
            title: ticket.title,
            ...(ticket.description && { description: ticket.description }),
            status: ticket.status,
            priority: ticket.priority,
            userId: ticket.user_id,
            departmentId: ticket.department_id,
            createdAt: ticket.created_at,
            updatedAt: ticket.updated_at,
        };

        return response;
    }

    async assign(dto: AssignTicketDTO): Promise<TicketResponseDTO>{
        const { ticketId, user } = dto;

        if(!TicketPolicy.canAssign(user)){
            throw new ApiError("Só agentes podem assumir tickets", 403);
        }

        const ticket = await ticketRepo.findById(ticketId);

        if(!ticket){
            throw new NotFoundError("Ticket não encontrado");
        }

        if(TicketPolicy.isAssigned(ticket)){
            throw new ApiError("Ticket já assumido por um agente", 403);
        }

        const data = await ticketRepo.update(ticket, {
            assigned_agent_id: user.id,
            status: status.IN_PROGRESS,
        });

        const response: TicketResponseDTO = {
            id: data.id,
            title: data.title,
            ...(data.description && { description: data.description }),
            status: data.status,
            priority: data.priority,
            userId: data.user_id,
            departmentId: data.department_id,
            ...(data.assigned_agent_id && { assignedAgentId: data.assigned_agent_id }),
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        return response;
    }

    async updateStatus(dto: UpdateTicketStatusDTO): Promise<TicketResponseDTO>{
        const { ticketId, status, user } = dto;

        const ticket = await ticketRepo.findById(ticketId);

        if(!ticket){
            throw new NotFoundError("Ticket não encontrado");
        }

        if(!TicketPolicy.canUpdateStatus(user, ticket)){
            throw new ApiError("Só agentes que assumiram o ticket podem editar o status", 403);
        }

        const data = await ticketRepo.update(ticket, {
            status: status,
        });

        const response: TicketResponseDTO = {
            id: data.id,
            title: data.title,
            ...(data.description && { description: data.description }),
            status: data.status,
            priority: data.priority,
            userId: data.user_id,
            departmentId: data.department_id,
            ...(data.assigned_agent_id && { assignedAgentId: data.assigned_agent_id }),
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        return response;
    }
}

export default new TicketService();