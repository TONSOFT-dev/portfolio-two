"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { StatItem } from "@/lib/data/stats";
import { parseStatValue } from "@/lib/utils";
import { useEffect, useState } from "react";
import Odometer from "@/components/ui/Odometer";
import DecryptedText from "@/components/animations/DecryptedText";

interface AboutStorySectionProps {
  imageSrc?: string;
  imageAlt?: string;
  label: string;
  title: string;
  paragraphs?: string[];
  stats?: StatItem[];
  imagePosition?: "left" | "right";
  // TONSOFT: support content-only mode (no image — use gradient panel)
  useGradientPanel?: boolean;
}

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { numberPart, suffixPart } = parseStatValue(stat.value);

  return (
    <div
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FadeIn delay={0.2 + index * 0.1} className="h-full">
        <div className="group h-full perspective-[1000px]">
          <div
            className="text-center rounded-2xl p-px h-full flex flex-col justify-center items-center w-full min-h-[100px] sm:min-h-[100px] md:min-h-[150px] lg:min-h-[160px] relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: "#122840",
              border: "1px solid rgba(254,143,4,0.2)",
            }}
          >
            {/* Radial gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl"
              style={{ background: "radial-gradient(circle at center, rgba(254,143,4,0.8) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 w-full h-full flex flex-col justify-between items-center p-3 sm:p-4 md:p-4 lg:p-5">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-light text-pure leading-[1.2] group-hover:scale-105 transition-transform duration-300">
                <Odometer
                  value={numberPart}
                  duration={1.2}
                  delay={0.4 + index * 0.1}
                  stagger={0.08}
                  digitClassName="text-pure"
                />
                {suffixPart && <span className="text-solis">{suffixPart}</span>}
              </div>
              <div className="px-1 min-h-[1.5em] flex items-center justify-center">
                <DecryptedText
                  text={stat.label}
                  className="text-slate text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-xl font-medium leading-[1.3] group-hover:text-white transition-colors duration-300"
                  speed={30}
                  maxIterations={10}
                  sequential={true}
                  animate={isHovered}
                  animateOnHover={false}
                />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default function AboutStorySection({
  imageSrc,
  imageAlt,
  label,
  title,
  paragraphs,
  stats,
  imagePosition = "left",
  useGradientPanel = false,
}: AboutStorySectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!useGradientPanel && imageSrc) {
        gsap.fromTo(
          ".about-story-image",
          { scale: 1.2 },
          { scale: 1, duration: 1.5, ease: "power2.out" }
        );
      }
    },
    { scope: containerRef }
  );

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (useGradientPanel) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(".about-story-image", {
      x: x * 20,
      y: y * 20,
      rotateY: x * 8,
      rotateX: -y * 8,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (useGradientPanel) return;
    gsap.to(".about-story-image", {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  const getImageDirection = () => {
    if (isMobile) return "up";
    return imagePosition === "left" ? "left" : "right";
  };

  const getTextDirection = () => {
    if (isMobile) return "up";
    return imagePosition === "left" ? "right" : "left";
  };

  const imageComponent = (
    <FadeIn direction={getImageDirection()}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden cursor-pointer perspective-[1000px] group"
      >
        {useGradientPanel ? (
          // Gradient panel for TONSOFT (no car image)
          <div className="absolute inset-0" style={{ background: "#122840" }}>
            <div
              className="absolute rounded-full tonsoft-orb"
              style={{
                width: "80%",
                height: "80%",
                top: "-20%",
                left: "-20%",
                background: "radial-gradient(circle, rgba(254,143,4,0.2) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <div
              className="absolute"
              style={{
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(254,143,4,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.4) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                opacity: 0.06,
              }}
            />
            {/* Central icon / text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p
                  className="text-6xl sm:text-7xl font-bold"
                  style={{ color: "rgba(254,143,4,0.15)", fontFamily: "var(--font-syne)" }}
                >
                  TONSOFT
                </p>
              </div>
            </div>
          </div>
        ) : (
          imageSrc && (
            <>
              <div className="about-story-image absolute inset-0 w-full h-full will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={imageAlt || ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-10" />
            </>
          )
        )}
      </div>
    </FadeIn>
  );

  const textComponent = (
    <FadeIn direction={getTextDirection()}>
      <div>
        <SectionHeader text={label} />
        <FadeIn delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[46px] font-medium text-pure leading-[1.3] mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </h2>
        </FadeIn>
        {paragraphs && paragraphs.length > 0 && (
          <>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-slate leading-relaxed ${
                  index < paragraphs.length - 1 ? "mb-6" : "mb-8"
                }`}
              >
                {paragraph}
              </p>
            ))}
            <FadeIn delay={0.2}>
              <Button
                href="/contact"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis w-full sm:w-auto md:w-1/2 lg:w-auto text-sm sm:text-base md:text-lg lg:text-lg"
                arrowBgClassName="bg-solis"
              >
                Get in Touch
              </Button>
            </FadeIn>
          </>
        )}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  );

  return (
    <section className="py-20 overflow-x-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {imagePosition === "left" ? (
            <>
              {imageComponent}
              {textComponent}
            </>
          ) : (
            <>
              {textComponent}
              {imageComponent}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
