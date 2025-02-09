import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan"
// REQUIRE ROUTES
// import uploadRoutes from "./routes/upload";
import errorHandler from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/NotFoundError";
import { SomethingWentWrongError } from "./errors/SomethingWentWrong";
import authRoutes from "./routes/userAuth";



const app = express();

app.use(morgan("dev"))
// BODY PARSERS
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// COOKIES
app.use(cookieParser());

// Cors Middleware (Only for development)
const corsOptions: cors.CorsOptions = {
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ROUTES
// app.use("/uploads", uploadRoutes);
app.use("/auth", authRoutes);

// ERROR CATCHERS
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError())
});
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

// DATABASE CONNECTION
mongoose
    .connect(process.env.MONGO_URI as string, {
        readPreference: "secondaryPreferred",
        maxPoolSize: 10,
        minPoolSize: 5,
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((error) => {
        console.error(error);
    });

// APP PORT LISTENER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
