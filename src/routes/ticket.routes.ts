import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const TicketRoutes = Router();

TicketRoutes.post('/tickets/create', AuthMiddleware, asyncHandler(ticketController.store));
TicketRoutes.patch('/tickets/assign/:ticketId', AuthMiddleware, asyncHandler(ticketController.assign));
TicketRoutes.patch('/tickets/update-status/:ticketId', AuthMiddleware, asyncHandler(ticketController.updateStatus));

export default TicketRoutes;