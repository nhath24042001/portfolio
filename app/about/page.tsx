import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Code,
  Cloud,
  Award,
  BookOpen,
  Globe,
  Server,
  Zap,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Heart,
} from "lucide-react";
import Link from "next/link";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "QKit Software",
    period: "2025 - Present",
    description:
      "Building scalable web applications using React, Node.js, and cloud technologies",
    technologies: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "GraphQL",
      "JWT",
      "REST APIs",
    ],
    achievements: [
      "Developed and maintained 5+ production applications serving 10,000+ users",
      "Improved application performance by 40% through optimization and caching strategies",
      "Mentored 3 junior developers and conducted code reviews",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
    ],
  },
  {
    title: "Junior Frontend Developer",
    company: "QKit Software",
    period: "2023 - 2024",
    description:
      "Developed responsive web applications and mobile-first interfaces. Collaborated with design and backend teams.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Angular",
      "Vue.js",
    ],
    achievements: [
      "Improved user engagement by 25% through UI/UX improvements",
      "Achieved 95%+ accessibility score",
      "Built 10+ reusable component libraries",
    ],
  },
  {
    title: "Fresher Frontend Developer",
    company: "QKit Software",
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
  },
];

const education = [
  {
    degree: "Bachelor of Engineering",
    school: "UIT - University of Information Technology, VNU-HCM",
    period: "2019 - 2023",
    description:
      "Focused on software engineering, algorithms, and web development. Graduated with honors.",
    relevantCourses: [
      "Data Structures",
      "Web Development",
      "Database Systems",
      "Software Engineering",
    ],
  },
];

const skills = {
  frontend: [
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "TypeScript",
    "Tailwind CSS",
    "Redux",
    "GraphQL",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "TypeORM",
    "JWT",
    "REST APIs",
  ],
  devops: ["Git", "Docker"],
  tools: ["VS Code", "Postman", "Figma", "Jira", "Slack"],
};

const interests = [
  "Open Source Contribution",
  "Tech Blogging",
  "Mentoring Junior Developers",
  "Attending Tech Conferences",
  "Learning New Technologies",
  "Building Side Projects",
];

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              <User className="h-4 w-4 mr-2" />
              About Me
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nhật Huy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A passionate Full Stack Developer with 3+ years of experience
              building modern web applications. I love turning complex problems
              into simple, beautiful, and intuitive solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/projects">View My Work</Link>
            </Button>
          </div>
        </section>

        {/* Personal Info */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Who I Am</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a dedicated Full Stack Developer based in Vietnam,
                passionate about creating exceptional digital experiences. With
                a strong foundation in both frontend and backend development, I
                specialize in building scalable, performant applications that
                solve real-world problems.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a
                deep passion for clean code, user experience, and continuous
                learning. I believe in writing code that not only works but is
                maintainable, scalable, and enjoyable to work with.
              </p>
              <p>
                When I&apos;m not coding, you can find me contributing to
                open-source projects, sharing knowledge through tech blogs, or
                exploring new technologies to stay ahead of the curve.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border p-6 space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Ho Chi Minh City, Vietnam</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Available for remote work</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Engineering Graduate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>3+ years experience</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform"
              >
                <Link
                  href="https://github.com/nhath24042001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform"
              >
                <Link
                  href="https://www.linkedin.com/in/huy-nguy%E1%BB%85n-v%C4%83n-nh%E1%BA%ADt-2242b7273/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform"
              >
                <Link href="mailto:nhath24042001@gmail.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Professional Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My journey in software development, from junior developer to
              full-stack specialist.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="secondary">{exp.period}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Education</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My academic background and continuous learning journey.
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.school}</p>
                  </div>
                  <Badge variant="secondary">{edu.period}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{edu.description}</p>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Relevant Courses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.relevantCourses.map((course) => (
                      <Badge key={course} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Overview */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Technical Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across the full
              stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div
                key={category}
                className="bg-card/50 backdrop-blur-sm rounded-xl border p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2 capitalize">
                  {category === "frontend" && <Globe className="h-5 w-5" />}
                  {category === "backend" && <Server className="h-5 w-5" />}
                  {category === "devops" && <Cloud className="h-5 w-5" />}
                  {category === "tools" && <Zap className="h-5 w-5" />}
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Interests & Activities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond coding, here are some things that keep me motivated and
              growing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border p-4 text-center hover:shadow-lg transition-all duration-300"
              >
                <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-medium">{interest}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 bg-card/30 backdrop-blur-sm rounded-xl border p-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Let&apos;s Work Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always excited to work on new projects and collaborate
              with amazing teams. Let&apos;s discuss how we can bring your ideas
              to life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/projects">View My Work</Link>
            </Button>
          </div>
        </section>
      </div>
    </Container>
  );
}
