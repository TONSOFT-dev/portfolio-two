"use client";

import Image from "next/image";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { Clock, User } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!badgeRef.current) return;

      const badge = badgeRef.current;

      // Initial 3D entrance animation
      gsap.set(badge, {
        scale: 0,
        opacity: 0,
        rotationX: -90,
        z: -50,
        transformPerspective: 1000,
      });

      // Entrance animation
      gsap.to(badge, {
        scale: 1,
        opacity: 1,
        rotationX: 0,
        z: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "back.out(1.7)",
      });

      // Mouse move 3D tilt effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!badge) return;
        const rect = badge.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateY = (mouseX / rect.width) * 12;
        const rotateX = -(mouseY / rect.height) * 12;

        gsap.to(badge, {
          rotationY: rotateY,
          rotationX: rotateX,
          z: Math.abs(rotateY) * 0.8,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      // Hover effects
      const handleMouseEnter = () => {
        gsap.to(badge, {
          scale: 1.05,
          y: -3,
          z: 15,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(badge, {
          scale: 1,
          y: 0,
          z: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      badge.addEventListener("mouseenter", handleMouseEnter);
      badge.addEventListener("mouseleave", handleMouseLeave);
      badge.addEventListener("mousemove", handleMouseMove);

      return () => {
        badge.removeEventListener("mouseenter", handleMouseEnter);
        badge.removeEventListener("mouseleave", handleMouseLeave);
        badge.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: badgeRef }
  );

  return (
    <div className="text-center">
      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <span
            ref={badgeRef}
            className="inline-block px-4 py-1 text-sm md:text-base lg:text-lg xl:text-lg leading-[16px] sm:leading-[18px] md:leading-[24px] lg:leading-[27px] xl:leading-[27px] font-normal rounded-full relative overflow-hidden cursor-default will-change-transform"
            style={{
              background:
                "linear-gradient(135deg, rgba(212, 212, 20, 0.25) 0%, rgba(212, 212, 20, 0.15) 100%)",
              backdropFilter: "blur(12px) saturate(180%)",
              WebkitBackdropFilter: "blur(12px) saturate(180%)",
              border: "1px solid rgba(212, 212, 20, 0.3)",
              boxShadow:
                "0 8px 32px rgba(212, 212, 20, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
              transformStyle: "preserve-3d",
              color: "#d4d414",
              textShadow: "0 0 10px rgba(212, 212, 20, 0.5)",
            }}
          >
            {/* Glass shine effect */}
            <span
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)",
                transform: "translateZ(5px)",
              }}
              aria-hidden="true"
            />
            {/* Content */}
            <span className="relative z-10">{post.category}</span>
          </span>
          <span className="text-slate">{formatDate(post.date)}</span>
        </div>
      </FadeIn>
      <FadeIn delay={0.2} direction="up">
        <h1 className=" text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-[1.2] font-semibold text-pure pb-4">
          {post.title}
        </h1>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p className="text-center text-slate mb-4">{post.excerpt}</p>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="flex flex-wrap text-sm md:text-base items-center justify-center gap-6 text-slate mb-4">
          <div className="flex items-center gap-2">
            {post.author === "falconics-pink" ? (
              <div className="relative w-5 h-5 lg:w-[42px] lg:h-[42px]">
                <Image
                  src="/images/logo/logo-falconics-pink-dark-bg.png"
                  alt="Falconics Pink"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <User className="w-4 h-4" />
            )}
            <span>
              {post.author === "falconics-pink"
                ? "Falconics Pink"
                : post.author}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
