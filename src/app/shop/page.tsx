import { Suspense } from "react";
import ShopClient from "./ShopClient";
import { getArtworks } from "../actions/getArtworks";
import Loading from "./loading";

export default async function Shop() {
  const artworks = await getArtworks();
  const filteredArtworks = artworks.filter(
    (artwork) =>
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
