import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      "CRITICAL: MONGODB_URI environment variable is missing! Please configure MONGODB_URI in your environment settings (Render Dashboard -> Environment)."
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log("MongoDB Connected successfully to:", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
