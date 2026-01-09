import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import authController from "../controllers/auth.controller.js";

const AuthRoutes = Router();

AuthRoutes.post('/auth/register', authController.register);
AuthRoutes.post('/auth/login', authController.login);
AuthRoutes.get('/me', AuthMiddleware, authController.me)

export default AuthRoutes;