import { Router } from "express";

const Routes = Router();

Routes.get('/', (req, res) => {
    return res.status(200).json({
        name: "HelpDesk API",
        status: "online",
        version: "1.0.0",
    });
});

export default Routes;