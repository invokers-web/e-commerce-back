import { NextFunction, Request, Response } from "express";
import AppError from "../errors/BaseError";
import { InternalServerError } from "../errors/InternalServerError";

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
            success: err.success,
        });
    } else {
        console.error("Unexpected error: ", err)
        return res.status(500).json({ error: new InternalServerError().message })
    }
}

export default errorHandler;