"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useArtworkStore } from "@/store/artworks";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayIn, setDisplayIn] = useState<string[]>(["both"]);
  const router = useRouter();
  const addArtwork = useArtworkStore((state) => state.addArtwork);

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid password");
    } else {
      setIsAuthenticated(true);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />
        <main className="max-w-md mx-auto px-4 pt-24 pb-16">
          <form onSubmit={handleAuth} className="space-y-4">
            <h1 className="text-2xl font-bold mb-8">Admin Authentication</h1>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full 
                       transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Upload Artwork</h1>
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
      </main>
    </div>
  );
}
