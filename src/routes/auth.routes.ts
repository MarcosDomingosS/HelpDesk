import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const Ctrl = new AuthController;
const AuthRoutes = Router();

AuthRoutes.post('/auth/register', Ctrl.register);
AuthRoutes.post('/auth/login', Ctrl.login);
AuthRoutes.get('/me', AuthMiddleware, Ctrl.me)

export default AuthRoutes;