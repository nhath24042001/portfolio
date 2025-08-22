"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  symbol: string;
  color: string;
}

const symbols = ["</>", "{}", "[]", "()", "=>", "//", "/*", "*/", "&&", "||", "++", "--"];

export function SkillsParticles() {
  const { theme } = useTheme();

  const generateParticles = useCallback((): Particle[] => {
    const particles: Particle[] = [];
    const colors = theme === "dark" 
      ? ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"]
      : ["#1E40AF", "#059669", "#D97706", "#7C3AED", "#DC2626", "#0891B2"];

    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return particles;
  }, [theme]);

  const particles = generateParticles();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute font-mono font-bold select-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            color: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: 10 + particle.speed * 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
}
