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
        <header className="h-[calc(100vh-64px)] flex items-center justify-center px-4">
          <div
            className="text-center space-y-8 bg-gradient-to-b from-slate-950/50 via-slate-900/25 to-transparent 
                         px-12 py-16 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4 relative">
              <span
                className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 
                          bg-clip-text text-transparent [text-shadow:_0_0_45px_rgba(99,102,241,0.5)]
                          tracking-tight leading-tight"
              >
                ✦ Orbiting stArt ✦
              </span>
              <div
                className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 
                          blur-3xl -z-10 rounded-full opacity-70 animate-pulse"
              />
            </h1>
            <p
              className="text-xl md:text-2xl font-light tracking-wide text-white 
                        [text-shadow:_2px_2px_10px_rgba(0,0,0,0.5)] max-w-2xl mx-auto"
            >
              Where Art Meets the{" "}
              <span
                className="font-medium bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 
                          bg-clip-text text-transparent [text-shadow:_2px_2px_10px_rgba(255,255,255,0.3)]"
              >
                Infinite Cosmos
              </span>
              <br />
              <span className="text-base text-white [text-shadow:_2px_2px_10px_rgba(0,0,0,0.5)]">
                - by{" "}
                <span className="font-medium text-purple-200 [text-shadow:_0_0_20px_rgba(216,180,254,0.5)]">
                  Karuna ✦
                </span>
              </span>
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
