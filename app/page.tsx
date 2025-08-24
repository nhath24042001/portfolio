import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Code, Database, Cloud, Layers, Zap, Globe, Shield, Settings, Server } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { TypewriterText } from "@/components/effects/TypewriterText"
import { TechCard } from "@/components/ui/tech-card"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"

const technologies = [
  { name: "React", category: "Frontend", icon: <Code />, color: "#61DAFB" },
  { name: "Next.js", category: "Framework", icon: <Layers />, color: "#000000" },
  { name: "Angular", category: "Frontend", icon: <Code />, color: "#DD0031" },
  { name: "Vue.js", category: "Frontend", icon: <Code />, color: "#4FC08D" },
  { name: "TypeScript", category: "Language", icon: <Code />, color: "#3178C6" },
  { name: "Node.js", category: "Backend", icon: <Settings />, color: "#339933" },
  { name: "NestJS", category: "Backend", icon: <Server />, color: "#E0234E" },
  { name: "GraphQL", category: "API", icon: <Zap />, color: "#E10098" },
  { name: "PostgreSQL", category: "Database", icon: <Database />, color: "#336791" },
  { name: "TypeORM", category: "ORM", icon: <Database />, color: "#FCA326" },
  { name: "Tailwind CSS", category: "Styling", icon: <Zap />, color: "#06B6D4" },
  { name: "Docker", category: "DevOps", icon: <Shield />, color: "#2496ED" },
];

export default function Home() {
  return (
    <>
      <Container className="py-16 relative">
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto relative">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <TypewriterText 
                  text="Nhật Huy" 
                  speed={150} 
                  delay={500}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <TypewriterText 
                text="Full Stack Developer passionate about creating beautiful, performant, and accessible web applications." 
                speed={50} 
                delay={2000}
              />
            </p>
            <p className="text-lg text-muted-foreground/80 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              Based in Vietnam • Available for remote work
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
            <Button asChild size="lg" className="group animate-bounce-slow">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="animate-pulse-slow">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <Link href="https://github.com/nhath24042001" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <Link href="https://www.linkedin.com/in/huy-nguy%E1%BB%85n-v%C4%83n-nh%E1%BA%ADt-2242b7273/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <Link href="mailto:nhath24042001@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>
      </Container>

      {/* Technologies Section */}
      <Container className="py-20">
        <section className="space-y-12">
          <div className="text-center space-y-4 animate-slide-in-left">
            <h2 className="text-3xl md:text-4xl font-bold">Technologies I Work With</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I specialize in modern web technologies and love building scalable, maintainable applications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.name}
                name={tech.name}
                category={tech.category}
                icon={tech.icon}
                color={tech.color}
                className="tech-card-enter hover-lift"
                style={{ 
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "both",
                }}
              />
            ))}
          </div>
        </section>
      </Container>

      {/* Featured Projects */}
      <Container>
        <FeaturedProjects />
      </Container>

      {/* CTA Section */}
      <Container className="py-20">
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Let&apos;s Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/about">Learn More About Me</Link>
            </Button>
          </div>
        </section>
      </Container>
    </>
  )
}
