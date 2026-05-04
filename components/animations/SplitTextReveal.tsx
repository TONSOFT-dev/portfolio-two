"use client";

import { useRef, useEffect, ReactNode, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  triggerOnLoad?: boolean;
  triggerStart?: string;
  triggerEnd?: string;
  scrub?: boolean;
}

/**
 * SplitTextReveal - A production-ready GSAP split-text animation component
 */
export default function SplitTextReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  duration = 0.8,
  stagger = 0.01,
  ease = "cubic-bezier(0.38, 0, 0.215, 1)",
  triggerOnLoad = false,
  triggerStart = "top 80%",
  triggerEnd = "top 20%",
  scrub = false,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = charsRef.current;
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial state for all characters
      gsap.set(chars, {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform",
      });

      // Create animation timeline
      const animation = gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: delay,
        onComplete: () => {
          // Remove will-change after animation completes for better performance
          gsap.set(chars, { willChange: "auto" });
        },
      });

      // Conditionally add ScrollTrigger
      if (!triggerOnLoad) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: triggerStart,
          end: triggerEnd,
          scrub: scrub,
          animation: animation,
          toggleActions: "play none none none",
          once: true, // Only trigger once for performance
        });
      } else {
        // Play immediately if triggerOnLoad is true
        animation.play();
      }
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert(); // Automatically kills all GSAP animations and ScrollTriggers
    };
  }, [
    delay,
    duration,
    stagger,
    ease,
    triggerOnLoad,
    triggerStart,
    triggerEnd,
    scrub,
  ]);

  // Split text into words and characters with proper wrapping
  const splitText = (text: string) => {
    const words = text.split(" ");
    let charIndex = 0;

    return words.map((word, wordIndex) => {
      const chars = word.split("").map((char) => {
        const currentIndex = charIndex++;
        return (
          <span
            key={`char-${currentIndex}`}
            ref={(el) => {
              if (el) charsRef.current[currentIndex] = el;
            }}
            style={{ display: "inline-block" }}
          >
            {char}
          </span>
        );
      });

      return (
        <span
          key={`word-${wordIndex}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {chars}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.25em" }}> </span>
          )}
        </span>
      );
    });
  };

  // Extract text content from children
  const textContent =
    typeof children === "string" ? children : String(children);

  return (
    <Component ref={containerRef} className={className}>
      {splitText(textContent)}
    </Component>
  );
}
