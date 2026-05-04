"use client";

import { useRef } from "react";
import { Testimonial } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const glowOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !contentRef.current) return;

      // Initial state - card starts from below with scale
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotationX: -10,
      });

      // Animate card entrance
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.4)",
      });

      // Stagger content reveal
      if (quoteRef.current) {
        gsap.set(quoteRef.current, { opacity: 0, y: 20 });
        gsap.to(quoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1 + 0.3,
          ease: "power2.out",
        });
      }

      if (dividerRef.current) {
        gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
        gsap.to(dividerRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1 + 0.5,
          ease: "power2.out",
        });
      }

      if (nameRef.current) {
        gsap.set(nameRef.current, { opacity: 0, x: -10 });
        gsap.to(nameRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1 + 0.6,
          ease: "power2.out",
        });
      }

      if (locationRef.current) {
        gsap.set(locationRef.current, { opacity: 0, x: -10 });
        gsap.to(locationRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1 + 0.7,
          ease: "power2.out",
        });
      }

      // Hover animations - scale down to prevent edges from being cut off
      const handleMouseEnter = () => {
        if (!cardRef.current) return;

        gsap.to(cardRef.current, {
          y: -8,
          scale: 0.98,
          rotationY: 2,
          duration: 0.4,
          ease: "power2.out",
        });

        // Enhance glow effect on hover
        if (glowOverlayRef.current) {
          gsap.to(glowOverlayRef.current, {
            opacity: 0.6,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        if (!cardRef.current) return;

        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        if (glowOverlayRef.current) {
          gsap.to(glowOverlayRef.current, {
            opacity: 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      if (cardRef.current) {
        cardRef.current.addEventListener("mouseenter", handleMouseEnter);
        cardRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
          cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    },
    { scope: cardRef, dependencies: [testimonial, index] }
  );

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl border border-white/10 bg-coal/40 backdrop-blur-xl p-px h-full flex flex-col justify-center items-center w-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] overflow-hidden will-change-transform group shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-linear-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:z-0 after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-t after:from-transparent after:to-white/2 after:pointer-events-none after:z-0"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Animated glow overlay */}
      <div
        ref={glowOverlayRef}
        className="glow-overlay absolute inset-0 w-full h-full bg-[radial-gradient(circle_farthest-corner_at_50%_50%,rgba(212,212,20,0.15),transparent_70%)] opacity-30 pointer-events-none transition-opacity duration-400"
      />

      {/* Radial gradient accent */}
      <div className="absolute w-[105%] h-[85%] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,rgba(212,212,20,0.08),transparent_70%)] pointer-events-none" />

      {/* Card content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8"
      >
        {/* Quote icon */}
        <div className="absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 opacity-20">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-solis"
          >
            <path
              d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.481.967-4.996 2.848-4.996 7.153 0 3.391 1.057 5.696 3 7.696v7h-8zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.482.967-5.004 2.848-5.004 7.153 0 3.391 1.058 5.696 3 7.696v7h-8z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Review Text */}
        <p
          ref={quoteRef}
          className="text-pure text-xs sm:text-sm md:text-base lg:text-lg flex-1 leading-relaxed text-center font-light mt-6 sm:mt-8"
        >
          &ldquo;{testimonial.review}&rdquo;
        </p>

        {/* Animated divider */}
        <div
          ref={dividerRef}
          className="h-px w-12 sm:w-16 md:w-20 bg-linear-to-r from-transparent via-solis/60 to-transparent my-4 sm:my-5 mx-auto"
          style={{ transformOrigin: "center" }}
        />

        {/* Author Info */}
        <div className="space-y-1 sm:space-y-2">
          <p
            ref={nameRef}
            className="text-solis text-sm sm:text-base md:text-base lg:text-lg font-semibold text-center"
          >
            {testimonial.name}
          </p>
          <p
            ref={locationRef}
            className="text-slate text-xs sm:text-sm md:text-sm lg:text-base text-center font-light"
          >
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}
