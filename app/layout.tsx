import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { GradientBackground } from "@/components/effects/GradientBackground";
import { Cursor } from "@/components/effects/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nhật Huy - Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building beautiful, performant, and accessible web applications.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "Frontend", "Backend"],
  authors: [{ name: "Nhật Huy" }],
  creator: "Nhật Huy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nhathuy.dev",
    title: "Nhật Huy - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    siteName: "nhathuy.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhật Huy - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    creator: "@nhathuy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GradientBackground />
          <Cursor />
          <Header />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
