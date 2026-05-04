"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

// Constants - Centralized and scalable
const HERO_CONFIG = {
  images: {
    desktop: "/images/home-hero/home-hero.jpg",
    mobile: "/images/home-hero/home-hero-small-screen.jpg",
  },
  overlay: {
    color: "rgba(8, 8, 5, 0.6)",
  },
  content: {
    location: "Dubai, UAE",
    leftText: "Curated for Women<br />Who Drive Life<br />Forward",
    rightText:
      "Luxury made effortless crafted for modern<br />women who value safety, comfort, and style<br />in every journey",
    cta: {
      primary: {
        text: "Book a Car",
        href: "/models",
      },
      secondary: {
        text: "Get in Touch",
        href: "/contact",
      },
    },
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
  const { images, content, animations } = HERO_CONFIG;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images - Responsive */}
      <div className="absolute inset-0">
        {/* Desktop Image - Hidden on small screens */}
        <div className="hidden lg:block absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={images.desktop}
              alt="Luxury mobility for women"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </div>
        {/* Mobile Image - Visible on small screens */}
        <div className="lg:hidden absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={images.mobile}
              alt="Luxury mobility for women"
              fill
              priority
              className="object-cover object-left"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </div>
        {/* Overlay - Fixed gradient class */}
        <div className="absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 rounded-2xl bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)]" />
      </div>

      {/* Content - Split Layout */}
      <div className="relative z-10 h-full w-full">
        <div className="h-full w-full max-w-[1315px] mx-auto px-5 xl:px-0 flex flex-col justify-between pt-12 lg:pt-16 pb-8 lg:pb-12">
          {/* Middle Section - Split Text */}
          <div className="flex-1 flex flex-col md:flex-row justify-center md:justify-between items-start pt-10 md:pt-20 gap-8 md:gap-6 lg:gap-12">
            {/* Left Text Section */}
            <motion.div
              {...animations.leftContent}
              className="flex flex-col lg:flex-row lg:items-start gap-4"
            >
              {/* Location and Horizontal Line - Centered */}
              <div className="flex items-center gap-4">
                {/* Location */}
                <p className="text-base text-[#ddd] whitespace-nowrap">
                  {content.location}
                </p>
                {/* Horizontal Line */}
                <div className="h-px bg-[#ddd] flex-1 lg:flex-none lg:w-40" />
              </div>
              {/* Text Lines */}
              <p className="text-base text-[#ddd] font-light leading-[24px]">
                {content.leftText.split("<br />").map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && (
                      <>
                        <span className="inline md:hidden"> </span>
                        <br className="hidden md:inline" />
                      </>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* Right Text Section */}
            <motion.div
              {...animations.rightContent}
              className="flex flex-col text-right lg:text-right"
            >
              <p className="text-base text-[#ddd] font-light leading-[24px]">
                {content.rightText.split("<br />").map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && (
                      <>
                        <span className="inline md:hidden"> </span>
                        <br className="hidden md:inline" />
                      </>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          </div>

          {/* Main Title and Tagline Section */}
          <motion.div
            className="text-left mt-6 md:mt-8 lg:mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-col lg:flex-row items-start gap-4 md:gap-4 lg:gap-4">
              {/* Tagline with Horizontal Bar */}
              <motion.div
                className="flex items-center gap-3 md:gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Horizontal Bar */}
                <div className="h-1 w-4 md:w-5 bg-solis rounded-l rounded-r" />
                {/* Tagline Text */}
                <p className="text-sm md:text-base text-solis uppercase">
                  WOMEN&apos;S
                  <br className="hidden md:block" /> LUXURY MOBILITY
                </p>
              </motion.div>
              {/* Main Title */}
              <motion.h1
                className="text-pure text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-[1.2] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                For Every Woman
                <br />
                Who Leads
              </motion.h1>
            </div>
          </motion.div>

          {/* Bottom Section - CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-start sm:justify-between items-start sm:items-stretch mt-6 sm:border-t sm:border-pure sm:w-full"
          >
            <Button
              href={content.cta.primary.href}
              variant="transparent"
              size="large"
              className="bg-transparent text-pure sm:flex-1"
            >
              {content.cta.primary.text}
            </Button>
            <div className="hidden sm:block w-px bg-pure" />
            <Button
              href={content.cta.secondary.href}
              variant="transparent"
              size="large"
              className="bg-transparent text-pure sm:flex-1"
            >
              {content.cta.secondary.text}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
