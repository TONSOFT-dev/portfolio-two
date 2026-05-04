"use client";

import { useRef } from "react";
import { CarModel } from "@/types";
import { specificationItems, formatSpecValue } from "@/lib/utils/carUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CarSpecificationsProps {
  car: CarModel;
}

export default function CarSpecifications({ car }: CarSpecificationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  const validSpecs = specificationItems.filter(
    (item) => car[item.key] !== undefined && car[item.key] !== null
  );

  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current || !specsRef.current)
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

      // Staggered animation for specification items
      const specItems = specsRef.current.querySelectorAll(".spec-item");
      const specLabels = specsRef.current.querySelectorAll(".spec-label");
      const specDividers = specsRef.current.querySelectorAll(".spec-divider");
      const specValues = specsRef.current.querySelectorAll(".spec-value");

      // Set initial states
      gsap.set(specItems, {
        opacity: 0,
        x: -30,
      });

      gsap.set(specLabels, {
        opacity: 0,
        x: -20,
      });

      gsap.set(specDividers, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(specValues, {
        opacity: 0,
        x: 20,
      });

      // Create timeline for staggered reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: specsRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Animate items with stagger
      tl.to(specItems, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "power2.out",
      })
        .to(
          specLabels,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: {
              amount: 0.8,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          specDividers,
          {
            scaleX: 1,
            duration: 0.6,
            stagger: {
              amount: 0.8,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          specValues,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: {
              amount: 0.8,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef, dependencies: [validSpecs] }
  );

  return (
    <div ref={containerRef}>
      <h2
        ref={titleRef}
        className="text-xl sm:text-2xl font-bold text-pure mb-4 sm:mb-6"
      >
        Specifications
      </h2>
      <div ref={specsRef} className="space-y-2 sm:space-y-3">
        {validSpecs.map((item) => {
          const value = car[item.key];
          return (
            <div
              key={item.key}
              className="spec-item flex items-center gap-3 sm:gap-5"
            >
              <span className="spec-label text-slate text-sm md:text-base font-light leading-[20px] sm:leading-[24px]">
                {item.label}
              </span>
              <div className="spec-divider flex-1 h-px bg-slate/20"></div>
              <span className="spec-value text-pure text-sm md:text-base font-light leading-[20px] sm:leading-[24px]">
                {formatSpecValue(value, item.suffix)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
