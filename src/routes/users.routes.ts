import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import { roles } from "../models/user.js";

const Ctrl = new UsersController;
const UsersRoutes = Router();

UsersRoutes.post('/users/create', AuthMiddleware, RoleMiddleware([roles.ADMIN]), Ctrl.store);

export default UsersRoutes;