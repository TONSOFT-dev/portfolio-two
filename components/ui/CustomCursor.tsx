"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  enableImageHover?: boolean;
}

export default function CustomCursor({
  enableImageHover = true,
}: CustomCursorProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Check if device is a touch device (only compute once on mount)
  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia("(hover: hover)").matches
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Check if hovering over an image with cursor-hover attribute (only if enableImageHover is true)
      if (enableImageHover) {
        const target = e.target as HTMLElement;
        const imageElement =
          target.tagName === "IMG" ? target : target.closest("img");
        const hasCursorHover =
          imageElement?.hasAttribute("data-cursor-hover") ||
          target.closest("[data-cursor-hover]") !== null;
        setIsHoveringImage(!!hasCursorHover);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHoveringImage(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseenter", handleMouseEnter);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (hasHover) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseenter", handleMouseEnter);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [cursorX, cursorY, enableImageHover]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-solis pointer-events-none mix-blend-difference z-9999"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHoveringImage ? 3 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  );
}
