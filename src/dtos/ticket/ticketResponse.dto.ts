import { priority, status } from "../../models/ticket.js";

export interface TicketResponseDTO{
    id: string,
    title: string,
    description?: string,
    status: status,
    priority: priority,
    userId: string,
    departmentId: string,
    assignedAgentId?: string,
    createdAt: Date,
    updatedAt: Date,
}