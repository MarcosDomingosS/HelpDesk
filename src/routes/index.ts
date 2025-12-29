import { Router } from "express";
import UsersRoutes from "./users.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swegger.js";

const Routes = Router();




Routes.get('/', (req, res) => {
    return res.status(200).json({
        name: "HelpDesk API",
        status: "online",
        version: "1.0.0",
    });
});

Routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


Routes.use(UsersRoutes);

export default Routes;