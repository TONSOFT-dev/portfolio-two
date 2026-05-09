"use client";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import {
  LucideIcon, Cloud, Server, Shield, Network, Box, Github, Code, Terminal,
  Webhook, Blocks, Activity, Database, Lock, Globe, FileCode2
} from "lucide-react";
import React, { useRef } from "react";
import { Service } from "@/lib/data/services";

const getTechIcon = (tech: string): LucideIcon => {
  const t = tech.toLowerCase();
  if (t.includes('aws') || t.includes('vpc')) return Cloud;
  if (t.includes('kms') || t.includes('waf') || t.includes('security')) return Shield;
  if (t.includes('docker') || t.includes('kubernetes')) return Box;
  if (t.includes('github')) return Github;
  if (t.includes('node') || t.includes('python') || t.includes('java')) return Terminal;
  if (t.includes('api') || t.includes('graphql')) return Webhook;
  if (t.includes('microservices')) return Blocks;
  if (t.includes('kafka') || t.includes('event')) return Activity;
  if (t.includes('redis') || t.includes('postgre')) return Database;
  if (t.includes('tls') || t.includes('ssl')) return Lock;
  if (t.includes('terraform')) return FileCode2;
  return Code;
};

interface ServiceCardProps {
  service: Service;
  icon: LucideIcon;
  index: number;
}

export default function ServiceCard({ service, icon: Icon, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values (center is 0,0 for tilt)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Absolute mouse position from top-left (for spotlight)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics: stiffness 150, damping 20 as requested
  const springConfig = { stiffness: 150, damping: 20 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Card does not tilt anymore, only internal parallax remains

  // Internal Parallax: Opposite movement for background elements
  const parallaxX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const parallaxY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Absolute position within the card for the spotlight
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    mouseX.set(xPos);
    mouseY.set(yPos);

    // Percentage offset from center for the tilt
    const xPct = xPos / width - 0.5;
    const yPct = yPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Follow-the-Mouse Glow: #FE8F04 at 15% opacity
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(254,143,4,0.15), transparent 80%)`;

  // Border Spotlight
  const borderSpotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(254,143,4,0.5), transparent 100%)`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
      }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative p-[1px] rounded-3xl cursor-pointer h-full flex flex-col"
      >
        {/* Dynamic Border Spotlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: borderSpotlight }}
        />

        {/* Default subtle border when not hovered */}
        <div className="absolute inset-0 rounded-3xl bg-white/5 z-0 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Inner Card Background */}
        <div className="absolute inset-[1px] rounded-[23px] bg-[#122840]/90 backdrop-blur-3xl overflow-hidden pointer-events-none z-0 border-t border-white/5">

          {/* Engineering Grid Overlay */}
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Subtly Animated Noise Texture */}
          <div className="absolute inset-0 z-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

          {/* Large Floating Background Logo */}
          <motion.div
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], [80, -80]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], [80, -80])
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
          >
            <Icon size={280} strokeWidth={1} className="text-[#FE8F04]" />
          </motion.div>

          {/* Internal Parallax Glows */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="absolute inset-0 z-0"
          >
            {/* Top Corner Glow inside the parallax container */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#FE8F04]/10 blur-[80px] group-hover:bg-[#FE8F04]/20 transition-colors duration-700" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(254,143,4,0.03)_0%,transparent_50%)]" />
          </motion.div>

          {/* Mouse Spotlight inside the card */}
          <motion.div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
            style={{ background: spotlight }}
          />

          {/* Animated Bottom Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-[#FE8F04] to-transparent transition-all duration-700 group-hover:w-full opacity-0 group-hover:opacity-100 z-20" />
        </div>

        {/* Foreground Content */}
        <div className="relative p-6 sm:p-8 flex flex-col flex-grow z-20">

          {/* Top row: Icon + Category */}
          <div className="flex items-start justify-between relative z-30 h-12">
            {/* Pop-out Floating Icon (Inspired by the plant image) */}
            <motion.div
              style={{ x: parallaxX, y: parallaxY }}
              className="absolute -top-12 -left-8 md:-top-14 md:-left-10 inline-flex p-5 rounded-[1.5rem] bg-[#0E2336] backdrop-blur-xl border border-white/20 text-[#FE8F04] shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-40 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FE8F04]/20 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Icon size={44} strokeWidth={1} className="relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(254,143,4,0.5)]" />
            </motion.div>

            <div className="flex items-center ml-auto">
              <span className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-semibold bg-white/5 text-white/50 border border-white/20 group-hover:text-white/80 transition-colors duration-500 relative z-30 shadow-lg">
                {service.category}
              </span>
            </div>
          </div>

          {/* Title and Description */}
          <div className="mt-8 relative z-30">
            <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#FE8F04] to-transparent" />
              <span className="text-[#FE8F04] text-[10px] font-bold tracking-[0.2em] uppercase">
                {service.badge}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white to-white group-hover:from-[#FE8F04] group-hover:to-[#ffcc80] transition-all duration-500 leading-tight drop-shadow-lg" style={{ fontFamily: "var(--font-syne)" }}>
              {service.name}
            </h3>
            <p className="text-white/70 leading-relaxed text-sm sm:text-base font-light">
              {service.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3 mt-6 relative z-30">
            {service.highlights.map((h, i) => (
              <div key={h} className="flex items-start gap-4 text-white/70 text-sm group/item">
                <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FE8F04]/40 transition-colors duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FE8F04] scale-0 group-hover:scale-100 transition-transform duration-500" style={{ transitionDelay: `${i * 100}ms` }} />
                </div>
                <span className="leading-relaxed group-hover:text-white/90 transition-colors duration-500">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-2 mt-8 flex-grow relative z-30">
            {service.techStack.map((tech) => {
              const TechIcon = getTechIcon(tech);
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 bg-gradient-to-b from-white/5 to-transparent border border-white/10 group-hover:border-[#FE8F04]/30 group-hover:text-[#FE8F04] transition-all duration-300"
                >
                  <TechIcon size={12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                  {tech}
                </span>
              );
            })}
          </div>

          {/* Action Buttons (Ghost layout inspired by reference image) */}
          <div className="pt-8 mt-auto border-t border-white/5 relative z-30 flex items-center gap-4">
            <a href="/contact" className="px-6 py-2.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white hover:text-[#0E2336] transition-all duration-300 shadow-lg">
              Start Project
            </a>
            <a href="/contact" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#0E2336] transition-all duration-300 group/btn shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}