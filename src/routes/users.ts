import { Router } from "express";
import UsersController from "../controllers/users.js";

const Ctrl = new UsersController;
const UsersRoutes = Router();

UsersRoutes.post('/auth/register', Ctrl.register);
UsersRoutes.post('/auth/login', Ctrl.login);

export default UsersRoutes;