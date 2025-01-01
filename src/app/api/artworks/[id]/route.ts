import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Artwork } from "@/models/Artwork";
import { auth } from "@/app/auth";

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = await context.params.id;
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();
    const artwork = await Artwork.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json(artwork);
  } catch (error) {
    console.error("Error updating artwork:", error);
    return NextResponse.json(
      { error: "Failed to update artwork" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = await context.params.id;
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    await Artwork.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return NextResponse.json(
      { error: "Failed to delete artwork" },
      { status: 500 }
    );
  }
}
