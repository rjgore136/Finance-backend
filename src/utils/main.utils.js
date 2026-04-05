import mongoose from "mongoose";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
