import express from "express";
import requireAuth from "../../middlewares/auth.middleware.js";
import authorizeRole from "../../middlewares/role.middleware.js";
import {
  getDashboardSummary,
  getRecentTransactions,
} from "./dashboard.controller.js";
import { apiLimiter } from "../../middlewares/rateLimit.middleware.js";

const dashboardRouter = express.Router();

dashboardRouter.use(apiLimiter);

dashboardRouter.get(
  "/recent",
  requireAuth,
  authorizeRole("admin", "analyst", "viewer"),
  getRecentTransactions,
);

dashboardRouter.get(
  "/summary",
  requireAuth,
  authorizeRole("admin", "analyst", "viewer"),
  getDashboardSummary,
);

export default dashboardRouter;
