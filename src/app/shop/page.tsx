import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getArtworks } from "../actions/getArtworks";
import { Artwork } from "@/store/artworks";

export default async function Shop() {
  const allArtworks = await getArtworks();

  const shopArtworks = allArtworks.filter((artwork: Artwork) => {
    const shouldShow =
      artwork.displayIn?.includes("shop") ||
      artwork.displayIn?.includes("both") ||
      !artwork.displayIn;

    return shouldShow;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Art Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopArtworks.map((artwork: Artwork) => (
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
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {artwork.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400 font-bold">
                    ${artwork.price}
                  </span>
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors duration-300">
                    Add to Cart
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
