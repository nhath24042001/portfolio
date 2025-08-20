"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg bg-primary/90 backdrop-blur-sm hover:bg-primary transition-all duration-300 animate-fade-in-up"
          style={{
            animation: "fadeInUp 0.3s ease-out",
          }}
        >
          <ChevronUp className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      )}
    </>
  );
}
