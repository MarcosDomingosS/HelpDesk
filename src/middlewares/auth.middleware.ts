import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";
import type { Request, Response, NextFunction } from "express";
import { roles } from "../models/user.js";

interface TokenPayload {
  id: string;
  email: string;
  role: roles;
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({
            sucess: false,
            message: "Token não enviado",
        });
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            sucess: false,
            message: "Token inválido",
        });
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret) as TokenPayload;

        res.locals.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            sucess: false,
            message: "Token expirado ou inválido",
        });
    }
};