import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog-posts";
import { BlogPost } from "@/types";
import Container from "@/components/ui/Container";
import { Metadata } from "next";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostImage from "@/components/blog/BlogPostImage";
import BlogPostContent from "@/components/blog/BlogPostContent";
import RelatedPostsSection from "@/components/blog/RelatedPostsSection";
import ScrollBackgroundAnimation from "@/components/animations/ScrollBackgroundAnimation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Falconics Pink Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

async function getPostData(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find((p) => p.slug === slug);
  return post || null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 relative">
      {/* Scroll-triggered background animation */}
      <ScrollBackgroundAnimation
        colors={[
          "linear-gradient(135deg, #080805 0%, #0f0f0c 25%, #1a1a1a 50%, #0f0f0c 75%, #080805 100%)",
          "linear-gradient(135deg, #1a1a1a 0%, #252520 25%, #2a2a2a 50%, #252520 75%, #1a1a1a 100%)",
          "linear-gradient(135deg, #0f0f0c 0%, #1a1a1a 25%, #222220 50%, #1a1a1a 75%, #0f0f0c 100%)",
          "linear-gradient(135deg, #080805 0%, #1a1a1a 50%, #080805 100%)",
        ]}
        startPosition={0}
        endPosition={100}
        duration={1.5}
        ease="power2.out"
      />

      <article className="relative z-10 bg-transparent">
        <section className="py-12 sm:py-16">
          <Container className="lg:max-w-[720px] px-5 lg:px-0">
            <BlogPostHeader post={post} />
            <BlogPostImage post={post} />
            <BlogPostContent content={post.content} />
          </Container>
        </section>
      </article>

      <div className="relative z-10">
        <RelatedPostsSection relatedPosts={relatedPosts} />
      </div>
    </div>
  );
}
