import AppError from "./BaseError";

export class ValidationError extends AppError {
    constructor(message: string = "Validation failed") {
        super(message, 400);
    }
}