"use client";

import { useState } from "react";
import { Artwork } from "@/models/Artwork";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { updateArtwork } from "@/app/actions/artworkActions";

interface Props {
  artwork: Artwork;
  onClose: () => void;
  onUpdate: (artwork: Artwork) => void;
}

export default function EditArtworkModal({
  artwork,
  onClose,
  onUpdate,
}: Props) {
  const [formData, setFormData] = useState({
    title: artwork.title,
    artist: artwork.artist,
    price: artwork.price,
    category: artwork.category,
    description: artwork.description,
    displayIn: artwork.displayIn || ["both"],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateArtwork(artwork._id, formData);
      onUpdate(result.artwork);
      toast.success("Artwork updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update artwork"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Artwork ✦</h2>
          <button
            onClick={onClose}
            className="p-2 hover:text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Artist</label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, artist: e.target.value }))
              }
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Display In</label>
            <select
              value={formData.displayIn[0]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  displayIn: [e.target.value],
                }))
              }
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="both">Both</option>
              <option value="shop">Shop Only</option>
              <option value="gallery">Gallery Only</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full
                     transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Artwork ✦"}
          </button>
        </form>
      </div>
    </div>
  );
}
