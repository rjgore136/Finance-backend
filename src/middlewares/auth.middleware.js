import jwt from "jsonwebtoken";
import ApiError from "../config/ApiError.js";
import User from "../modules/user/user.model.js";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // console.log("token", token);
    if (!token) throw new ApiError("Unauthorized!", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded", decoded);

    const user = await User.findById(decoded.id);

    if (!user) throw new ApiError("User not found!", 400);

    // console.log("user", user);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default requireAuth;
