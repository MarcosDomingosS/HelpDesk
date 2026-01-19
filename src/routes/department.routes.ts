import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
import { roles } from "../models/user.js";
import departmentController from "../controllers/department.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const DepartmentRoutes = Router();

DepartmentRoutes.get('/departments', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(departmentController.index));
DepartmentRoutes.post('/departments/create', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(departmentController.store));
DepartmentRoutes.delete('/departments/:id', AuthMiddleware, RoleMiddleware([roles.ADMIN]), asyncHandler(departmentController.destroy));

export default DepartmentRoutes;