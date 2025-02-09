import express from "express";
import { registerUser, loginUser } from "../controllers/userAuthController";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;