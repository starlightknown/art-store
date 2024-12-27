import { create } from "zustand";
import { Artwork, artworks as initialArtworks } from "@/data/artworks";

interface ArtworkStore {
  artworks: Artwork[];
  addArtwork: (artwork: Artwork) => void;
}

export const useArtworkStore = create<ArtworkStore>((set) => ({
  artworks: initialArtworks,
  addArtwork: (artwork) =>
    set((state) => ({
      artworks: [...state.artworks, artwork],
    })),
}));
