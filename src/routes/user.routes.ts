import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import { roles } from "../models/user.js";
import userController from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const UserRoutes = Router();

UserRoutes.post('/users/create', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(userController.store));
UserRoutes.get('/users', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(userController.index));
UserRoutes.delete('/users/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(userController.destroy));
UserRoutes.patch('/users/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(userController.edit));

export default UserRoutes;