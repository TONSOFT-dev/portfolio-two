"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  animateOnHover?: boolean;
  sequential?: boolean;
  animate?: boolean; // New prop for external trigger
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  className = "",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  animateOnHover = false,
  sequential = true,
  animate = false, // Default false
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            // If sequential, lock in characters from the start based on progress
            if (sequential) {
              if (
                index < Math.floor((iteration / maxIterations) * text.length)
              ) {
                return text[index];
              }
            } else {
              // Non-sequential: all resolve at once after maxIterations (or random resolve logic could be added)
              if (iteration >= maxIterations) {
                return text[index];
              }
            }

            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (sequential) {
        if (iteration >= maxIterations * 2) {
          // Give it enough time to finish
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text);
        }
      } else {
        if (iteration >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text);
        }
      }

      iteration += 1 / 3; // Slow down the "locking" progress relative to the character churn
    }, speed);
  }, [text, speed, maxIterations, sequential, characters]);

  useEffect(() => {
    if (isInView || animate) {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, animate, scramble]);

  const handleMouseEnter = () => {
    if (animateOnHover) {
      scramble();
    }
  };

  const handleMouseLeave = () => {
    // Optional: Stop scrambling on leave if desired, but typically we let it finish or just leave it.
    // For now, no action needed as implies "animate on hover" triggers the effect.
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-nowrap ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
}
