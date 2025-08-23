"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, User, Tag } from "lucide-react";
import Link from "next/link";
import { type BlogPost } from "@/lib/blog";

interface BlogPostContentProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export function BlogPostContent({ post, allPosts }: BlogPostContentProps) {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="mb-8">
        <Button variant="ghost" asChild className="group">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </Button>
      </motion.div>

      {/* Article Header */}
      <motion.article variants={itemVariants} className="space-y-8">
        {/* Category and Tags */}
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Reading time</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
          <div className="text-muted-foreground text-lg">
            [Featured Image: {post.title}]
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex items-center gap-4 pt-8 border-t border-border">
          <Tag className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="flex items-center gap-4 pt-8 border-t border-border">
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Share this article:</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              Copy Link
            </Button>
          </div>
        </div>
      </motion.article>

      {/* Related Articles */}
      <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {allPosts
            .filter(p => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
