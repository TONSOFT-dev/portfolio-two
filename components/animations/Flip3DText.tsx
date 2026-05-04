"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Flip3DTextProps {
  /** Default/visible content */
  defaultContent: ReactNode;
  /** Hover content */
  hoverContent: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Rotation axis - 'x' for vertical flip, 'y' for horizontal flip */
  axis?: "x" | "y";
  /** Animation duration in seconds */
  duration?: number;
  /** Transform origin - defaults to bottom center for X-axis, center for Y-axis */
  transformOrigin?: string;
  /** Use group hover instead of direct hover */
  useGroupHover?: boolean;
}

export default function Flip3DText({
  defaultContent,
  hoverContent,
  className = "",
  axis = "x",
  duration = 0.6,
  transformOrigin,
  useGroupHover = false,
}: Flip3DTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Default transform origin based on axis
  const defaultTransformOrigin =
    transformOrigin ||
    (axis === "x" ? "50% 100%" : axis === "y" ? "center right" : "50% 50%");

  // Handle group hover by checking parent group class
  useEffect(() => {
    if (!useGroupHover || !containerRef.current) return;

    const container = containerRef.current;
    const parent = container.closest(".group");

    if (!parent) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [useGroupHover]);

  // Handle direct hover when not using group hover
  const handleMouseEnter = () => {
    if (!useGroupHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!useGroupHover) {
      setIsHovered(false);
    }
  };

  // Animation variants for X-axis (vertical flip)
  // Front: translate3d(0, 0, 0) rotateX(0deg) → translate3d(0, -100%, 0) rotateX(90deg)
  // Back: translate3d(0, 100%, 0) rotateX(-90deg) → translate3d(0, 0, 0) rotateX(0deg)
  const xAxisVariants = {
    default: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      opacity: 1,
    },
    hover: {
      x: 0,
      y: "-100%",
      z: 0,
      rotateX: 90,
      opacity: 0,
    },
  };

  const xAxisHoverVariants = {
    default: {
      x: 0,
      y: "100%",
      z: 0,
      rotateX: -90,
      opacity: 0,
    },
    hover: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      opacity: 1,
    },
  };

  // Animation variants for Y-axis (horizontal flip - right pivot)
  // Front: translate3d(0, 0, 0) rotateY(0deg) → translate3d(100%, 0, 0) rotateY(90deg)
  // Back: translate3d(-100%, 0, 0) rotateY(-90deg) → translate3d(0, 0, 0) rotateY(0deg)
  const yAxisVariants = {
    default: {
      x: 0,
      y: 0,
      z: 0,
      rotateY: 0,
      opacity: 1,
    },
    hover: {
      x: "100%",
      y: 0,
      z: 0,
      rotateY: 90,
      opacity: 0,
    },
  };

  const yAxisHoverVariants = {
    default: {
      x: "-100%",
      y: 0,
      z: 0,
      rotateY: -90,
      opacity: 0,
    },
    hover: {
      x: 0,
      y: 0,
      z: 0,
      rotateY: 0,
      opacity: 1,
    },
  };

  const variants = axis === "x" ? xAxisVariants : yAxisVariants;
  const hoverVariants = axis === "x" ? xAxisHoverVariants : yAxisHoverVariants;

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      {/* Spacer to maintain dimensions */}
      <div style={{ opacity: 0, pointerEvents: "none", visibility: "hidden" }}>
        {defaultContent}
      </div>

      {/* Default/Visible Content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start"
        initial={variants.default}
        animate={isHovered ? variants.hover : variants.default}
        transition={{
          duration,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformOrigin: defaultTransformOrigin,
        }}
      >
        {defaultContent}
      </motion.div>

      {/* Hover Content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start"
        initial={hoverVariants.default}
        animate={isHovered ? hoverVariants.hover : hoverVariants.default}
        transition={{
          duration,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformOrigin: defaultTransformOrigin,
        }}
      >
        {hoverContent}
      </motion.div>
    </div>
  );
}
