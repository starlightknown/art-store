export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Nebula Dreams",
    artist: "Stella Nova",
    price: 299,
    image: "/artworks/nebula-dreams.jpg", // You'll need to add these images
    category: "Digital Art",
    description: "A vibrant interpretation of the Helix Nebula.",
    featured: true,
  },
  {
    id: "2",
    title: "Cosmic Dance",
    artist: "Alex Starling",
    price: 449,
    image: "/artworks/cosmic-dance.jpg",
    category: "Abstract",
    description: "Two galaxies in an eternal cosmic ballet.",
    featured: true,
  },
  // Add more artworks as needed
];
