import OrbitalHero from "@/components/OrbitalHero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <OrbitalHero />
      <div className="relative z-10">
        <Navbar />
        {/* Hero Section */}
        <header className="h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Cosmic Art Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Discover the Universe Through Art
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
