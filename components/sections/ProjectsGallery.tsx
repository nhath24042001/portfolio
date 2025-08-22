"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectDetailModal } from "@/components/ui/project-detail-modal";
import { ProjectsParticles } from "@/components/effects/ProjectsParticles";
import { 
  Code, 
  Globe, 
  Smartphone, 
  Database, 
  Zap, 
  Shield, 
  ExternalLink, 
  Github, 
  Play,
  Filter,
  Search,
  Calendar,
  Users,
  Star,
  Eye,
  ArrowRight,
  ChevronDown,
  X
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  techStack: string[];
  status: "completed" | "in-progress" | "featured";
  image: string;
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  completionDate: string;
  client?: string;
  teamSize?: number;
  challenges: string[];
  solutions: string[];
  highlights: string[];
  process: {
    phase: string;
    description: string;
    duration: string;
  }[];
}

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, shopping cart, payment processing, and admin dashboard.",
    shortDescription: "Full-stack e-commerce platform with payment integration",
    category: "Web Application",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
    status: "completed",
    image: "/api/placeholder/600/400",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    githubUrl: "https://github.com/nhath24042001/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    completionDate: "2024",
    client: "Startup Company",
    teamSize: 3,
    challenges: [
      "Complex payment flow integration with multiple payment methods",
      "Real-time inventory management across multiple warehouses",
      "High-performance product search with filters and sorting"
    ],
    solutions: [
      "Implemented Stripe Connect for multi-vendor payments",
      "Built Redis-based caching system for inventory updates",
      "Created Elasticsearch integration for advanced product search"
    ],
    highlights: [
      "Processed $50K+ in transactions",
      "99.9% uptime during Black Friday",
      "Reduced checkout time by 40%"
    ],
    process: [
      { phase: "Discovery", description: "Requirements gathering and user research", duration: "2 weeks" },
      { phase: "Design", description: "UI/UX design and prototyping", duration: "3 weeks" },
      { phase: "Development", description: "Full-stack development and testing", duration: "8 weeks" },
      { phase: "Deployment", description: "Production deployment and monitoring", duration: "1 week" }
    ]
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team features, and advanced project tracking. Built with React, Node.js, and Socket.io for real-time collaboration.",
    shortDescription: "Real-time collaborative task management system",
    category: "Web Application",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
    status: "completed",
    image: "/api/placeholder/600/400",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    githubUrl: "https://github.com/nhath24042001/task-app",
    liveUrl: "https://task-app-demo.vercel.app",
    featured: true,
    completionDate: "2023",
    client: "Tech Startup",
    teamSize: 2,
    challenges: [
      "Real-time synchronization across multiple users",
      "Complex permission system for team management",
      "Offline functionality with data sync"
    ],
    solutions: [
      "Implemented WebSocket connections with automatic reconnection",
      "Built role-based access control with granular permissions",
      "Created service worker for offline-first experience"
    ],
    highlights: [
      "500+ active users",
      "Real-time updates under 100ms",
      "99.5% user satisfaction rate"
    ],
    process: [
      { phase: "Planning", description: "Feature planning and architecture design", duration: "1 week" },
      { phase: "Development", description: "Core functionality and real-time features", duration: "6 weeks" },
      { phase: "Testing", description: "Comprehensive testing and bug fixes", duration: "2 weeks" },
      { phase: "Launch", description: "Production deployment and user onboarding", duration: "1 week" }
    ]
  },
  {
    id: "mobile-fitness-app",
    title: "Fitness Tracking App",
    description: "A mobile fitness tracking application with workout planning, progress tracking, and social features. Built with React Native and Firebase for cross-platform compatibility.",
    shortDescription: "Cross-platform fitness tracking with social features",
    category: "Mobile Application",
    techStack: ["React Native", "Firebase", "Redux", "Expo", "TypeScript"],
    status: "completed",
    image: "/api/placeholder/600/400",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    githubUrl: "https://github.com/nhath24042001/fitness-app",
    liveUrl: "https://fitness-app-expo.vercel.app",
    featured: false,
    completionDate: "2023",
    client: "Fitness Startup",
    teamSize: 4,
    challenges: [
      "Cross-platform compatibility for iOS and Android",
      "Real-time GPS tracking for outdoor activities",
      "Complex workout algorithm and progress calculations"
    ],
    solutions: [
      "Used React Native with Expo for consistent cross-platform experience",
      "Implemented background location services with battery optimization",
      "Built machine learning model for personalized workout recommendations"
    ],
    highlights: [
      "10K+ downloads on app stores",
      "4.8/5 average rating",
      "Users completed 50K+ workouts"
    ],
    process: [
      { phase: "Research", description: "Market research and user interviews", duration: "2 weeks" },
      { phase: "Prototyping", description: "App prototyping and user testing", duration: "3 weeks" },
      { phase: "Development", description: "Mobile app development and testing", duration: "10 weeks" },
      { phase: "Launch", description: "App store submission and marketing", duration: "2 weeks" }
    ]
  },
  {
    id: "api-gateway",
    title: "API Gateway Service",
    description: "A high-performance API gateway built with Node.js and Redis for microservices architecture. Features include rate limiting, authentication, caching, and load balancing.",
    shortDescription: "High-performance API gateway for microservices",
    category: "Backend Service",
    techStack: ["Node.js", "Redis", "Docker", "Kubernetes", "JWT", "Nginx"],
    status: "completed",
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/nhath24042001/api-gateway",
    featured: false,
    completionDate: "2023",
    client: "Enterprise Client",
    teamSize: 5,
    challenges: [
      "Handling 10K+ requests per second",
      "Implementing complex rate limiting strategies",
      "Zero-downtime deployments"
    ],
    solutions: [
      "Built Redis cluster for distributed rate limiting",
      "Implemented circuit breaker pattern for fault tolerance",
      "Created blue-green deployment strategy"
    ],
    highlights: [
      "99.99% uptime",
      "Reduced response time by 60%",
      "Handled 1M+ daily requests"
    ],
    process: [
      { phase: "Architecture", description: "System design and infrastructure planning", duration: "2 weeks" },
      { phase: "Development", description: "Core gateway functionality", duration: "6 weeks" },
      { phase: "Testing", description: "Load testing and performance optimization", duration: "3 weeks" },
      { phase: "Deployment", description: "Production deployment and monitoring", duration: "1 week" }
    ]
  },
  {
    id: "ai-chatbot",
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot powered by machine learning for customer support. Features natural language processing, sentiment analysis, and integration with multiple platforms.",
    shortDescription: "ML-powered chatbot for customer support",
    category: "AI/ML",
    techStack: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    status: "in-progress",
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/nhath24042001/ai-chatbot",
    featured: false,
    completionDate: "2024",
    client: "E-commerce Company",
    teamSize: 3,
    challenges: [
      "Training accurate NLP models with limited data",
      "Real-time response generation",
      "Multi-language support"
    ],
    solutions: [
      "Used transfer learning with pre-trained BERT models",
      "Implemented streaming responses with WebSockets",
      "Built language detection and translation pipeline"
    ],
    highlights: [
      "85% accuracy in intent recognition",
      "Reduced support tickets by 40%",
      "Supports 5 languages"
    ],
    process: [
      { phase: "Data Collection", description: "Gathering training data and requirements", duration: "3 weeks" },
      { phase: "Model Development", description: "NLP model training and optimization", duration: "8 weeks" },
      { phase: "Integration", description: "API development and platform integration", duration: "4 weeks" },
      { phase: "Testing", description: "User testing and model refinement", duration: "2 weeks" }
    ]
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern portfolio website with animations, responsive design, and interactive elements. Built with Next.js, Framer Motion, and Tailwind CSS.",
    shortDescription: "Modern portfolio with interactive animations",
    category: "Web Application",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    status: "completed",
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/nhath24042001/portfolio",
    liveUrl: "https://nhathuy.dev",
    featured: false,
    completionDate: "2024",
    client: "Personal Project",
    teamSize: 1,
    challenges: [
      "Creating smooth animations without performance impact",
      "Optimizing for all devices and screen sizes",
      "SEO optimization for better visibility"
    ],
    solutions: [
      "Used Framer Motion with optimized animations",
      "Implemented responsive design with mobile-first approach",
      "Added structured data and meta tags for SEO"
    ],
    highlights: [
      "100% Lighthouse performance score",
      "Responsive across all devices",
      "Smooth 60fps animations"
    ],
    process: [
      { phase: "Design", description: "UI/UX design and wireframing", duration: "1 week" },
      { phase: "Development", description: "Frontend development and animations", duration: "3 weeks" },
      { phase: "Optimization", description: "Performance optimization and testing", duration: "1 week" },
      { phase: "Deployment", description: "Production deployment and SEO setup", duration: "1 week" }
    ]
  }
];

