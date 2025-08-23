"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { 
  getAllPosts, 
  getCategories, 
  getAllTags,
  type BlogPost 
} from "@/lib/blog";

const blogPosts = getAllPosts();
const categories = ["All", ...getCategories()];
const allTags = getAllTags();

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

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
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Blog &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge, experiences, and insights about web development, 
            programming, and the latest technologies.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4" />
              Filter by tags:
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div variants={itemVariants} className="space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                      {/* Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-muted-foreground text-sm">
                          [Blog Image]
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Category */}
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>

                        {/* Title */}
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center space-y-6 p-8 rounded-lg border border-border bg-card/50"
        >
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Get notified when I publish new articles about web development and programming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
}
