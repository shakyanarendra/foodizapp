import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connection successfull");
  } catch (error) {
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
