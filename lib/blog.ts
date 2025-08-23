export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  featured?: boolean;
  status: 'draft' | 'published';
}

// Sample blog data - In production, this would come from a CMS or database
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 15",
    excerpt: "Explore the latest features in Next.js 15 and learn how to build scalable, performant web applications with the new App Router and Server Components.",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 15 brings exciting new features that make building modern web applications easier and more efficient than ever before. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your projects.</p>
      
      <h2>What's New in Next.js 15</h2>
      <p>The latest version introduces several groundbreaking features:</p>
      <ul>
        <li><strong>Improved App Router:</strong> Enhanced routing capabilities with better performance</li>
        <li><strong>Server Components:</strong> Reduced client-side JavaScript for faster loading</li>
        <li><strong>Streaming:</strong> Progressive rendering for better user experience</li>
        <li><strong>Enhanced TypeScript Support:</strong> Better type safety and developer experience</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js 15 project, run:</p>
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind --app</code></pre>
      
      <h2>App Router Deep Dive</h2>
      <p>The App Router is the new recommended routing system that provides:</p>
      <ul>
        <li>File-system based routing</li>
        <li>Built-in layouts and nested routes</li>
        <li>Server-first approach</li>
        <li>Automatic code splitting</li>
      </ul>
      
      <h2>Server Components</h2>
      <p>Server Components allow you to write components that run on the server, reducing the JavaScript bundle sent to the client. This results in:</p>
      <ul>
        <li>Faster page loads</li>
        <li>Better SEO</li>
        <li>Reduced client-side complexity</li>
        <li>Direct database access</li>
      </ul>
      
      <h2>Performance Optimizations</h2>
      <p>Next.js 15 includes several performance improvements:</p>
      <ul>
        <li>Automatic image optimization</li>
        <li>Font optimization</li>
        <li>Built-in caching strategies</li>
        <li>Streaming and progressive rendering</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Next.js 15 represents a significant step forward in the React ecosystem. With its focus on performance, developer experience, and modern web standards, it's the perfect choice for building scalable web applications.</p>
    `,
    author: "Nhật Huy",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "TypeScript", "Web Development"],
    image: "/images/blog/nextjs-15.jpg",
    slug: "building-modern-web-applications-nextjs-15",
    featured: true,
    status: "published"
  },
  {
    id: "2",
    title: "Mastering TypeScript for Better Code Quality",
    excerpt: "Learn advanced TypeScript techniques to write more maintainable and type-safe code. From generics to utility types, we'll cover everything you need to know.",
    content: `
      <h2>Why TypeScript Matters</h2>
      <p>TypeScript has become the standard for building large-scale JavaScript applications. Its type system helps catch errors early and provides better developer experience.</p>
      
      <h2>Advanced Type Features</h2>
      <p>Let's explore some advanced TypeScript features:</p>
      
      <h3>Generics</h3>
      <p>Generics allow you to create reusable components that work with multiple types:</p>
      <pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}</code></pre>
      
      <h3>Utility Types</h3>
      <p>TypeScript provides powerful utility types:</p>
      <ul>
        <li><code>Partial&lt;T&gt;</code> - Makes all properties optional</li>
        <li><code>Required&lt;T&gt;</code> - Makes all properties required</li>
        <li><code>Pick&lt;T, K&gt;</code> - Select specific properties</li>
        <li><code>Omit&lt;T, K&gt;</code> - Exclude specific properties</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these practices for better TypeScript code:</p>
      <ul>
        <li>Use strict mode</li>
        <li>Prefer interfaces over types for object shapes</li>
        <li>Use union types for better type safety</li>
        <li>Leverage type guards for runtime checks</li>
      </ul>
    `,
    author: "Nhật Huy",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Programming", "Best Practices"],
    image: "/images/blog/typescript-mastery.jpg",
    slug: "mastering-typescript-better-code-quality",
    featured: true,
    status: "published"
  },
  {
    id: "3",
    title: "The Future of Frontend Development in 2024",
    excerpt: "Discover the latest trends and technologies shaping the future of frontend development, from AI-powered tools to new frameworks and methodologies.",
    content: "Full content here...",
    author: "Nhật Huy",
    publishedAt: "2024-01-05",
    readTime: "10 min read",
    category: "Technology",
    tags: ["Frontend", "AI", "Trends", "Technology"],
    image: "/images/blog/frontend-future.jpg",
    slug: "future-frontend-development-2024",
    status: "published"
  },
  {
    id: "4",
    title: "Optimizing React Performance: A Complete Guide",
    excerpt: "Learn proven techniques to optimize React applications for better performance, including code splitting, memoization, and bundle optimization.",
    content: "Full content here...",
    author: "Nhật Huy",
    publishedAt: "2023-12-28",
    readTime: "15 min read",
    category: "Web Development",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    image: "/images/blog/react-performance.jpg",
    slug: "optimizing-react-performance-complete-guide",
    status: "published"
  },
  {
    id: "5",
    title: "Building Accessible Web Applications",
    excerpt: "Learn how to create web applications that are accessible to all users, including those with disabilities. From ARIA labels to keyboard navigation.",
    content: "Full content here...",
    author: "Nhật Huy",
    publishedAt: "2023-12-20",
    readTime: "11 min read",
    category: "Web Development",
    tags: ["Accessibility", "WCAG", "Web Development", "UX"],
    image: "/images/blog/accessibility.jpg",
    slug: "building-accessible-web-applications",
    status: "published"
  },
  {
    id: "6",
    title: "State Management in Modern React Applications",
    excerpt: "Compare different state management solutions for React applications, from Context API to Redux Toolkit and Zustand.",
    content: "Full content here...",
    author: "Nhật Huy",
    publishedAt: "2023-12-15",
    readTime: "13 min read",
    category: "Programming",
    tags: ["React", "State Management", "Redux", "Context API"],
    image: "/images/blog/state-management.jpg",
    slug: "state-management-modern-react-applications",
    status: "published"
  }
];

// Utility functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.filter(post => post.status === 'published');
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.status === 'published');
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured && post.status === 'published');
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.status === 'published');
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category && post.status === 'published');
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.includes(tag) && post.status === 'published'
  );
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.status === 'published' && (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
}

export function getCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

export function getAllTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap(post => post.tags)));
}

// Function to add a new blog post
export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const newPost: BlogPost = {
    ...post,
    id: (blogPosts.length + 1).toString(),
  };
  
  // In a real application, you would save this to a database
  // For now, we'll just add it to the array
  blogPosts.push(newPost);
  
  return newPost;
}

// Function to generate a slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Function to calculate read time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}
