import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "@/lib/mongodb";
import { Artwork } from "@/models/Artwork";
import { auth } from "@/app/auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.formData();
    const image = data.get("image") as File;
    const title = data.get("title") as string;
    const artist = data.get("artist") as string;
    const price = parseFloat(data.get("price") as string);
    const category = data.get("category") as string;
    const description = data.get("description") as string;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64"
    )}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "cosmic-art",
    });

    console.log("DisplayIn value:", data.get("displayIn"));

    const artwork = await Artwork.create({
      title,
      artist,
      price,
      category,
      description,
      image: uploadResponse.secure_url,
      displayIn: [data.get("displayIn") as string],
    });

    console.log("Created artwork:", artwork);

    return NextResponse.json({ success: true, artwork });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload artwork" },
      { status: 500 }
    );
  }
}
