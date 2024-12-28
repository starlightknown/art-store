import { create } from "zustand";

export interface Artwork {
  _id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  category: string;
  description: string;
  displayIn: Array<"shop" | "gallery" | "both">;
}

interface ArtworkStore {
  artworks: Artwork[];
  addArtwork: (artwork: Artwork) => void;
}

export const useArtworkStore = create<ArtworkStore>((set) => ({
  artworks: [],
  addArtwork: (artwork) =>
    set((state) => ({
      artworks: [...state.artworks, artwork],
    })),
}));
