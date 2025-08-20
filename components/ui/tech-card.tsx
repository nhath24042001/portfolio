"use client";

import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TechCardProps {
  name: string;
  category: string;
  icon: ReactNode;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TechCard({ name, category, icon, color, className, style }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    if (isHovered) {
      // Generate particles
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn(
        "group relative p-6 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden",
        "hover:bg-card/80 hover:border-primary/20 hover:shadow-2xl",
        "transform-gpu perspective-1000",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(${isHovered ? 1.05 : 1})`,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-all duration-700"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, ${color}40, transparent 50%),
            radial-gradient(circle at 70% 80%, ${color}30, transparent 50%),
            radial-gradient(circle at 50% 50%, ${color}20, transparent 70%)
          `,
          animation: isHovered ? "pulse 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: color,
            opacity: particle.opacity,
            animation: `float-particle 3s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.2}s`,
          }}
        />
      ))}

      {/* Glowing border effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, transparent, ${color}20, transparent)`,
          animation: isHovered ? "border-glow 2s linear infinite" : "none",
        }}
      />

      {/* Icon with enhanced effects */}
      <div className="relative z-10 mb-4 flex items-center justify-center">
        <div
          className="p-4 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            boxShadow: isHovered ? `0 0 20px ${color}40` : "none",
          }}
        >
          <div 
            className="text-3xl transition-all duration-300 group-hover:scale-110"
            style={{ 
              color,
              filter: isHovered ? "drop-shadow(0 0 8px currentColor)" : "none",
            }}
          >
            {icon}
          </div>
        </div>
      </div>

      {/* Content with enhanced typography */}
      <div className="relative z-10 text-center">
        <h3 
          className="font-bold text-xl mb-2 transition-all duration-300 group-hover:text-primary group-hover:scale-105"
          style={{
            textShadow: isHovered ? `0 0 10px ${color}40` : "none",
          }}
        >
          {name}
        </h3>
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 font-medium">
          {category}
        </p>
      </div>

      {/* Ripple effect on click */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}30, transparent 70%)`,
          animation: "ripple 0.6s ease-out",
        }}
      />

      {/* Category indicator - always visible */}
      <div
        className="absolute top-2 right-2 w-2 h-2 rounded-full opacity-60"
        style={{
          backgroundColor: color,
        }}
      />
      
      {/* Floating tech badge */}
      <div
        className="absolute -top-1 -right-1 px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0 z-20"
        style={{
          backgroundColor: color,
          color: "#ffffff",
          boxShadow: `0 2px 8px ${color}40`,
          minWidth: "fit-content",
          whiteSpace: "nowrap",
        }}
      >
        {category}
      </div>
    </div>
  );
}
