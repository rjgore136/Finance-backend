import express from "express";
import requireAuth from "../../middlewares/auth.middleware.js";
import authorizeRoles from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  createTransactionSchema,
  filterTransactionSchema,
  updateTransactionSchema,
} from "./transaction.validation.js";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "./transaction.controller.js";
import { apiLimiter } from "../../middlewares/rateLimit.middleware.js";

const transactionRouter = express.Router();

transactionRouter.use(apiLimiter);

transactionRouter.post(
  "/",
  requireAuth,
  authorizeRoles("admin"),
  validate(createTransactionSchema),
  createTransaction,
);

transactionRouter.get(
  "/",
  requireAuth,
  authorizeRoles("admin", "analyst"),
  validate(filterTransactionSchema, "query"),
  getTransactions,
);

transactionRouter.get(
  "/:id",
  requireAuth,
  authorizeRoles("admin", "analyst"),
  getTransactionById,
);

transactionRouter.patch(
  "/:id",
  requireAuth,
  authorizeRoles("admin"),
  validate(updateTransactionSchema),
  updateTransaction,
);

transactionRouter.delete(
  "/:id",
  requireAuth,
  authorizeRoles("admin"),
  deleteTransaction,
);

export default transactionRouter;
