"use client";

import { useRef } from "react";
import Link from "next/link";
import { CarModel } from "@/types";
import { getFeatureIcon } from "@/lib/utils/carUtils";
import { slugify } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Flip3DText from "@/components/animations/Flip3DText";

gsap.registerPlugin(ScrollTrigger);

interface CarFeaturesProps {
  car: CarModel;
}

export default function CarFeatures({ car }: CarFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current || !featuresRef.current)
        return;

      // Title animation with scale and fade
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Staggered animation for feature cards
      const featureCards =
        featuresRef.current.querySelectorAll(".feature-card");

      gsap.set(featureCards, {
        opacity: 0,
        y: 40,
        rotationX: -15,
        scale: 0.9,
      });

      gsap.to(featureCards, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.7,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Hover animations for feature cards
      featureCards.forEach((card) => {
        const cardElement = card as HTMLElement;

        const handleMouseEnter = () => {
          gsap.to(cardElement, {
            y: -4,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        cardElement.addEventListener("mouseenter", handleMouseEnter);
        cardElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          cardElement.removeEventListener("mouseenter", handleMouseEnter);
          cardElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    },
    { scope: containerRef, dependencies: [car.features] }
  );

  return (
    <div ref={containerRef}>
      <h2
        ref={titleRef}
        className="text-xl sm:text-2xl font-bold text-pure mb-4 sm:mb-6"
      >
        Features
      </h2>
      <div
        ref={featuresRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
      >
        {car.features.map((feature) => {
          const IconComponent = getFeatureIcon(feature);
          return (
            <Link
              key={feature}
              href={`/model-features/${slugify(feature)}`}
              className="feature-card flex flex-row items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-coal group cursor-pointer transition-colors hover:bg-coal/80"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-solis shrink-0">
                <Flip3DText
                  defaultContent={
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  }
                  hoverContent={
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  }
                  axis="y"
                  duration={0.6}
                  transformOrigin="center right"
                  useGroupHover={true}
                  className=""
                />
              </div>
              <Flip3DText
                defaultContent={
                  <span className="text-pure text-sm sm:text-base md:text-[18px] leading-[20px] sm:leading-[24px]">
                    {feature}
                  </span>
                }
                hoverContent={
                  <span className="text-pure text-sm sm:text-base md:text-[18px] leading-[20px] sm:leading-[24px]">
                    {feature}
                  </span>
                }
                axis="x"
                duration={0.6}
                transformOrigin="left center"
                useGroupHover={true}
                className=""
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
