"use client";

import { useEffect, useState } from "react";

export function GradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-colors duration-1000"
        style={{
          background: `
            radial-gradient(
              600px circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%,
              rgba(120, 119, 198, 0.3),
              transparent 40%
            ),
            radial-gradient(
              400px circle at ${(1 - mousePosition.x) * 100}% ${
            (1 - mousePosition.y) * 100
          }%,
              rgba(255, 119, 198, 0.3),
              transparent 40%
            )
          `,
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
        <div className="absolute inset-0 bg-noise" />
      </div>
    </div>
  );
}
