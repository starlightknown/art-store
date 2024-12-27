const mongoose = require("mongoose");

async function migrateArtworks() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const Artwork = mongoose.model(
      "Artwork",
      new mongoose.Schema({
        displayIn: {
          type: [String],
          enum: ["shop", "gallery", "both"],
          default: ["both"],
          required: true,
        },
      })
    );

    const result = await Artwork.updateMany(
      { displayIn: { $exists: false } },
      { $set: { displayIn: ["both"] } }
    );

    console.log(`Updated ${result.modifiedCount} artworks`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Load environment variables
require("dotenv").config({ path: ".env.local" });

migrateArtworks();
