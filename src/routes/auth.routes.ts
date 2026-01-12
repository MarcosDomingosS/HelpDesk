import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import authController from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const AuthRoutes = Router();

AuthRoutes.post('/auth/register', asyncHandler(authController.register));
AuthRoutes.post('/auth/login', asyncHandler(authController.login));
AuthRoutes.get('/me', AuthMiddleware, asyncHandler(authController.me))

export default AuthRoutes;