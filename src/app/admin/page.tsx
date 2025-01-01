"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useArtworkStore } from "@/store/artworks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import EditArtworkModal from "@/components/EditArtworkModal";
import { Artwork } from "@/models/Artwork";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [displayIn, setDisplayIn] = useState<string[]>(["both"]);
  const addArtwork = useArtworkStore((state) => state.addArtwork);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Fetch artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await fetch("/api/artworks");
      const data = await response.json();
      setArtworks(data);
    };
    fetchArtworks();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("displayIn", displayIn[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      addArtwork(data.artwork);

      // Clear form
      setTitle("");
      setArtist("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage(null);
      setPreview("");

      // Redirect to gallery
      router.push("/gallery");
    } catch (err) {
      console.error("Error uploading artwork:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const response = await fetch(`/api/artworks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setArtworks(artworks.filter((artwork) => artwork._id !== id));
        toast.success("Artwork deleted successfully");
      } else {
        throw new Error("Failed to delete artwork");
      }
    } catch (err) {
      console.error("Error deleting artwork:", err);
      toast.error("Failed to delete artwork");
    }
  };

  // Show loading state while checking session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Don't render the admin content if not authenticated
  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard ✦</h1>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Artist</label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Display In
                </label>
                <select
                  value={displayIn[0]}
                  onChange={(e) => setDisplayIn([e.target.value])}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="both">Both Shop & Gallery</option>
                  <option value="shop">Shop Only</option>
                  <option value="gallery">Gallery Only</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              {preview && (
                <div className="relative h-48 mt-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full 
                     transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? "Uploading..." : "Upload Artwork"}
          </button>
        </form>

        {/* Artworks List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Manage Artworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700"
              >
                <div className="relative h-48">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-slate-400 mb-4">By {artwork.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300 font-bold">
                      ${artwork.price}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingArtwork(artwork)}
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(artwork._id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {editingArtwork && (
          <EditArtworkModal
            artwork={editingArtwork}
            onClose={() => setEditingArtwork(null)}
            onUpdate={(updatedArtwork) => {
              setArtworks(
                artworks.map((a) =>
                  a._id === updatedArtwork._id ? updatedArtwork : a
                )
              );
              setEditingArtwork(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
