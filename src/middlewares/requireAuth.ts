import jwt from "jsonwebtoken";
import userModel, { IUser } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new UnauthenticatedError("You must be authenticated")
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_LOGIN_SECRET as string) as {
            _id: string;
            name: string;
            email: string;
            phone: string;
        };
        req.user = await userModel.findById(decoded._id) as IUser;

        next();
    } catch (error) {
        console.error("requireAuth error: ", error);
        next(error)
    }
};

export { requireAuth };
