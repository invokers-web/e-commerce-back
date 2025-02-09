import AppError from "./BaseError";

export class SomethingWentWrongError extends AppError {
    constructor(message: string = "Something went wrong") {
        super(message, 500);
    }
}