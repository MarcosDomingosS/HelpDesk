import { status } from "../../models/ticket.js";
import { AuthMiddlewareResponseDTO } from "../auth/authMiddlewareResponse.dto.js";

export interface UpdateTicketStatusDTO{
    status: status,
    ticketId: string,
    user: AuthMiddlewareResponseDTO,
}