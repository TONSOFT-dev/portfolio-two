"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Code2, Cloud, Zap, Shield } from "lucide-react";

const HERO_CONFIG = {
  content: {
    eyebrow: "Software Engineering · Cloud Architecture · DevOps",
    headline: "Building Scalable, Secure, and Intelligent Software Systems",
    subtext:
      "TONSOFT is a modern software company focused on delivering high-performance products and enterprise-grade solutions.",
    cta: {
      primary: { text: "Get in Touch", href: "/contact" },
      secondary: { text: "View Our Work", href: "/projects" },
    },
    badges: [
      { icon: Code2, label: "Product-Driven Engineering" },
      { icon: Cloud, label: "Cloud-Native Architecture" },
      { icon: Zap, label: "High Availability Systems" },
      { icon: Shield, label: "Security-First Approach" },
    ],
  },
  animations: {
    leftContent: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8 },
    },
    rightContent: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8, delay: 0.2 },
    },
  },
};

export default function HeroSection() {
  const { content, animations } = HERO_CONFIG;
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 29) % 100}%`,
        size: 1 + ((i * 7) % 3),
        opacity: 0.18 + (((i * 11) % 10) / 60),
        depth: 6 + ((i * 13) % 18),
        drift: 8 + ((i * 5) % 16),
        delay: (i % 9) * 0.25,
      })),
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const setVars = (nx: number, ny: number, px: number, py: number) => {
      el.style.setProperty("--nx", String(nx));
      el.style.setProperty("--ny", String(ny));
      el.style.setProperty("--px", `${px}%`);
      el.style.setProperty("--py", `${py}%`);
    };

    // Defaults (also used for reduced motion)
    setVars(0, 0, 50, 45);
    if (prefersReducedMotion) return;

    let raf = 0;
    let last: { nx: number; ny: number; px: number; py: number } | null = null;

    const commit = () => {
      raf = 0;
      if (!last) return;
      setVars(last.nx, last.ny, last.px, last.py);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Avoid heavy work on touch devices (pointerType can be "mouse" | "pen" | "touch")
      if (e.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const clampedX = Math.max(0, Math.min(1, x));
      const clampedY = Math.max(0, Math.min(1, y));

      last = {
        px: clampedX * 100,
        py: clampedY * 100,
        nx: (clampedX - 0.5) * 2,
        ny: (clampedY - 0.5) * 2,
      };

      if (!raf) raf = requestAnimationFrame(commit);
    };

    const handlePointerLeave = () => {
      last = { nx: 0, ny: 0, px: 50, py: 45 };
      if (!raf) raf = requestAnimationFrame(commit);
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={
        {
          background: "#0E2336",
          // Used by our parallax CSS transforms (updated on pointer move).
          ["--nx" as never]: 0,
          ["--ny" as never]: 0,
          ["--px" as never]: "50%",
          ["--py" as never]: "45%",
        } as CSSProperties
      }
    >
      {/* Interactive parallax background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(700px circle at var(--px) var(--py), rgba(254,143,4,0.16), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(900px circle at var(--px) var(--py), rgba(99, 102, 241, 0.08), transparent 60%)",
          }}
        />

        {/* Orbs (depth layer) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "640px",
            height: "640px",
            top: "-140px",
            left: "-180px",
            background: "radial-gradient(circle, rgba(254,143,4,0.20) 0%, transparent 70%)",
            filter: "blur(44px)",
            transform: prefersReducedMotion
              ? undefined
              : "translate3d(calc(var(--nx) * 18px), calc(var(--ny) * 14px), 0)",
            transition: "transform 120ms ease-out",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "540px",
            height: "540px",
            bottom: "-140px",
            right: "-140px",
            background: "radial-gradient(circle, rgba(254,143,4,0.14) 0%, transparent 70%)",
            filter: "blur(70px)",
            transform: prefersReducedMotion
              ? undefined
              : "translate3d(calc(var(--nx) * -26px), calc(var(--ny) * -18px), 0)",
            transition: "transform 120ms ease-out",
          }}
        />

        {/* Soft mid-tone glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "780px",
            height: "460px",
            top: "36%",
            left: "26%",
            background: "radial-gradient(ellipse, rgba(18,40,64,0.85) 0%, transparent 70%)",
            filter: "blur(90px)",
            transform: prefersReducedMotion
              ? undefined
              : "translate3d(calc(var(--nx) * 10px), calc(var(--ny) * 8px), 0)",
            transition: "transform 120ms ease-out",
          }}
        />

        {/* Grid overlay with parallax */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(254,143,4,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.55) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: prefersReducedMotion
              ? undefined
              : "translate3d(calc(var(--nx) * 6px), calc(var(--ny) * 6px), 0)",
            transition: "transform 120ms ease-out",
            maskImage: "radial-gradient(60% 60% at 50% 45%, black 55%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(60% 60% at 50% 45%, black 55%, transparent 100%)",
          }}
        />

        {/* Noise for depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "rgba(254,143,4,0.85)",
                opacity: p.opacity,
                filter: "blur(0.2px)",
                ["--dx" as never]: `${p.depth}px`,
                ["--dy" as never]: `${p.depth}px`,
                transform: prefersReducedMotion
                  ? undefined
                  : "translate3d(calc(var(--nx) * var(--dx)), calc(var(--ny) * var(--dy)), 0)",
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -p.drift, 0],
                      opacity: [p.opacity, p.opacity + 0.10, p.opacity],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 5 + (p.id % 7),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: p.delay,
                    }
              }
            />
          ))}
        </div>

        {/* Top fade for header readability */}
        <div
          className="absolute inset-x-0 top-0 h-44 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(14,35,54,0.95), rgba(14,35,54,0.0))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex-1 flex flex-col">
        <div className="h-full w-full max-w-[1315px] mx-auto px-5 xl:px-0 flex flex-col justify-between pt-28 lg:pt-36 pb-12 lg:pb-16 flex-1">

          {/* Top bar - eyebrow + right subtext */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <motion.div {...animations.leftContent} className="flex items-center gap-3">
              <div className="h-px w-8 bg-solis" />
              <p className="text-sm text-slate uppercase tracking-widest">{content.eyebrow}</p>
            </motion.div>
            <motion.p
              {...animations.rightContent}
              className="text-sm text-slate max-w-sm text-right hidden md:block leading-relaxed"
            >
              {content.subtext}
            </motion.p>
          </div>

          {/* Main Headline */}
          <motion.div
            className="flex-1 flex flex-col justify-center py-12 lg:py-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-bold text-pure leading-[1.05] tracking-tight max-w-5xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Building{" "}
              <span style={{ color: "#FE8F04" }}>Scalable</span>,{" "}
              <span style={{ color: "#FE8F04" }}>Secure</span>, and
              <br className="hidden lg:block" /> Intelligent Software Systems
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate max-w-2xl leading-relaxed md:hidden">
              {content.subtext}
            </p>
          </motion.div>

          {/* Bottom section — badges + CTAs */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3"
            >
              {content.badges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(254,143,4,0.2)] bg-[rgba(18,40,64,0.6)] backdrop-blur-sm"
                  >
                    <IconComponent className="w-4 h-4 shrink-0" style={{ color: "#FE8F04" }} />
                    <span className="text-xs text-slate font-medium whitespace-nowrap">{badge.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                href={content.cta.primary.href}
                variant="primary"
                size="large"
                className="text-noir font-semibold"
                bgColor="#FE8F04"
                textColor="#0E2336"
                arrowBgColor="#0E2336"
              >
                {content.cta.primary.text}
              </Button>
              <Button
                href={content.cta.secondary.href}
                variant="rounded-outline"
                size="large"
                className="text-pure border-pure"
              >
                {content.cta.secondary.text}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
