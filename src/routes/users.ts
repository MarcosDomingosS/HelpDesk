import { Router } from "express";
import Users from "../models/user.js";
import UsersController from "../controllers/users.js";

const Ctrl = new UsersController;
const UsersRoutes = Router();

UsersRoutes.post('/auth/register', Ctrl.register);

export default UsersRoutes;