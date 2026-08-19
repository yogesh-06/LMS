import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI: string = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI).then((data: any) => {
      console.log("MongoDB connected to: " + data.connection.host);
    });
  } catch (error: any) {
    console.error(error.message);
    setTimeout(connectDB, 5000);
    // process.exit(1);
  }
};

export default connectDB;
