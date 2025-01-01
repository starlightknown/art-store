"use server";

import { cache } from "react";
import { connectToDatabase } from "@/lib/mongodb";
import { Artwork } from "@/models/Artwork";

export const getArtworks = cache(async () => {
  await connectToDatabase();
  const artworks = await Artwork.find().lean();
  return JSON.parse(JSON.stringify(artworks));
});
