"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden overflow-x-hidden"
    >
      {/* CSS Animated Background — no car images */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[90px] sm:top-[90px] md:top-[115px] xl:top-[125px] left-3 md:left-3 lg:left-4 xl:left-5 right-3 md:right-3 lg:right-4 xl:right-5 bottom-3 md:bottom-3 lg:bottom-4 xl:bottom-5 rounded-2xl overflow-hidden"
          style={{ y: backgroundY }}
        >
          {/* Navy base */}
          <div className="absolute inset-0" style={{ background: "#0E2336" }} />

          {/* Amber orb top-left */}
          <div
            className="absolute rounded-full tonsoft-orb"
            style={{
              width: "70%",
              height: "70%",
              top: "-20%",
              left: "-10%",
              background: "radial-gradient(circle, rgba(254,143,4,0.2) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          {/* Amber orb bottom-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "60%",
              height: "60%",
              bottom: "-15%",
              right: "-10%",
              background: "radial-gradient(circle, rgba(254,143,4,0.12) 0%, transparent 65%)",
              filter: "blur(80px)",
              animationDelay: "3s",
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(254,143,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Dark bottom fade for content readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(14,35,54,0.85) 0%, rgba(14,35,54,0.3) 50%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full w-full"
        style={{ y: contentY }}
      >
        <div className="h-full w-full max-w-[1315px] mx-auto px-5 xl:px-0 flex flex-col justify-end items-start pb-8 lg:pb-12">
          <div className="max-w-2xl">
            <SectionHeader text="About TONSOFT" />
            <FadeIn delay={0.1}>
              <h1
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] font-bold text-pure leading-[1.2]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                We Build Software
                <br />
                <span style={{ color: "#FE8F04" }}>That Scales</span>
              </h1>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
