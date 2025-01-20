const cluster = require("cluster");
const os = require("os");
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process running with PID: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited. Forking a new one.`);
        cluster.fork();
    });
} else {
    // DOTENV CONFIGURATION
    require("dotenv").config();

    // EXPRESS CONFIGURATION
    const express = require("express");
    const app = express();

    // REQUIRE ROUTES
    const uploadRoutes = require("./routes/upload");
    const authRoutes = require("./routes/userAuth");

    // BODY PARSERS
    const bodyParser = require("body-parser");
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));

    // COOKIES
    const cookieParser = require("cookie-parser");
    app.use(cookieParser());

    // Cors Middleware (Only for development)
    const cors = require("cors");
    const corsOptions = {
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));

    // ROUTES
    app.use("/uploads", uploadRoutes);
    app.use("/auth", authRoutes);

    // ERROR CATCHER
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error!");
    });

    // DATABASE CONNECTION
    const { default: mongoose } = require("mongoose");
    mongoose
        .connect(process.env.MONGO_URI, {
            readPreference: "secondaryPreferred",
            maxPoolSize: 10,
            minPoolSize: 5,
        })
        .then(() => {
            console.log("Connected to Database");
        })
        .catch((error) => {
            console.log(error);
        });

    // APP PORT LISTENER
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
}
