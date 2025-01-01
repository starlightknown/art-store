"use server";

import mongoose, { Document } from "mongoose";

const ArtworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false },
  displayIn: {
    type: [String],
    enum: ["shop", "gallery", "both"],
    default: ["both"],
    required: true,
    validate: {
      validator: function (v: string[]) {
        return v && v.length > 0;
      },
      message: "displayIn must not be empty",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

export const Artwork =
  mongoose.models?.Artwork || mongoose.model("Artwork", ArtworkSchema);

export interface Artwork extends Document {
  _id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  category: string;
  description: string;
  displayIn?: string[];
  createdAt?: Date;
}
