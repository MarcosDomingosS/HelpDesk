import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const TicketRoutes = Router();

TicketRoutes.post('/tickets/create', AuthMiddleware, ticketController.store);
TicketRoutes.patch('/tickets/assign/:ticketId', AuthMiddleware, ticketController.assign);
TicketRoutes.patch('/tickets/update-status/:ticketId', AuthMiddleware, ticketController.updateStatus);

export default TicketRoutes;