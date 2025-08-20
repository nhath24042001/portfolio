import { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
}

export function generateSEO({
  title = "Nhật Huy - Full Stack Developer",
  description = "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building beautiful, performant, and accessible web applications.",
  keywords = ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development"],
  image = "/og-image.jpg",
  url = "https://nhathuy.dev",
  type = "website",
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: "Nhật Huy" }],
    creator: "Nhật Huy",
    openGraph: {
      type,
      locale: "en_US",
      url,
      title,
      description,
      siteName: "nhathuy.dev",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@nhathuy",
      images: [image],
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
    alternates: {
      canonical: url,
    },
  }
}
