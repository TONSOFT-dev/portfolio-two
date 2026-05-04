"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Create parallax transforms for different layers
  // Background (image + overlay) moves together at same speed - creates depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Content moves faster (1.2x speed) - comes forward
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden overflow-x-hidden"
    >
      {/* Background Images - Responsive */}
      <div className="absolute inset-0">
        {/* Desktop Image - Hidden on small screens */}
        <motion.div
          className="hidden lg:block absolute top-[90px] sm:top-[90px] md:top-[115px] xl:top-[125px] left-3 md:left-3 lg:left-4 xl:left-5 right-3 md:right-3 lg:right-4 xl:right-5 bottom-3 md:bottom-3 lg:bottom-4 xl:bottom-5 rounded-2xl overflow-hidden"
          style={{ y: backgroundY }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/images/about/about-us.jpg"
              alt="About Falconics Pink"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </motion.div>
        {/* Mobile Image - Visible on small screens */}
        <motion.div
          className="lg:hidden absolute top-[90px] sm:top-[90px] md:top-[115px] xl:top-[125px] left-3 md:left-3 lg:left-4 xl:left-5 right-3 md:right-3 lg:right-4 xl:right-5 bottom-3 md:bottom-3 lg:bottom-4 xl:bottom-5 rounded-2xl overflow-hidden"
          style={{ y: backgroundY }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/images/about/about-us.jpg"
              alt="About Falconics Pink"
              fill
              priority
              className="object-cover object-left"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </motion.div>
        {/* Overlay */}
        <motion.div
          className="absolute top-[90px] sm:top-[90px] md:top-[115px] xl:top-[125px] left-3 md:left-3 lg:left-4 xl:left-5 right-3 md:right-3 lg:right-4 xl:right-5 bottom-3 md:bottom-3 lg:bottom-4 xl:bottom-5 rounded-2xl bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)]"
          style={{ y: backgroundY }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full w-full"
        style={{ y: contentY }}
      >
        <div className="h-full w-full max-w-[1315px] mx-auto px-5 xl:px-0 flex flex-col justify-end items-start pb-8 lg:pb-12">
          <div className="max-w-xl">
            <SectionHeader text="About Us" />
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] font-medium text-pure leading-[1.2]">
                Premium Rides, Tailored for the Modern Woman
              </h1>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
