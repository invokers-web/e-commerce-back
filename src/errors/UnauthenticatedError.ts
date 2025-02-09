import AppError from "./BaseError";

export class UnauthenticatedError extends AppError {
    constructor(message: string = "Authentication required") {
        super(message, 401);
    }
}