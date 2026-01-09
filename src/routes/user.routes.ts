import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import { roles } from "../models/user.js";
import userController from "../controllers/user.controller.js";

const UserRoutes = Router();

UserRoutes.post('/users/create', AuthMiddleware, RoleMiddleware([roles.ADMIN]), userController.store);
UserRoutes.get('/users', AuthMiddleware, RoleMiddleware([roles.ADMIN]), userController.index);
UserRoutes.delete('/users/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), userController.destroy);
UserRoutes.patch('/users/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), userController.edit);

export default UserRoutes;