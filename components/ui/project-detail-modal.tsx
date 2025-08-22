"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X, 
  ExternalLink, 
  Github, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Calendar,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Target,
  Zap,
  Award
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

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsVideoPlaying(false);
      setIsMuted(false);
    }
  }, [isOpen]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-card rounded-xl border overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Left Side - Video/Image */}
              <div className="lg:w-1/2 relative">
                {project.videoUrl ? (
                  <div className="relative h-64 lg:h-full bg-black">
                    <video
                      ref={videoRef}
                      src={project.videoUrl}
                      className="w-full h-full object-cover"
                      muted={isMuted}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={toggleVideo}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={toggleMute}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 lg:h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Star className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Project Preview</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold">{project.title}</h2>
                        <p className="text-muted-foreground">{project.shortDescription}</p>
                      </div>
                      <Badge
                        variant={project.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {project.status === "completed" ? "Completed" : 
                         project.status === "in-progress" ? "In Progress" : "Featured"}
                      </Badge>
                    </div>

                    {/* Project Stats */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Completed: {project.completionDate}</span>
                      </div>
                      {project.client && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Client: {project.client}</span>
                        </div>
                      )}
                      {project.teamSize && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Team: {project.teamSize} people</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">About This Project</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-500" />
                        Challenges
                      </h3>
                      <ul className="space-y-2">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5 text-green-500" />
                        Solutions
                      </h3>
                      <ul className="space-y-2">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      Key Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Development Process */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      Development Process
                    </h3>
                    <div className="space-y-3">
                      {project.process.map((phase, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{index + 1}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <p className="text-sm text-muted-foreground">{phase.description}</p>
                            <p className="text-xs text-muted-foreground">{phase.duration}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    {project.liveUrl && (
                      <Button asChild className="flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" asChild className="flex-1">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

