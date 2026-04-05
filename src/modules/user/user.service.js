import ApiError from "../../config/ApiError.js";
import { isValidObjectId } from "../../utils/main.utils.js";
import User from "./user.model.js";

export const createUserService = async (data) => {
  const exists = await User.exists({ email: data.email });

  if (exists) throw new ApiError("User already exists with email Id!", 400);

  const user = await User.create(data);
  return user;
};

export const getAllUsersService = async (data) => {
  const p = parseInt(data.p) || 1;
  const n = parseInt(data.n) || 10;
  const skip = (p - 1) * n;
  const users = await User.find().skip(skip).limit(n);
  const totalRecords = await User.countDocuments();
  return { users, totalRecords };
};

export const updateUserService = async (userId, data) => {
  if (!isValidObjectId(userId))
    throw new ApiError("Invalid or no user id provided!", 400);

  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new ApiError("Failed to update the user!", 400);

  return user;
};

export const deleteUserService = async (userId) => {
  if (!isValidObjectId(userId))
    throw new ApiError("Invalid or now user id provided!", 400);

  const user = await User.findByIdAndDelete(userId);
  console.log("deletedUser", user);
  return;
};

export const getUserService = async (data) => {
  if (!isValidObjectId(data.id))
    throw new ApiError("Invalid or no user id provided!");
};