const categories = [
  { id: "all", name: "All Projects", icon: <Code className="h-4 w-4" /> },
  { id: "web", name: "Web Applications", icon: <Globe className="h-4 w-4" /> },
  { id: "mobile", name: "Mobile Apps", icon: <Smartphone className="h-4 w-4" /> },
  { id: "backend", name: "Backend Services", icon: <Database className="h-4 w-4" /> },
  { id: "ai", name: "AI/ML", icon: <Zap className="h-4 w-4" /> }
];

const statuses = [
  { id: "all", name: "All Status", icon: <Eye className="h-4 w-4" /> },
  { id: "completed", name: "Completed", icon: <Star className="h-4 w-4" /> },
  { id: "in-progress", name: "In Progress", icon: <Code className="h-4 w-4" /> },
  { id: "featured", name: "Featured", icon: <Star className="h-4 w-4" /> }
];

export function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "web" && project.category === "Web Application") ||
      (selectedCategory === "mobile" && project.category === "Mobile Application") ||
      (selectedCategory === "backend" && project.category === "Backend Service") ||
      (selectedCategory === "ai" && project.category === "AI/ML");
    
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02, y: -5 }
  };

  return (
    <>
      <ProjectsParticles />
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-indigo-900/90" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Animated Code Elements */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 font-mono text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {["<div>", "const", "function", "return", "import", "export", "useState", "useEffect"].map((code, j) => (
                <div key={j} className="mb-2">{code}</div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <Container className="relative z-20 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Code className="h-4 w-4" />
              Projects Gallery
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              My{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Explore my portfolio of innovative projects, from web applications to mobile apps, 
              showcasing my passion for creating impactful digital solutions.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button size="lg" className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <Container className="py-20">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Filters Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Search and Filter Header */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  className="space-y-4 p-6 bg-card/30 backdrop-blur-sm rounded-lg border"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {/* Categories */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="flex items-center gap-2"
                        >
                          {category.icon}
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {statuses.map((status) => (
                        <Button
                          key={status.id}
                          variant={selectedStatus === status.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedStatus(status.id)}
                          className="flex items-center gap-2"
                        >
                          {status.icon}
                          {status.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden hover:shadow-2xl transition-all duration-500"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Project Image/Video */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    {project.videoUrl && (
                      <motion.div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Play className="h-12 w-12 text-white" />
                      </motion.div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={project.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {project.status === "completed" ? "Completed" : 
                         project.status === "in-progress" ? "In Progress" : "Featured"}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.techStack.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Project Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{project.completionDate}</span>
                        </div>
                        {project.teamSize && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{project.teamSize} people</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="flex-1"
                        >
                          View Details
                        </Button>
                        {project.liveUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="space-y-4">
                <Code className="h-16 w-16 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
