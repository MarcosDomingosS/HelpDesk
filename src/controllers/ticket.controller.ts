import { Response, Request } from "express";
import ticketService from "../services/ticket.service.js";
import { CreateTicketDTO } from "../dtos/ticket/createTicket.dto.js";
import { TicketResponseDTO } from "../dtos/ticket/ticketResponse.dto.js";
import ApiResponse from "../utils/apiResponse.js";
import { AuthMiddlewareResponseDTO } from "../dtos/auth/authMiddlewareResponse.dto.js";
import { AssignTicketDTO } from "../dtos/ticket/assignTicket.dto.js";
import { UpdateTicketStatusDTO } from "../dtos/ticket/updateTicketStatus.dto.js";
import { BadRequestError } from "../errors/BadRequestError.js";

class TicketController{
    async store(req: Request, res: Response){
        const dto: CreateTicketDTO = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            departmentId: req.body.departmentId,
        }

        const user: AuthMiddlewareResponseDTO = res.locals.user;

        const data: TicketResponseDTO = await ticketService.create(dto, user);

        return ApiResponse.success(res, data, "Sucesso ao criar o ticket", 201);
    }

    async assign(req: Request, res: Response){
        const { ticketId } = req.params;

        if (!ticketId) {
            throw new BadRequestError("ID do ticket não informado");
        }

        const user: AuthMiddlewareResponseDTO = res.locals.user;
        
        const dto: AssignTicketDTO = {ticketId, user};
        
        const data = await ticketService.assign(dto);
        
        return ApiResponse.success(res, data, "Sucesso ao atribuir ticket ao agente", 200);
    }

    async updateStatus(req: Request, res: Response){
        const { ticketId } = req.params;
        const { status } = req.body;
        
        if(!status){
            throw new BadRequestError("Status não informado");
        }

        if(!ticketId){
            throw new BadRequestError("Ticket não informado");
        }

        const user: AuthMiddlewareResponseDTO = res.locals.user;

        const dto: UpdateTicketStatusDTO = {
            ticketId,
            status,
            user,
        }

        const ticket: TicketResponseDTO = await ticketService.updateStatus(dto);

        return ApiResponse.success(res, ticket, "Status alterado com sucesso", 200);
    }
}

export default new TicketController();