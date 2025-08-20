"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/nhathuy",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/nhathuy",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/nhathuy",
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:contact@nhathuy.dev",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Nhật Huy. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1"></p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8"
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
