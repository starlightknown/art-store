"use client";

import { useMemo } from "react";

const OrbitalHero = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      animationDelay: `${Math.random() * 4}s`,
      // Add random shimmer duration for more variety
      shimmerDuration: `${(Math.random() * 3 + 2).toFixed(1)}s`,
      // Random glow size
      glowSize: Math.random() * 3 + 1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-950">
      {/* Random stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute animate-[twinkle_4s_ease-in-out_infinite]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.animationDelay,
            }}
          >
            {/* Inner star */}
            <div
              className="absolute inset-0 rounded-full bg-white"
              style={{
                animation: `shimmer ${star.shimmerDuration} ease-in-out infinite`,
                opacity: star.opacity,
              }}
            />
            {/* Glow effect */}
            <div
              className="absolute rounded-full bg-white/30 blur-[1px]"
              style={{
                inset: `-${star.glowSize}px`,
                animation: `shimmer ${star.shimmerDuration} ease-in-out infinite`,
                opacity: star.opacity * 0.5,
              }}
            />
            {/* Extra bright center */}
            <div
              className="absolute inset-0 rounded-full bg-white"
              style={{
                transform: "scale(0.35)",
                opacity: star.opacity * 1.5,
              }}
            />
          </div>
        ))}
      </div>

      {/* Earth and Moon */}
      <div className="absolute w-[500px] h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Earth */}
        <div className="absolute w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Earth base */}
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-green-400">
            <div className="absolute inset-[-2px] rounded-full border-4 border-white/20" />
            <div className="absolute inset-[-50px] bg-blue-400/40 blur-3xl rounded-full" />
            {/* Continents - abstract shapes */}
            <div className="absolute inset-0">
              <div className="absolute w-12 h-8 bg-green-600/60 rounded-full top-8 left-6 rotate-12" />
              <div className="absolute w-16 h-10 bg-green-600/60 rounded-full top-20 left-20 -rotate-12" />
              <div className="absolute w-14 h-12 bg-green-600/60 rounded-full bottom-10 right-8" />
              <div className="absolute w-10 h-8 bg-green-600/60 rounded-full top-12 right-10 rotate-45" />
            </div>
            {/* Cloud layer */}
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay">
              <div className="absolute w-full h-full rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0,rgba(255,255,255,0.2)_50%)]" />
            </div>
          </div>
        </div>

        {/* Moon Orbit */}
        <div className="absolute w-full h-full rounded-full border-2 border-white/10 animate-[spin_20s_linear_infinite]">
          {/* Moon */}
          <div className="absolute -top-6 left-1/2 w-12 h-12 -translate-x-1/2">
            {/* Cat head */}
            <div className="relative w-full h-full">
              {/* Main face */}
              <div className="absolute w-full h-full rounded-[40%] bg-gradient-to-b from-orange-200 to-orange-300">
                {/* Ears - made larger and more triangular */}
                <div className="absolute -top-4 -left-1.5 w-4 h-7 bg-orange-200 rotate-[-20deg] rounded-[70%_70%_0_0]" />
                <div className="absolute -top-4 -right-1.5 w-4 h-7 bg-orange-200 rotate-[20deg] rounded-[70%_70%_0_0]" />
                {/* Inner ears - adjusted to match */}
                <div className="absolute -top-3 -left-1 w-3 h-4 bg-pink-400 rotate-[-20deg] rounded-[70%_70%_0_0]" />
                <div className="absolute -top-3 -right-1 w-3 h-4 bg-pink-400 rotate-[20deg] rounded-[70%_70%_0_0]" />
                {/* Eyes - made more almond-shaped */}
                <div className="absolute w-3 h-2 bg-white rounded-full top-4 left-2.5 rotate-[15deg]">
                  <div className="absolute w-1.5 h-1.5 bg-gray-800 rounded-full top-0.5 right-0.5" />
                </div>
                <div className="absolute w-3 h-2 bg-white rounded-full top-4 right-2.5 -rotate-[15deg]">
                  <div className="absolute w-1.5 h-1.5 bg-gray-800 rounded-full top-0.5 left-0.5" />
                </div>
                {/* Nose - made smaller and more triangular */}
                <div className="absolute w-2 h-1 bg-pink-700 rounded-[30%] top-[48%] left-1/2 -translate-x-1/2" />
                {/* Whiskers - made longer */}
                <div className="absolute top-[52%] left-0 w-4 h-[1px] bg-gray-400 rotate-[15deg]" />
                <div className="absolute top-[56%] left-0 w-4 h-[1px] bg-gray-400 rotate-[5deg]" />
                <div className="absolute top-[52%] right-0 w-4 h-[1px] bg-gray-400 rotate-[-15deg]" />
                <div className="absolute top-[56%] right-0 w-4 h-[1px] bg-gray-400 rotate-[-5deg]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitalHero;
