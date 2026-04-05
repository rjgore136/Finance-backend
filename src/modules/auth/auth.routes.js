import express from "express";
import { loginSchema } from "./auth.validation.js";
import { login } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", authLimiter, validate(loginSchema), login);

export default authRouter;
