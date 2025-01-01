"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Artwork } from "@/models/Artwork";
import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function updateArtwork(id: string, data: Partial<Artwork>) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await connectToDatabase();
    const artwork = await Artwork.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/gallery");

    return { success: true, artwork: JSON.parse(JSON.stringify(artwork)) };
  } catch (error) {
    console.error("Error updating artwork:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update artwork"
    );
  }
}

export async function deleteArtwork(id: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await connectToDatabase();
    await Artwork.findByIdAndDelete(id);

    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/gallery");

    return { success: true };
  } catch (error) {
    console.error("Error deleting artwork:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete artwork"
    );
  }
}

export async function createArtwork(formData: FormData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const displayIn = formData.get("displayIn") as string;

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "cosmic-art",
    });

    await connectToDatabase();
    const artwork = await Artwork.create({
      title,
      artist,
      price,
      category,
      description,
      image: uploadResponse.secure_url,
      displayIn: [displayIn],
    });

    const plainArtwork = await Artwork.findById(artwork._id).lean();

    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/gallery");

    return { success: true, artwork: JSON.parse(JSON.stringify(plainArtwork)) };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to upload artwork"
    );
  }
}

export async function getArtworks() {
  try {
    await connectToDatabase();
    const artworks = await Artwork.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(artworks));
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch artworks"
    );
  }
}
