import { AuthMiddlewareResponseDTO } from "../dtos/auth/authMiddlewareResponse.dto.js";
import { AssignTicketDTO } from "../dtos/ticket/assignTicket.dto.js";
import { CreateTicketDTO } from "../dtos/ticket/createTicket.dto.js";
import { TicketResponseDTO } from "../dtos/ticket/ticketResponse.dto.js";
import { UpdateTicketStatusDTO } from "../dtos/ticket/updateTicketStatus.dto.js";
import { status } from "../models/ticket.js";
import User from "../models/user.js";
import { TicketPolicy } from "../policies/ticket.policy.js";
import ticketRepo from "../repositories/ticket.repo.js";

class TicketService{
    async create(dto: CreateTicketDTO, user: AuthMiddlewareResponseDTO): Promise<TicketResponseDTO>{
        if(!TicketPolicy.canCreate(user)){
            throw new Error("ONLY_CLIENT_CAN_CREATE_TICKET");
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
            throw new Error("ONLY_AGENT_CAN_CREATE_TICKET");
        }

        const ticket = await ticketRepo.findById(ticketId);

        if(!ticket){
            throw new Error("TICKET_NOT_FOUND");
        }

        if(TicketPolicy.isAssigned(ticket)){
            throw new Error("TICKET_HAS_ALREADY_BEEN_ASSIGNED");
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
            throw new Error("TICKET_NOT_FOUND");
        }

        if(!TicketPolicy.canUpdateStatus(user, ticket)){
            throw new Error("ONLY_ASSIGNED_AGENT_CAN_UPDATE_TICKET_STATUS");
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