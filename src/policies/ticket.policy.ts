import { AuthMiddlewareResponseDTO } from "../dtos/auth/authMiddlewareResponse.dto.js";
import Ticket from "../models/ticket.js";
import User, { roles } from "../models/user.js";

export class TicketPolicy{
    static canCreate(user: AuthMiddlewareResponseDTO){
        return (user.role === roles.CLIENT || user.role === roles.ADMIN);
    }

    static canAssign(user: AuthMiddlewareResponseDTO){
        return ((user.role === roles.AGENT || user.role === roles.ADMIN));
    }

    static canUpdateStatus(user: AuthMiddlewareResponseDTO, ticket: Ticket){
        return ((user.role === roles.AGENT || user.role === roles.ADMIN) && ticket.assigned_agent_id === user.id);
    }

    static isAssigned(ticket: Ticket){
        return ticket.assigned_agent_id !== null;
    }
}
