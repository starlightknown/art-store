import { create } from "zustand";
import { Artwork } from "@/models/Artwork";

interface CartStore {
  items: Artwork[];
  addItem: (item: Artwork) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item._id.toString() !== itemId),
    })),
  clearCart: () => set({ items: [] }),
}));
