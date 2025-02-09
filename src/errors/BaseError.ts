export default class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public success: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true, success: boolean = false) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.success = success;

        // Maintains proper stack trace (Only in V8 engines)
        Error.captureStackTrace(this, this.constructor);
    }
}