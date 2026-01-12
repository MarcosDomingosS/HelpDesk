import { ApiError } from "./ApiError.js";

export class UnauthorizedError extends ApiError {
  constructor(message = "Não autorizado") {
    super(message, 401);
  }
}
