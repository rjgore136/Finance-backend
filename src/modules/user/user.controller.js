import ApiError from "../../config/ApiError.js";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
} from "./user.service.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.validated.body);
    if (!user) throw new ApiError("Failed to create user!", 400);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { users, totalRecords } = await getAllUsersService(
      req.validated.query,
    );
    res.status(200).json({
      success: true,
      users,
      totalRecords,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserService(req.params.id, req.validated.body);

    const { password, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deletedUser = async (req, res, next) => {
  try {
    await deleteUserService(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const { password, ...safeUser } = req.user.toObject();

    res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};
