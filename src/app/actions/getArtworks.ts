"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Artwork } from "@/models/Artwork";
import { cache } from "react";

export const getArtworks = cache(async () => {
  try {
    await connectToDatabase();
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(artworks));
  } catch (error) {
    console.error("Failed to fetch artworks:", error);
    return [];
  }
});
