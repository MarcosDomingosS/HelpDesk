import { priority } from "../../models/ticket.js";

export interface CreateTicketDTO{
    title: string;
    description: string;
    priority: priority;
    departmentId: string;
}