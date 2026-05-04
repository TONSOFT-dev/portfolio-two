"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Flip3DProps {
  /** Source path for the default/visible image */
  defaultImage: string;
  /** Source path for the hover image */
  hoverImage: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Additional CSS classes */
  className?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Rotation axis - 'x' for vertical flip, 'y' for horizontal flip */
  axis?: "x" | "y";
  /** Animation duration in seconds */
  duration?: number;
  /** Transform origin - defaults to bottom center for X-axis, center for Y-axis */
  transformOrigin?: string;
  /** Use group hover instead of direct hover */
  useGroupHover?: boolean;
}

export default function Flip3D({
  defaultImage,
  hoverImage,
  alt = "Image",
  className = "",
  width = 400,
  height = 400,
  axis = "x",
  duration = 0.6,
  transformOrigin,
  useGroupHover = false,
}: Flip3DProps) {
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
      className={cn("relative", "flex items-center justify-center", className)}
      onMouseEnter={!useGroupHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={!useGroupHover ? () => setIsHovered(false) : undefined}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        overflow: "hidden",
        minHeight: "1px",
        minWidth: "1px",
      }}
    >
      {/* Spacer to maintain dimensions */}
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <Image
          src={defaultImage}
          alt=""
          width={width}
          height={height}
          className="w-full h-full object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Default/Visible Image */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={variants.default}
        animate={
          useGroupHover
            ? isHovered
              ? variants.hover
              : variants.default
            : isHovered
            ? variants.hover
            : variants.default
        }
        whileHover={!useGroupHover ? variants.hover : undefined}
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
        <Image
          src={defaultImage}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-contain"
          priority={false}
        />
      </motion.div>

      {/* Hover Image */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={hoverVariants.default}
        animate={
          useGroupHover
            ? isHovered
              ? hoverVariants.hover
              : hoverVariants.default
            : isHovered
            ? hoverVariants.hover
            : hoverVariants.default
        }
        whileHover={!useGroupHover ? hoverVariants.hover : undefined}
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
        <Image
          src={hoverImage}
          alt={`${alt} hover`}
          width={width}
          height={height}
          className="w-full h-full object-contain"
          priority={false}
        />
      </motion.div>
    </div>
  );
}
