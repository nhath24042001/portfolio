import { Container } from "@/components/layout/Container";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { BlogPostContent } from "./BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-16">
      <BlogPostContent post={post} allPosts={allPosts} />
    </Container>
  );
}
