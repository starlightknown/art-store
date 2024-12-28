import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getArtworks } from "../actions/getArtworks";
import { Artwork } from "@/store/artworks";

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
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Art Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryArtworks.map((artwork: Artwork) => (
            <div
              key={artwork._id.toString()}
              className="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
            >
              <div className="relative h-64">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                <p className="text-gray-400 mb-2">By {artwork.artist}</p>
                <p className="text-sm text-gray-400">{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
