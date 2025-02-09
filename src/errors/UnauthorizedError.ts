import AppError from "./BaseError";

export class UnauthorizedError extends AppError {
    constructor(message: string = "You are not authorized to perform this action") {
        super(message, 403);
    }
}