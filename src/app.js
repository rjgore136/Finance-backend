import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import transactionRouter from "./modules/transaction/transaction.routes.js";
import dashboardRouter from "./modules/dashboard/dashboard.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(errorMiddleware);

export default app;
