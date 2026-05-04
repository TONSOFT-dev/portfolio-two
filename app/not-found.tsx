"use client";

import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Large 404 Background Text with Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        <motion.h1
          className="text-ashen text-[120px] sm:text-[180px] md:text-[240px] lg:text-[280px] xl:text-[320px] leading-[80%] font-bold select-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          404
        </motion.h1>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 md:space-y-10 max-w-2xl">
        {/* Page Not Found Heading */}
        <FadeIn delay={0.3} direction="up">
          <h2 className="text-pure text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] leading-[1.2] font-medium">
            Page Not Found
          </h2>
        </FadeIn>

        {/* Description Text */}
        <FadeIn delay={0.5} direction="up">
          <p className="text-slate text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-lg px-4">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim.
          </p>
        </FadeIn>

        {/* Back To Home Button */}
        <FadeIn delay={0.7} direction="up">
          <div className="pt-4 sm:pt-6">
            <Button
              href="/"
              variant="outline"
              className="text-solis border-solis hover:bg-transparent hover:text-solis w-full text-sm sm:text-base md:text-lg lg:text-lg"
              arrowBgClassName="bg-solis"
            >
              Back To Home
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
