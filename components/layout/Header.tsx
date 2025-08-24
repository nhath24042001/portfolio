"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, Terminal } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();

  const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          <span className="font-bold text-lg">nhathuy.dev</span>
        </Link>

        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}
