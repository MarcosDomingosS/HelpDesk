import { AuthMiddlewareResponseDTO } from "../auth/authMiddlewareResponse.dto.js";

export interface AssignTicketDTO{
    ticketId: string,
    user: AuthMiddlewareResponseDTO,
}