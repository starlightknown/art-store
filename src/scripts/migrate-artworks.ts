import mongoose from "mongoose";
import dotenv from "dotenv";

async function migrateArtworks() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Load environment variables
dotenv.config({ path: ".env.local" });

migrateArtworks();
