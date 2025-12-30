import { Router } from "express";
import UsersController from "../controllers/users.controller.js";

const Ctrl = new UsersController;
const UsersRoutes = Router();

export default UsersRoutes;