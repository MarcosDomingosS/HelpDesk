import { Response } from 'express';

export default class ApiResponse {
  static success(
    res: Response,
    data: any = null,
    message = "Sucesso",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message = "Erro interno",
    statusCode = 500,
    errors: any = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}