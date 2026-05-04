"use client";

import { motion } from "framer-motion";
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

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Animated CSS gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "#0E2336",
          }}
        />
        {/* Amber orb top-left */}
        <div
          className="absolute rounded-full tonsoft-orb pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            top: "-100px",
            left: "-150px",
            background: "radial-gradient(circle, rgba(254,143,4,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Amber orb bottom-right */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "500px",
            height: "500px",
            bottom: "-100px",
            right: "-100px",
            background: "radial-gradient(circle, rgba(254,143,4,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "3s",
          }}
        />
        {/* Subtle mid-tone glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "700px",
            height: "400px",
            top: "40%",
            left: "30%",
            background: "radial-gradient(ellipse, rgba(18,40,64,0.8) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(254,143,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
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
