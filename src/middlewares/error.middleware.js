import ApiError from "../config/ApiError.js";
import { ZodError } from "zod";

const errorMiddleware = async (err, req, res, next) => {
  console.log("err", err);

  err.message ||= "A server error occurred. Please try again later.";
  err.statusCode ||= 500;

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err.code === 11000) {
    const duplicateFields = Object.keys(err.keyPattern).join(", ");
    err.message = `Duplicate field(s) detected: ${duplicateFields}. Please use unique values.`;
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    const path = err.path;
    const value = err.value;
    err.message = `Invalid format for the field "${path}": "${value}".`;
    err.statusCode = 400;
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    err.message = `Validation error: ${errors.join(", ")}`;
    err.statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    err.message = "Your token is invalid. Please log in again.";
    err.statusCode = 401;
  } else if (err.name === "TokenExpiredError") {
    err.message = "Your session is expired. Please log in again.";
    err.statusCode = 401;
  }

  const response = {
    success: false,
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(err.statusCode).json(response);
};

export default errorMiddleware;
