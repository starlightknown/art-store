import { Suspense } from "react";
import ShopClient from "./ShopClient";
import { getArtworks } from "../actions/getArtworks";
import Loading from "./loading";
import { Artwork } from "@/models/Artwork";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbiting stArt | Shop",
  description: "Browse and purchase cosmic artworks",
};

export default async function Shop() {
  const artworks = await getArtworks();
  const filteredArtworks = artworks.filter(
    (artwork: Artwork) =>
      artwork.displayIn?.includes("shop") ||
      artwork.displayIn?.includes("both") ||
      !artwork.displayIn
  );

  return (
    <Suspense fallback={<Loading />}>
      <ShopClient initialArtworks={filteredArtworks} />
    </Suspense>
  );
}
