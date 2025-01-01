"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Artwork } from "@/models/Artwork";
import { useCartStore } from "@/store/cart";
import { toast } from "react-hot-toast";

export default function ShopClient({
  initialArtworks,
}: {
  initialArtworks: Artwork[];
}) {
  const [artworks] = useState(initialArtworks);
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            ✦ Art Shop ✦
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Find your perfect piece of the cosmos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div
              key={artwork._id.toString()}
              className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50
                        hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent 
                             pointer-events-none transition-opacity duration-300"
                />
              </div>
              <div className="relative p-6">
                <h3
                  className="text-xl font-semibold mb-2 text-white group-hover:text-purple-200 
                             transition-colors duration-300"
                >
                  {artwork.title} ✦
                </h3>
                <p className="text-slate-300 mb-2">By {artwork.artist}</p>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                  {artwork.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-bold">
                    ${artwork.price}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(artwork);
                      toast.success("Added to cart!");
                    }}
                    className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full text-sm
                             transition-all duration-300 shadow-md hover:shadow-purple-500/20"
                  >
                    Add to Cart ✦
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
