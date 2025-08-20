"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, Terminal } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Collapsible>
          <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </CollapsibleContent>
        </Collapsible>
      </div>
    </header>
  );
}
