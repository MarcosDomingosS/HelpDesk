import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import { roles } from "../models/user.js";

const Ctrl = new UsersController;
const UsersRoutes = Router();

UsersRoutes.post('/users/create', AuthMiddleware, RoleMiddleware([roles.ADMIN]), Ctrl.store);
UsersRoutes.get('/users', AuthMiddleware, RoleMiddleware([roles.ADMIN]), Ctrl.index);
UsersRoutes.delete('/users/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), Ctrl.destroy);
UsersRoutes.patch('/users/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), Ctrl.edit);

export default UsersRoutes;