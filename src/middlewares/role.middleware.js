import ApiError from "../config/ApiError.js";

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError("Unauthorized. Please login.", 401));
    }

    // console.log("req.user", req.user);

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to perform this action.", 403),
      );
    }

    next();
  };
};

export default authorizeRoles;
