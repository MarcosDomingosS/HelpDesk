import { Router } from "express";
import UserRoutes from "./user.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger.js";
import AuthRoutes from "./auth.routes.js";
import DepartmentRoutes from "./department.routes.js";
import TicketRoutes from "./ticket.routes.js";

const Routes = Router();

Routes.get('/', (req, res) => {
    return res.status(200).json({
        name: "HelpDesk API",
        status: "online",
        version: "1.0.0",
    });
});

Routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

Routes.use(UserRoutes);
Routes.use(AuthRoutes);
Routes.use(DepartmentRoutes);
Routes.use(TicketRoutes);

export default Routes;