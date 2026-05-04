"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface MovingTestimonialsProps {
  children: ReactNode[];
  direction?: "up" | "down";
  speed?: number;
}

export default function MovingTestimonials({
  children,
  direction = "up",
  speed = 0.5,
}: MovingTestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Duplicate children for seamless infinite loop
  const duplicatedChildren = [...children, ...children, ...children];

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight / 3;
        setContentHeight(height);
      }
    };

    const timer = setTimeout(updateHeight, 100);
    const resizeObserver = new ResizeObserver(updateHeight);

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [children]);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current || contentHeight === 0)
        return;

      const speedMultiplier = speed * 0.1;
      const startY =
        direction === "up" ? 0 : contentHeight > 0 ? -contentHeight : 0;
      const endY =
        direction === "up"
          ? contentHeight > 0
            ? -contentHeight * speedMultiplier
            : 0
          : contentHeight > 0
          ? -contentHeight * (1 - speedMultiplier)
          : 0;

      // Set initial position
      gsap.set(contentRef.current, {
        y: startY,
      });

      // Create scroll-triggered animation
      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        animation: gsap.to(contentRef.current, {
          y: endY,
          ease: "none",
        }),
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { scope: containerRef, dependencies: [contentHeight, direction, speed] }
  );

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden">
      {/* Top Fade Gradient - Extended by 5px to cover scroll gap */}
      <div className="absolute -top-[2px] left-0 right-0 h-[calc(6rem+5px)] sm:h-[calc(8rem+5px)] md:h-[calc(9rem+5px)] lg:h-[calc(10rem+5px)] bg-linear-to-b from-noir via-noir/80 to-transparent z-10 pointer-events-none" />

      {/* Bottom Fade Gradient - Extended by 5px to cover scroll gap */}
      <div className="absolute -bottom-[2px] left-0 right-0 h-[calc(6rem+5px)] sm:h-[calc(8rem+5px)] md:h-[calc(9rem+5px)] lg:h-[calc(10rem+5px)] bg-linear-to-t from-noir via-noir/80 to-transparent z-10 pointer-events-none" />

      {/* Moving Content */}
      <div
        ref={contentRef}
        className="flex flex-col gap-4 sm:gap-5 md:gap-6 will-change-transform"
      >
        {duplicatedChildren.map((child, index) => (
          <div key={`testimonial-${index}`} className="will-change-transform">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
