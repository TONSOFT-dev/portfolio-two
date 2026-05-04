"use client";

import { blogPosts } from "@/lib/data/blog-posts";
import BlogCard from "@/components/ui/BlogCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

export default function BlogPreviewSection() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-noir/50">
      <Container>
        <div className="w-full text-center mb-12 sm:mb-16 md:mb-20">
          <SectionHeader text="Blog Posts" center />
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[46px] font-medium text-pure leading-[1.3]">
              Engage with Premium Rental Posts
            </h2>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12 group/list">
          {recentPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              className={`w-full lg:w-auto lg:transition-[flex-grow] lg:duration-500 lg:ease-[cubic-bezier(0.25,0.75,0.5,1.25)] lg:min-w-0 group-hover/list:lg:flex-1 lg:hover:flex-[1.5]! ${
                index === 0 ? "lg:flex-[1.5]" : "lg:flex-1"
              }`}
              categoryClassName={`max-w-[240px] sm:max-w-[140px] md:max-w-full group-hover:max-w-full ${
                index === 0
                  ? "lg:max-w-full group-hover/list:lg:max-w-[280px] lg:group-hover:max-w-full!"
                  : "lg:max-w-[180px] xl:max-w-[280px]"
              }`}
            />
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="text-center">
            <Button
              href="/blog"
              variant="outline"
              className="text-solis border-solis hover:bg-transparent hover:text-solis w-full md:w-1/2 lg:w-1/4 text-sm sm:text-base md:text-lg lg:text-lg"
              arrowBgClassName="bg-solis"
            >
              See All Posts
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
