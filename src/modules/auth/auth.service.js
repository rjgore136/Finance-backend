import User from "../user/user.model.js";
import ApiError from "../../config/ApiError.js";
import generateToken from "../../config/jwtToken.js";

export const loginService = async (data) => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) throw new ApiError("Invalid email or password!", 401);

  const isPasswordMatch = await user.comparePassword(data.password);
  if (!isPasswordMatch) throw new ApiError("Invalid email or password!", 401);

  if (user.status === "inactive")
    throw new ApiError("User account is inactive", 403);

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};
