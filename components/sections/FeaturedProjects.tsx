"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe integration.",
    image: "/api/placeholder/400/250",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "https://github.com/nhath24042001/ecommerce",
    live: "https://ecommerce-demo.vercel.app",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    image: "/api/placeholder/400/250",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/nhath24042001/task-app",
    live: "https://task-app-demo.vercel.app",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with animations and responsive design.",
    image: "/api/placeholder/400/250",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/nhath24042001/portfolio",
    live: "https://nhathuy.dev",
    featured: true,
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for web development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="group relative bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex gap-2">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                )}
                {project.live && (
                  <Button size="sm" asChild>
                    <Link href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg" asChild>
          <Link href="/projects">
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
