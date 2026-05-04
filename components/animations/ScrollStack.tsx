"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollStackProps {
  children: ReactNode;
  index: number;
  totalItems: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function ScrollStack({
  children,
  index,
  totalItems,
  containerRef,
  className = "",
}: ScrollStackProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations for scroll-stack effect
  const { scrollYProgress } = useScroll({
    target: containerRef || itemRef,
    offset: ["start 0.9", "end 0.1"],
  });

  // All items start at 0 - they appear at the same scroll position
  const itemStart = 0;
  const itemEnd = (index + 1) / totalItems;
  const isLastCard = index === totalItems - 1;

  // For the last card, ensure it completes fully
  const itemProgress = useTransform(
    scrollYProgress,
    isLastCard
      ? [itemStart, itemEnd - 0.2, itemEnd, 1]
      : [itemStart, itemEnd - 0.2, itemEnd + 0.1],
    isLastCard ? [0, 1, 1, 1] : [0, 1, 1]
  );

  // Smooth spring animation for fluid motion
  const smoothProgress = useSpring(itemProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale transform: zoom in from bottom (small) to normal size (1) as card scrolls up and fixes
  // Ensure all cards end at exactly scale 1 when scroll is finished
  const scale = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.85, 0.9, 0.95, 0.98, 1] // Start zoomed out (small), zoom in to normal size (1)
  );

  // Y transform for smooth stacking - cards move up as they stack
  const y = useTransform(smoothProgress, [0, 0.5, 1], [0, 0, 0]);

  // Z-index: later items (higher index) appear on top when stacked
  const zIndex = index + 10; // Higher index = higher z-index (appears on top)

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        scale,
        y,
        zIndex,
        position: "sticky",
        top: "125px",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
