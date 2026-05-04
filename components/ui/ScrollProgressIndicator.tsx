"use client";

import { useState, useEffect, useRef } from "react";

interface ScrollProgressIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
  totalSteps: number;
}

export default function ScrollProgressIndicator({
  containerRef,
  cardsRef,
  totalSteps,
}: ScrollProgressIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressState = useRef({ current: 0, target: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTarget = () => {
      if (!containerRef.current || !cardsRef.current) return;

      const container = containerRef.current;
      const cardsContainer = cardsRef.current;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = cardsContainer.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate when the container enters the viewport
      const scrollStart = containerTop - viewportHeight * 0.3;
      const scrollEnd = containerTop + containerHeight - viewportHeight * 0.7;
      const scrollRange = scrollEnd - scrollStart;

      let newTarget = 0;
      if (scrollRange > 0) {
        if (scrollY >= scrollStart && scrollY <= scrollEnd) {
          newTarget = (scrollY - scrollStart) / scrollRange;
        } else if (scrollY > scrollEnd) {
          newTarget = 1;
        }
      }
      progressState.current.target = Math.max(0, Math.min(1, newTarget));
    };

    const animate = () => {
      const { current, target } = progressState.current;

      // Smooth lerp: move current towards target
      // 0.08 is the smoothing factor (lower = smoother/slower, higher = snappier)
      const diff = target - current;

      if (Math.abs(diff) > 0.0005) {
        progressState.current.current += diff * 0.08;
        setScrollProgress(progressState.current.current);
      } else if (current !== target) {
        // Snap to target when close enough
        progressState.current.current = target;
        setScrollProgress(target);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // Initial calculation
    updateTarget();
    // Start at target to avoid "fly-in" on load
    progressState.current.current = progressState.current.target;
    setScrollProgress(progressState.current.target);

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, [containerRef, cardsRef]);

  return (
    <div className="hidden lg:flex flex-col items-center shrink-0 w-12 self-stretch z-20">
      <div className="relative flex flex-col items-center w-full h-full">
        <div className="relative w-full h-full flex justify-center">
          {/* Track Background - Faintly visible for structure */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-transparent via-solis/10 to-transparent opacity-50" />

          {/* Glowing Progress Line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-linear-to-b from-solis/50 via-solis to-solis shadow-[0_0_20px_rgba(var(--colors-solis),0.8)] will-change-[height] mix-blend-screen"
            style={{
              height: `${scrollProgress * 100}%`,
            }}
          >
            {/* Leading Edge Energy Pulse */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-6 bg-solis blur-sm animate-pulse" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-white blur-[1px]" />
          </div>

          {/* Nodes */}
          {Array.from({ length: totalSteps }).map((_, index) => {
            // Calculate position as a percentage
            const positionPercent =
              totalSteps === 1 ? 50 : (index / (totalSteps - 1)) * 100;

            // Determine if this node is "active" (passed by the line)
            const isActive = scrollProgress >= positionPercent / 100 - 0.02;

            // Determine if this is the *current* active step (closest to the line tip)
            // We define "current" as being the last active node
            const isCurrent =
              isActive &&
              (index === totalSteps - 1 ||
                scrollProgress < (index + 1) / (totalSteps - 1));

            return (
              <div
                key={index}
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                style={{
                  top: `${positionPercent}%`,
                }}
              >
                {/* Outer Glow Ring - Expands when active */}
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "scale-100 opacity-100 border-solis/30 bg-solis/5 shadow-[0_0_20px_rgba(var(--colors-solis),0.2)]"
                      : "scale-50 opacity-30 border-white/10 bg-transparent"
                  }`}
                >
                  {/* Inner Dot - Lights up */}
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-2.5 h-2.5 bg-solis shadow-[0_0_10px_var(--colors-solis)]"
                        : "w-1.5 h-1.5 bg-white/20"
                    } ${
                      isCurrent && isActive ? "animate-pulse scale-125" : ""
                    }`}
                  />

                  {/* Ripple effect for current node */}
                  {isCurrent && isActive && (
                    <div className="absolute inset-0 rounded-full border border-solis/40 animate-ping opacity-50" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
