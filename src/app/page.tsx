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
                Orbiting stArt
              </span>
              <br />
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
                className="font-semibold bg-gradient-to-r from-cyan-200 via-pink-200 to-violet-200 
                          bg-clip-text text-transparent tracking-wide
                          [text-shadow:_0_0_2px_rgba(255,255,255,0.5)]"
              >
                Infinite Cosmos
              </span>
              <br />- by{" "}
              <span
                className="font-semibold bg-gradient-to-r from-cyan-200 via-pink-200 to-violet-200 
                          bg-clip-text text-transparent tracking-wide
                          [text-shadow:_0_0_2px_rgba(255,255,255,0.5)]"
              >
                Karuna
              </span>
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
