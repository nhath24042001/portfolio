"use client";

import { useEffect, useState } from "react";
import { Code, Sparkles, Zap, Star } from "lucide-react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const icons = [Code, Sparkles, Zap, Star];
    const newElements: FloatingElement[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      icon: icons[Math.floor(Math.random() * icons.length)],
      delay: Math.random() * 2000,
    }));

    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <div
            key={element.id}
            className="absolute text-primary/20 dark:text-primary/10"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `float ${element.speed}s ease-in-out infinite`,
              animationDelay: `${element.delay}ms`,
            }}
          >
            <Icon className={`w-${element.size} h-${element.size}`} />
          </div>
        );
      })}
    </div>
  );
}
