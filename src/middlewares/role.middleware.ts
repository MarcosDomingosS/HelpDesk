import { Request, Response, NextFunction } from "express";

export default function RoleMiddleware(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user || !user.role) {
      return res.status(403).json({
        sucess: false,
        message: "Acesso negado",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        sucess: false,
        message: "Permissão insuficiente",
      });
    }

    return next();
  };
}