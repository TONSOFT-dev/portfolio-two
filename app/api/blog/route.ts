import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/data/blog-posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "6");

  let filteredPosts = blogPosts;

  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Sort by date (newest first)
  filteredPosts = filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Pagination
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return NextResponse.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    perPage,
    totalPages: Math.ceil(filteredPosts.length / perPage),
  });
}
