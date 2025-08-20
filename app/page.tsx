import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/layout/Container"

export default function Home() {
  return (
    <Container className="py-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nhật Huy
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Full Stack Developer passionate about creating beautiful, performant, and accessible web applications.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="group">
            <Link href="/projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/nhathuy" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com/in/nhathuy" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:contact@nhathuy.dev">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-24 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Technologies I Work With</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I specialize in modern web technologies and love building scalable, maintainable applications.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: "React", category: "Frontend" },
            { name: "Next.js", category: "Framework" },
            { name: "TypeScript", category: "Language" },
            { name: "Node.js", category: "Backend" },
            { name: "Tailwind CSS", category: "Styling" },
            { name: "PostgreSQL", category: "Database" },
            { name: "AWS", category: "Cloud" },
            { name: "Docker", category: "DevOps" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-center"
            >
              <h3 className="font-semibold">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.category}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}
