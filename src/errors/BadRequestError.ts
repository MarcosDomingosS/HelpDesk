import { ApiError } from "./ApiError.js";

export class BadRequestError extends ApiError{
    constructor(message: string){
        super(message, 400);
    }
}