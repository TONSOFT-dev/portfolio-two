"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import FadeIn from "@/components/animations/FadeIn";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
  categoryClassName?: string;
}

export default function BlogCard({
  post,
  index = 0,
  className = "",
  categoryClassName = "",
}: BlogCardProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!badgeRef.current || !cardRef.current) return;

      const badge = badgeRef.current;
      const card = cardRef.current;

      // Initial entrance animation - simple scale
      gsap.set(badge, {
        scale: 0,
        opacity: 0,
      });

      // Entrance animation with delay based on index
      gsap.to(badge, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.1 + 0.1,
        ease: "back.out(1.4)",
      });

      // Simple zoom animation on card hover
      const handleCardMouseEnter = () => {
        gsap.to(badge, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleCardMouseLeave = () => {
        gsap.to(badge, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      // Attach events to card
      card.addEventListener("mouseenter", handleCardMouseEnter);
      card.addEventListener("mouseleave", handleCardMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleCardMouseEnter);
        card.removeEventListener("mouseleave", handleCardMouseLeave);
      };
    },
    { scope: cardRef, dependencies: [index] }
  );

  return (
    <FadeIn delay={index * 0.1} direction="up" className={className}>
      <Link
        ref={cardRef}
        href={`/blog/${post.slug}`}
        className="group block"
        data-cursor-hover
      >
        <div className="relative overflow-hidden rounded-2xl bg-coal h-[240px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[320px]">
          {/* Blog Image */}
          <div className="relative w-full h-full" data-cursor-hover>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-cursor-hover
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#08080540] to-[#08080522]" />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 lg:p-5 xl:p-5 bg-linear-to-t from-noir/90 via-noir/50 to-transparent">
              {/* Top: Category Badge */}
              <div className="flex items-start justify-end">
                <div
                  ref={badgeRef}
                  className={cn(
                    "px-3 py-1 sm:px-4 lg:px-5 xl:px-5 rounded-full transition-[max-width] duration-500 ease-in-out truncate max-w-[240px] sm:max-w-[140px] md:max-w-full group-hover:max-w-full relative overflow-hidden cursor-default will-change-transform",
                    categoryClassName
                  )}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(8, 8, 5, 0.85) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(8, 8, 5, 0.85) 100%), linear-gradient(135deg, rgba(212, 212, 20, 0.4) 0%, rgba(212, 212, 20, 0.25) 100%)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(212, 212, 20, 0.5)",
                    boxShadow:
                      "0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(212, 212, 20, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Dark base layer for better visibility */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "rgba(8, 8, 5, 0.6)",
                    }}
                    aria-hidden="true"
                  />
                  {/* Glass shine effect */}
                  <span
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212, 212, 20, 0.3) 0%, transparent 50%, rgba(212, 212, 20, 0.2) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  {/* Content */}
                  <span
                    className="relative z-10 text-sm md:text-base lg:text-lg xl:text-lg leading-[16px] sm:leading-[18px] md:leading-[24px] lg:leading-[27px] xl:leading-[27px] font-normal truncate block"
                    style={{
                      color: "#d4d414",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      fontWeight: "500",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Bottom: Title */}
              <div className="flex flex-col">
                <h3 className="text-pure text-lg sm:text-xl lg:text-2xl xl:text-2xl leading-[1.3] font-normal line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
