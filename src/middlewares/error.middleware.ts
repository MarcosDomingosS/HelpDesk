import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.js";
import ApiResponse from "../utils/apiResponse.js";

export function ErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction){
    if(error instanceof ApiError) {
        return ApiResponse.error(res, error.message, error.statusCode ?? 400);
    }

    console.error("Erro inesperado na execução: ", error);

    return ApiResponse.error(res, "Erro interno no servidor", 500);
}