"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Predefined positions for particles to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: "10%", top: "20%" },
  { left: "30%", top: "40%" },
  { left: "50%", top: "60%" },
  { left: "70%", top: "80%" },
  { left: "90%", top: "30%" },
  { left: "20%", top: "70%" },
  { left: "40%", top: "10%" },
  { left: "60%", top: "90%" },
  { left: "80%", top: "50%" },
  { left: "15%", top: "85%" },
];

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Live wallpaper background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm" />
      
      {/* Dynamic particles */}
      <div className="absolute inset-0">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-500/20 dark:bg-purple-500/20"
            style={{
              left: pos.left,
              top: pos.top,
              animation: `float ${20 + (i * 2)}s infinite`,
              animationDelay: `${i}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse follow effect */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-1000"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          background: theme === "dark" 
            ? "radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.3) 100%)"
            : "radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.1) 100%)",
        }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm animate-gradient" />
    </div>
  );
} 