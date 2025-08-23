"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Container } from "@/components/layout/Container";
import { Github, Linkedin, Mail, MapPin, Phone, Send, MessageSquare, User, Building } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "nhath24042001@gmail.com",
      href: "mailto:nhath24042001@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Ho Chi Minh City, Vietnam",
      href: "#",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+84 123 456 789",
      href: "tel:+84123456789",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/nhath24042001",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/huy-nguy%E1%BB%85n-v%C4%83n-nh%E1%BA%ADt-2242b7273/",
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      href: "mailto:nhath24042001@gmail.com",
      icon: Mail,
      color: "hover:text-red-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container className="py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-8 contact-form-enter">
            <div>
              <h2 className="text-2xl font-bold mb-4">Send me a message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">
                  Company
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Your company (optional)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject *
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="message">
                    Message *
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {formData.message.length}/1000
                  </span>
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={1000}
                    className="pl-10 resize-none"
                    placeholder="Tell me about your project or question..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full group"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8 contact-info-enter">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
              <p className="text-muted-foreground">
                Here are some other ways to reach me. I&apos;m always open to discussing new projects, 
                creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors contact-card-hover"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{info.title}</h3>
                    <a
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    asChild
                    className={`h-12 w-12 transition-all hover:scale-110 ${social.color}`}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-lg border border-border bg-gradient-to-r from-green-500/10 to-blue-500/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold">Currently Available</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                I&apos;m currently accepting new projects and opportunities. 
                Let&apos;s discuss how we can work together!
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center space-y-6 p-8 rounded-lg border border-border bg-card/50"
        >
          <h2 className="text-2xl font-bold">What I can help you with</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Web Development</h3>
              <p className="text-sm text-muted-foreground">
                Full-stack web applications with modern technologies
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">UI/UX Design</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, accessible, and user-friendly interfaces
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Consulting</h3>
              <p className="text-sm text-muted-foreground">
                Technical guidance and project planning
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
}
