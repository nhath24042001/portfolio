"use client";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Code,
  Target,
  Award,
} from "lucide-react";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  icon: React.ReactNode;
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "qkit-fullstack",
    title: "Full Stack Developer",
    company: "QKit Software",
    location: "Ho Chi Minh City, Vietnam",
    period: "2025 - Present",
    description:
      "Leading development of enterprise web applications and mobile solutions. Collaborating with cross-functional teams to deliver high-quality software products.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "GraphQL",
      "JWT",
    ],
    achievements: [
      "Developed and maintained 5+ production applications serving 10,000+ users",
      "Improved application performance by 40% through optimization and caching strategies",
      "Mentored 3 junior developers and conducted code reviews",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
    ],
    icon: <Building2 className="h-6 w-6" />,
    color: "#3B82F6",
  },
  {
    id: "qkit-junior",
    title: "Junior Frontend Developer",
    company: "QKit Software",
    location: "Ho Chi Minh City, Vietnam",
    period: "2023 - 2024",
    description:
      "Developed responsive web applications and mobile-first interfaces. Collaborated with design and backend teams to deliver user-centric solutions.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Angular",
      "Vue.js",
      "Tailwind CSS",
    ],
    achievements: [
      "Improved user engagement by 25% through UI/UX improvements",
      "Achieved 95%+ accessibility score",
      "Built 10+ reusable component libraries",
    ],
    icon: <Code className="h-6 w-6" />,
    color: "#10B981",
  },
  {
    id: "qkit-fresher",
    title: "Fresher Frontend Developer",
    company: "QKit Software",
    location: "Ho Chi Minh City, Vietnam",
    period: "Feb 2022 - Dec 2022",
    description:
      "Started career building websites and small applications. Learned modern development practices and tools.",
    technologies: [
      "JavaScript",
      "HTML/CSS",
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    achievements: [
      "Learned version control and team collaboration",
      "Developed strong problem-solving skills",
      "Completed 20+ client projects",
    ],
    icon: <Target className="h-6 w-6" />,
    color: "#F59E0B",
  },
];

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Container className="py-20">
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.h2
            className="text-3xl md:text-4xl font-bold p-4 rounded-lg hover:bg-muted/20 transition-colors cursor-default inline-block"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Professional Experience
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto p-4 rounded-lg hover:bg-muted/10 transition-colors cursor-default"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            My journey in software development, from academic projects to
            professional roles. Each experience has shaped my skills and passion
            for creating impactful solutions.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div className="max-w-6xl mx-auto" variants={itemVariants}>
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row gap-8 items-start"
              >
                {/* Year/Period - Left Side */}
                <motion.div
                  className="lg:w-1/4 flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="sticky top-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: experience.color }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {experience.icon}
                        </motion.div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {experience.period.split(' - ')[0]}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {experience.period.split(' - ')[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content - Right Side */}
                <motion.div
                  className="lg:w-3/4 flex-grow"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <motion.div
                      className="space-y-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="space-y-2">
                        <motion.h3
                          className="text-xl font-bold text-foreground p-2 rounded-md hover:bg-muted/30 transition-colors cursor-default inline-block"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {experience.title}
                        </motion.h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <motion.div
                            className="flex items-center gap-1 p-2 rounded-md hover:bg-muted/30 transition-colors cursor-default"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Building2 className="h-4 w-4" />
                            <span>{experience.company}</span>
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-1 p-2 rounded-md hover:bg-muted/30 transition-colors cursor-default"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <MapPin className="h-4 w-4" />
                            <span>{experience.location}</span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Description */}
                      <motion.p
                        className="text-muted-foreground leading-relaxed p-3 rounded-md hover:bg-muted/20 transition-colors cursor-default"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        {experience.description}
                      </motion.p>

                      {/* Technologies */}
                      <div className="space-y-2">
                        <motion.h4
                          className="font-semibold text-foreground p-2 rounded-md hover:bg-muted/30 transition-colors cursor-default inline-block"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          Technologies Used:
                        </motion.h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <motion.div
                              key={tech}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-xs cursor-default"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <motion.h4
                          className="font-semibold text-foreground p-2 rounded-md hover:bg-muted/30 transition-colors cursor-default inline-block"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          Key Achievements:
                        </motion.h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors cursor-default"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="text-center space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-primary">3+</div>
            <div className="text-sm text-muted-foreground">
              Years Experience
            </div>
          </motion.div>
          <motion.div
            className="text-center space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">
              Projects Completed
            </div>
          </motion.div>
          <motion.div
            className="text-center space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </motion.div>
          <motion.div
            className="text-center space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">
              Client Satisfaction
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Container>
  );
}
