import { Response, Request } from "express";
import ticketService from "../services/ticket.service.js";
import { CreateTicketDTO } from "../dtos/ticket/createTicket.dto.js";
import { TicketResponseDTO } from "../dtos/ticket/ticketResponse.dto.js";
import ApiResponse from "../utils/apiResponse.js";
import { AuthMiddlewareResponseDTO } from "../dtos/auth/authMiddlewareResponse.dto.js";
import { AssignTicketDTO } from "../dtos/ticket/assignTicket.dto.js";
import { UpdateTicketStatusDTO } from "../dtos/ticket/updateTicketStatus.dto.js";

class TicketController{
    async store(req: Request, res: Response){
        try{
            const dto: CreateTicketDTO = {
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority,
                departmentId: req.body.departmentId,
            }

            const user: AuthMiddlewareResponseDTO = res.locals.user;

            const data: TicketResponseDTO = await ticketService.create(dto, user);

            return ApiResponse.success(res, data, "Sucesso ao criar o ticket", 201);
        }catch(error: any){
            if (error.message === "ONLY_CLIENT_CAN_CREATE_TICKET") {
                return ApiResponse.error(res, "Apenas clientes podem criar tickets", 403);
            }

            console.error(error);

            return ApiResponse.error;
        }
    }

    async assign(req: Request, res: Response){
        try{
            const { ticketId } = req.params;

            if (!ticketId) {
                return ApiResponse.error(res, "ID do ticket não informado", 400);
            }

            const user: AuthMiddlewareResponseDTO = res.locals.user;
            
            const dto: AssignTicketDTO = {ticketId, user};
            
            const data = await ticketService.assign(dto);
            
            return ApiResponse.success(res, data, "Sucesso ao atribuir ticket ao agente", 200)
        }catch(error: any){
            if (error.message === "ONLY_AGENT_CAN_CREATE_TICKET") {
                return ApiResponse.error(res, "Apenas agentes podem assumir tickets", 403);
            }

            if (error.message === "TICKET_HAS_ALREADY_BEEN_ASSIGNED") {
                return ApiResponse.error(res, "Ticket já atribuido", 403);
            }

            if (error.message === "TICKET_NOT_FOUND") {
                return ApiResponse.error(res, "Ticket não foi encontrado", 404);
            }

            console.error(error);

            return ApiResponse.error;
        }
    }

    async updateStatus(req: Request, res: Response){
        try{
            const { ticketId } = req.params;
            const { status } = req.body;
            
            if(!status){
                return ApiResponse.error(res, "Status não informado", 400);
            }

            if(!ticketId){
                return ApiResponse.error(res, "Ticket não informado", 400);
            }

            const user: AuthMiddlewareResponseDTO = res.locals.user;

            const dto: UpdateTicketStatusDTO = {
                ticketId,
                status,
                user,
            }

            const ticket: TicketResponseDTO = await ticketService.updateStatus(dto);

            return ApiResponse.success(res, ticket, "Status alterado com sucesso", 200);
        }catch(error: any){
            if (error.message === "TICKET_NOT_FOUND") {
                return ApiResponse.error(res, "Ticket não foi encontrado", 404);
            }

            if(error.message === "ONLY_ASSIGNED_AGENT_CAN_UPDATE_TICKET_STATUS"){
                return ApiResponse.error(res, "Apenas agentes já atribuidos ao ticket podem alterar o seu status", 403);
            }

            console.error(error);

            return ApiResponse.error;
        }
    }
}

export default new TicketController();