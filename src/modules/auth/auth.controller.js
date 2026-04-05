import { loginService } from "./auth.service.js";
import { cookieOptions } from "../../utils/main.utils.js";

export const login = async (req, res, next) => {
  try {
    const { token, user } = await loginService(req.body);

    const { password, ...safeData } = user.toObject();

    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: safeData,
    });
  } catch (error) {
    next(error);
  }
};
