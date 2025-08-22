"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillsParticles } from "@/components/effects/SkillsParticles";
import { 
  Code, 
  Database, 
  Cloud, 
  Zap, 
  Shield, 
  Layers, 
  Globe, 
  Smartphone,
  Cpu,
  Palette,
  GitBranch,
  Server,
  Terminal,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Star,
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
  color: string;
  description: string;
  experience: string;
  projects: number;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Globe className="h-6 w-6" />,
    color: "#3B82F6",
    description: "Modern web interfaces and user experiences",
    skills: [
      {
        id: "react",
        name: "React",
        category: "Frontend",
        level: 95,
        icon: <Code className="h-5 w-5" />,
        color: "#61DAFB",
        description: "Advanced React patterns, hooks, and performance optimization",
        experience: "3+ years",
        projects: 25
      },
      {
        id: "nextjs",
        name: "Next.js",
        category: "Frontend",
        level: 90,
        icon: <Layers className="h-5 w-5" />,
        color: "#000000",
        description: "Full-stack React framework with SSR and SSG",
        experience: "2+ years",
        projects: 15
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "Frontend",
        level: 88,
        icon: <Code className="h-5 w-5" />,
        color: "#3178C6",
        description: "Type-safe JavaScript development",
        experience: "2+ years",
        projects: 20
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        category: "Frontend",
        level: 92,
        icon: <Palette className="h-5 w-5" />,
        color: "#06B6D4",
        description: "Utility-first CSS framework",
        experience: "2+ years",
        projects: 18
      }
    ]
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: <Server className="h-6 w-6" />,
    color: "#10B981",
    description: "Server-side logic and API development",
    skills: [
      {
        id: "nodejs",
        name: "Node.js",
        category: "Backend",
        level: 85,
        icon: <Cpu className="h-5 w-5" />,
        color: "#339933",
        description: "JavaScript runtime for server-side development",
        experience: "3+ years",
        projects: 20
      },
      {
        id: "express",
        name: "Express.js",
        category: "Backend",
        level: 82,
        icon: <Server className="h-5 w-5" />,
        color: "#000000",
        description: "Fast, unopinionated web framework",
        experience: "2+ years",
        projects: 15
      },
      {
        id: "graphql",
        name: "GraphQL",
        category: "Backend",
        level: 75,
        icon: <Zap className="h-5 w-5" />,
        color: "#E10098",
        description: "Query language for APIs",
        experience: "1+ year",
        projects: 8
      }
    ]
  },
  {
    id: "database",
    name: "Database & Storage",
    icon: <Database className="h-6 w-6" />,
    color: "#F59E0B",
    description: "Data management and storage solutions",
    skills: [
      {
        id: "postgresql",
        name: "PostgreSQL",
        category: "Database",
        level: 80,
        icon: <Database className="h-5 w-5" />,
        color: "#336791",
        description: "Advanced open-source relational database",
        experience: "2+ years",
        projects: 12
      },
      {
        id: "mongodb",
        name: "MongoDB",
        category: "Database",
        level: 75,
        icon: <Database className="h-5 w-5" />,
        color: "#47A248",
        description: "NoSQL document database",
        experience: "1+ year",
        projects: 8
      },
      {
        id: "redis",
        name: "Redis",
        category: "Database",
        level: 70,
        icon: <Zap className="h-5 w-5" />,
        color: "#DC382D",
        description: "In-memory data structure store",
        experience: "1+ year",
        projects: 6
      }
    ]
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    icon: <Cloud className="h-6 w-6" />,
    color: "#8B5CF6",
    description: "Deployment, infrastructure, and cloud services",
    skills: [
      {
        id: "aws",
        name: "AWS",
        category: "Cloud",
        level: 78,
        icon: <Cloud className="h-5 w-5" />,
        color: "#FF9900",
        description: "Amazon Web Services cloud platform",
        experience: "2+ years",
        projects: 10
      },
      {
        id: "docker",
        name: "Docker",
        category: "DevOps",
        level: 80,
        icon: <Shield className="h-5 w-5" />,
        color: "#2496ED",
        description: "Containerization platform",
        experience: "2+ years",
        projects: 12
      },
      {
        id: "git",
        name: "Git",
        category: "DevOps",
        level: 90,
        icon: <GitBranch className="h-5 w-5" />,
        color: "#F05032",
        description: "Version control system",
        experience: "3+ years",
        projects: 30
      }
    ]
  }
];

const certifications = [
  {
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    icon: <Award className="h-5 w-5" />,
    color: "#FF9900"
  },
  {
    name: "MongoDB Developer",
    issuer: "MongoDB University",
    date: "2022",
    icon: <BookOpen className="h-5 w-5" />,
    color: "#47A248"
  },
  {
    name: "React Advanced Patterns",
    issuer: "Frontend Masters",
    date: "2023",
    icon: <Star className="h-5 w-5" />,
    color: "#61DAFB"
  }
];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
    hover: { scale: 1.05, y: -5 }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({ width: `${level}%` })
  };

  return (
    <>
      <SkillsParticles />
      <Container className="py-20">
        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="text-center space-y-6" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Target className="h-4 w-4" />
              Skills & Expertise
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Technical{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skills
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A comprehensive overview of my technical expertise, from frontend frameworks 
              to backend systems and cloud infrastructure. Continuously learning and 
              expanding my skill set to deliver cutting-edge solutions.
            </motion.p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  border: selectedCategory === category.id ? `2px solid ${category.color}` : "2px solid transparent"
                }}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {skillCategories
                .find(cat => cat.id === selectedCategory)
                ?.skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className="group relative bg-card/50 backdrop-blur-sm rounded-xl border p-6 hover:shadow-2xl transition-all duration-300"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onHoverStart={() => setHoveredSkill(skill.id)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Skill Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${skill.color}20` }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div style={{ color: skill.color }}>
                          {skill.icon}
                        </div>
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-sm text-muted-foreground">{skill.experience}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Proficiency</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          variants={progressVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate="visible"
                          transition={{ duration: 1.5, delay: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {skill.description}
                    </p>

                    {/* Projects Count */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>{skill.projects} projects completed</span>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredSkill === skill.id ? 1 : 0 }}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Certifications Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Certifications & Achievements</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional certifications and achievements that validate my expertise 
                and commitment to continuous learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="bg-card/50 backdrop-blur-sm rounded-xl border p-6 text-center group hover:shadow-xl transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 mx-auto"
                    style={{ backgroundColor: `${cert.color}20` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ color: cert.color }}>
                      {cert.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="font-semibold mb-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                  <Badge variant="secondary" className="text-xs">
                    {cert.date}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            {[
              { label: "Skills Mastered", value: "15+", icon: <Target className="h-6 w-6" /> },
              { label: "Projects Completed", value: "50+", icon: <Code className="h-6 w-6" /> },
              { label: "Years Experience", value: "3+", icon: <TrendingUp className="h-6 w-6" /> },
              { label: "Certifications", value: "5+", icon: <Award className="h-6 w-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center space-y-2 p-6 rounded-xl bg-card/30 backdrop-blur-sm border hover:bg-card/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div className="text-center space-y-6" variants={itemVariants}>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Let&apos;s discuss how my skills and expertise can help bring your project to life.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Start a Project
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                View My Work
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
}
