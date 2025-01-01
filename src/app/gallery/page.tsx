import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getArtworks } from "../actions/getArtworks";
import { Artwork } from "@/store/artworks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbiting stArt | Gallery",
  description: "Explore our cosmic art gallery",
};

export default async function Gallery() {
  const allArtworks = await getArtworks();
  const galleryArtworks = allArtworks.filter(
    (artwork: Artwork) =>
      artwork.displayIn?.includes("gallery") ||
      artwork.displayIn?.includes("both") ||
      !artwork.displayIn
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 
                        bg-clip-text text-transparent"
          >
            ✦ Art Gallery ✦
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Explore our curated collection of cosmic artworks
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryArtworks.map((artwork: Artwork) => (
            <div
              key={artwork._id.toString()}
              className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50
                        hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
            >
              <div className="relative h-80 overflow-hidden">
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
                <p className="text-sm text-slate-400 line-clamp-2">
                  {artwork.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
