import express from "express";
import validate from "../../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";
import {
  createUser,
  deletedUser,
  getAllUsers,
  getMe,
  updateUser,
} from "./user.controller.js";
import authorizeRoles from "../../middlewares/role.middleware.js";
import requireAuth from "../../middlewares/auth.middleware.js";
import {
  apiLimiter,
  authLimiter,
} from "../../middlewares/rateLimit.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  authLimiter,
  requireAuth,
  authorizeRoles("admin"),
  validate(createUserSchema),
  createUser,
);

userRouter.use(apiLimiter);

userRouter.get("/me", requireAuth, getMe);

userRouter.get("/", requireAuth, authorizeRoles("admin"), getAllUsers);

userRouter.patch(
  "/:id",
  requireAuth,
  authorizeRoles("admin"),
  validate(updateUserSchema),
  updateUser,
);

userRouter.delete("/:id", requireAuth, authorizeRoles("admin"), deletedUser);

export default userRouter;
