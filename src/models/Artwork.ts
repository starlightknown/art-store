"use server";

import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Artwork =
  mongoose.models?.Artwork || mongoose.model("Artwork", ArtworkSchema);
