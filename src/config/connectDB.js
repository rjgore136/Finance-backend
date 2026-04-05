import mongoose from "mongoose";
import User from "../modules/user/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to DB successfully...");
  } catch (error) {
    console.log("DB Connection Error: ", error);
  }
};

export const initiateDb = async () => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });
      console.log("Admin created...");
    }
  } catch (error) {
    console.log("Error while initiating db...", error);
  }
};

export default connectDB;
