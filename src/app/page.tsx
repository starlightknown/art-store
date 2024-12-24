import OrbitalHero from "@/components/OrbitalHero";
import Navbar from "@/components/Navbar";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ClientOnly>
        <OrbitalHero />
      </ClientOnly>
      <div className="relative z-10">
        <Navbar />
        {/* Hero Section */}
        <header className="h-[calc(100vh-64px)] flex items-center justify-center px-4">
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
              <span
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                          bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]
                          tracking-tight"
              >
                Cosmic Art
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 
                          bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(192,132,252,0.5)]
                          tracking-tight"
              >
                Gallery
              </span>
              <div
                className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                          blur-3xl -z-10 rounded-full opacity-70"
              />
            </h1>
            <p
              className="text-2xl md:text-3xl font-light tracking-wider text-blue-100/90 
                        drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
            >
              Where Art Meets the{" "}
              <span
                className="font-medium bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 
                          bg-clip-text text-transparent tracking-wide"
              >
                Infinite Cosmos
              </span>
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
