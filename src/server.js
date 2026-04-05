import app from "./app.js";
import dotenv from "dotenv";
import connectDB, { initiateDb } from "./config/connectDB.js";
dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Api server running at http://localhost:${port}`);
    });
    await initiateDb();
  } catch (error) {
    console.log("Failed to start server: ", error.message);
  }
};

startServer();
