"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/types";
import BlogCard from "@/components/ui/BlogCard";
import BlogCardSkeleton from "@/components/ui/BlogCardSkeleton";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import CategoryDropdown from "@/components/ui/CategoryDropdown";
import Button from "@/components/ui/Button";

const categories = [
  "All",
  "Luxury Cars & Model Guides",
  "Women & Mobility",
  "Guides",
];

const ITEMS_PER_PAGE = 6;

const SPACING = {
  sectionGap: "gap-2 lg:gap-12 xl:gap-14",
  gridGap: "gap-6 sm:gap-8 lg:gap-10 xl:gap-12",
  sectionPadding: "pt-12 sm:pt-16",
  sectionPaddingBottom: "pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28",
  containerPadding: "pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28",
  emptyStatePadding: "py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
} as const;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // Reset to page 1 when category changes
      setCurrentPage(1);
      setLoading(true);

      // Fetch all posts without pagination by setting a high perPage value
      const url =
        selectedCategory === "All"
          ? "/api/blog?perPage=1000&page=1"
          : `/api/blog?category=${encodeURIComponent(
              selectedCategory
            )}&perPage=1000&page=1`;

      const response = await fetch(url);
      const data = await response.json();
      // Use all filtered posts, not just the paginated ones
      // We need to fetch all posts to do client-side pagination
      setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, [selectedCategory]);

  // Pagination calculations
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const hasMorePages = currentPage < totalPages;

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Header Section */}
      <section className={SPACING.sectionPadding}>
        <Container>
          <div
            className={`flex flex-col lg:flex-row lg:justify-between lg:items-end ${SPACING.sectionGap} mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16`}
          >
            {/* Left: SectionHeader and Headline */}
            <div className="flex-1 w-full lg:w-auto">
              <SectionHeader text="Blog Posts" />
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] 2xl:text-[68px] font-medium text-pure leading-[1.2]">
                  Our Blog Posts
                </h1>
              </FadeIn>
            </div>

            {/* Right: Category Filter */}
            <FadeIn
              delay={0.2}
              direction="right"
              className="w-full lg:w-auto lg:ml-auto lg:shrink-0 mt-4 lg:mt-0"
            >
              <CategoryDropdown
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className={SPACING.containerPadding}>
        <Container>
          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6 gap-y-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className={`text-center ${SPACING.emptyStatePadding}`}>
              <p className="text-slate text-sm sm:text-base md:text-lg">
                No posts found in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6 gap-y-10">
                {paginatedPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Bottom Right - Next Page */}
              {hasMorePages && (
                <FadeIn delay={0.2} direction="up">
                  <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-end">
                    <Button
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      variant="rounded-outline"
                      showArrow={true}
                      className="text-pure border-pure w-3/5 md:w-1/4"
                    >
                      Next Page
                    </Button>
                  </div>
                </FadeIn>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
