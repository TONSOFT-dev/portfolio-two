"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";

interface OdometerProps {
  value: string; // The number string to display (e.g., "123", "12.5", "1.2K")
  duration?: number; // Animation duration in seconds
  delay?: number; // Delay before animation starts
  stagger?: number; // Delay between each digit animation
  className?: string;
  digitClassName?: string;
}

interface DigitColumnProps {
  digit: string;
  index: number;
  duration: number;
  stagger: number;
  delay: number;
  digitClassName?: string;
}

function DigitColumn({
  digit,
  index,
  duration,
  stagger,
  delay,
  digitClassName = "",
}: DigitColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const isNumeric = /^\d$/.test(digit);
  const digitValue = isNumeric ? parseInt(digit, 10) : 0;

  useEffect(() => {
    if (!isNumeric || !columnRef.current) return;

    const element = columnRef.current;
    // Calculate target position: each digit is 10% of the total height (0-9 = 10 digits)
    // We want to show the target digit, so we move by digitValue * 10%
    const targetY = -(digitValue * 10);

    // Start from above the target for dramatic rolling effect
    // Add extra rotations (multiples of 100%) for a more mechanical feel
    const rotations = 2; // Number of full rotations
    const startY = targetY - rotations * 100;

    // Use GSAP for smooth rolling animation
    gsap.fromTo(
      element,
      {
        y: `${startY}%`,
      },
      {
        y: `${targetY}%`,
        duration: duration,
        delay: delay + index * stagger,
        ease: "power2.out",
      }
    );
  }, [digit, digitValue, isNumeric, duration, delay, stagger, index]);

  if (!isNumeric) {
    // For non-numeric characters (like decimal point, comma, etc.)
    return (
      <span className={`inline-block align-baseline ${digitClassName}`}>
        {digit}
      </span>
    );
  }

  return (
    <div
      className="relative inline-block overflow-hidden align-baseline"
      style={{
        height: "1em",
        lineHeight: "1em",
        verticalAlign: "baseline",
      }}
    >
      <div
        ref={columnRef}
        className="flex flex-col"
        style={{
          transform: `translateY(0%)`,
          willChange: "transform",
        }}
      >
        {/* Create a stack of digits 0-9, with extra digits for looping effect */}
        {[...Array(20)].map((_, i) => {
          const displayDigit = i % 10;
          return (
            <span
              key={i}
              className={`inline-block ${digitClassName}`}
              style={{
                height: "1em",
                lineHeight: "1em",
                minHeight: "1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {displayDigit}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Odometer({
  value,
  duration = 1.2,
  delay = 0,
  stagger = 0.05,
  className = "",
  digitClassName = "",
}: OdometerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Small delay to ensure component is mounted
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Split the value into individual characters
  const digits = value.split("");

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-baseline ${className}`}
      style={{ lineHeight: "inherit" }}
    >
      {digits.map((digit, index) => (
        <DigitColumn
          key={`${digit}-${index}`}
          digit={digit}
          index={index}
          duration={shouldAnimate ? duration : 0}
          stagger={stagger}
          delay={delay}
          digitClassName={digitClassName}
        />
      ))}
    </div>
  );
}
