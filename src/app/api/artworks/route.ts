import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Artwork } from "@/models/Artwork";

export async function GET() {
  try {
    await connectToDatabase();
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json(
      { error: "Failed to fetch artworks" },
      { status: 500 }
    );
  }
}
