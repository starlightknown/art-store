import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is:", process.env.MONGODB_URI);
  console.error("All env vars:", process.env);
  throw new Error("Please add your MONGODB_URI to .env.local");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
