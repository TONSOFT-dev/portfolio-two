"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useState, useLayoutEffect } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: "0px" });
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  // Check if element is in view on mount (for initial load) - use useLayoutEffect with RAF to avoid cascading renders
  useLayoutEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLElement;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isVisible =
        rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3;

      if (isVisible) {
        // Use requestAnimationFrame to defer state update and avoid cascading renders
        requestAnimationFrame(() => {
          setIsInitiallyVisible(true);
        });
      }
    }
  }, []); // Empty deps - only run on mount

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={
        isInView || isInitiallyVisible
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              ...directionOffset[direction],
            }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
