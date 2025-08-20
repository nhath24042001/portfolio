"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 animate-pulse" />
      </div>
    </div>
  );
}
