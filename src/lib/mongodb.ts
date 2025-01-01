import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global as unknown as GlobalWithMongoose;
if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(
      process.env.MONGODB_URI as string
    );
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
    return cached.mongoose.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
