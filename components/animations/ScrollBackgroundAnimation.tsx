"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollBackgroundAnimationProps {
  colors?: string[];
  startPosition?: number;
  endPosition?: number;
  duration?: number;
  ease?: string;
  className?: string;
}

export default function ScrollBackgroundAnimation({
  colors = [
    "linear-gradient(135deg, #080805 0%, #1a1a1a 50%, #080805 100%)",
    "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
    "linear-gradient(135deg, #080805 0%, #1a1a1a 100%)",
  ],
  startPosition = 0,
  endPosition = 100,
  duration = 1.5,
  ease = "power2.out",
  className = "",
}: ScrollBackgroundAnimationProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!backgroundRef.current) return;

      // Wait for DOM to be ready
      if (typeof window === "undefined") return;

      // Set initial background
      gsap.set(backgroundRef.current, {
        background: colors[0],
      });

      // Use the document body as trigger for full page scroll tracking
      const trigger = document.body;

      // Create a timeline for smooth color transitions
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: `top ${startPosition}%`,
          end: `bottom ${endPosition}%`,
          scrub: duration, // Smooth scrubbing tied to scroll
          pin: false,
          invalidateOnRefresh: true, // Recalculate on resize
          markers: false, // Set to true for debugging
        },
      });

      // Animate through each color transition
      colors.forEach((color, index) => {
        if (index === 0) return; // Skip first color (initial state)

        timeline.to(backgroundRef.current, {
          background: color,
          duration: 1,
          ease: ease,
        });
      });
    },
    {
      scope: wrapperRef,
      dependencies: [colors, startPosition, endPosition, duration, ease],
    }
  );

  // Handle responsive updates
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Refresh on mount to ensure proper calculation
    ScrollTrigger.refresh();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none">
      {/* Fixed background layer */}
      <div
        ref={backgroundRef}
        className={`fixed inset-0 -z-10 will-change-[background] ${className}`}
        aria-hidden="true"
        style={{
          background: colors[0],
        }}
      />
    </div>
  );
}
