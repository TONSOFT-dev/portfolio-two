"use client";

import { useRef } from "react";
import { CarModel } from "@/types";
import Button from "@/components/ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PricingCardProps {
  car: CarModel;
}

export default function PricingCard({ car }: PricingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pricingGridRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const pricingOptions = [
    {
      label: "Daily Rental",
      value: `${car.dailyRental} AED/day`,
      alwaysShow: true,
    },
    {
      label: "Weekly Rental",
      value: car.weeklyRental ? `${car.weeklyRental} AED/wk` : null,
      alwaysShow: false,
    },
    {
      label: "Monthly Rental",
      value: car.monthlyRental ? `${car.monthlyRental} AED/mo` : null,
      alwaysShow: false,
    },
  ].filter((option) => option.alwaysShow || option.value);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !titleRef.current ||
        !pricingGridRef.current ||
        !buttonRef.current
      )
        return;

      // Create timeline for sequential reveal animations
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // Title animation - starts from negative y (below) and animates to 0
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.95,
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
      });

      // Pricing cards staggered animation - starts from negative y (below) and animates to 0
      const pricingCards =
        pricingGridRef.current.querySelectorAll(".pricing-option");

      gsap.set(pricingCards, {
        opacity: 0,
        y: -40,
        scale: 0.95,
      });

      tl.to(
        pricingCards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: {
            amount: 0.5,
            from: "start",
          },
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

      // Button animation - starts from negative y (below) and animates to 0
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: -30,
      });

      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Hover animations for pricing cards
      pricingCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const labelElement = cardElement.querySelector(".pricing-label");
        const valueElement = cardElement.querySelector(".pricing-value");

        const handleMouseEnter = () => {
          gsap.to(cardElement, {
            y: -4,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });

          if (labelElement) {
            gsap.to(labelElement, {
              color: "#d4d414", // solis color
              duration: 0.3,
              ease: "power2.out",
            });
          }

          if (valueElement) {
            gsap.to(valueElement, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          if (labelElement) {
            gsap.to(labelElement, {
              color: "#999999", // slate color
              duration: 0.3,
              ease: "power2.out",
            });
          }

          if (valueElement) {
            gsap.to(valueElement, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        cardElement.addEventListener("mouseenter", handleMouseEnter);
        cardElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          cardElement.removeEventListener("mouseenter", handleMouseEnter);
          cardElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      // Container hover animation
      const handleContainerMouseEnter = () => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 1.01,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      const handleContainerMouseLeave = () => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      if (containerRef.current) {
        containerRef.current.addEventListener(
          "mouseenter",
          handleContainerMouseEnter
        );
        containerRef.current.addEventListener(
          "mouseleave",
          handleContainerMouseLeave
        );
      }

      // Cleanup function
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            "mouseenter",
            handleContainerMouseEnter
          );
          containerRef.current.removeEventListener(
            "mouseleave",
            handleContainerMouseLeave
          );
        }
      };
    },
    { scope: containerRef, dependencies: [pricingOptions] }
  );

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl p-4 sm:p-5 mt-8 sm:mt-10 overflow-hidden bg-coal/40 backdrop-blur-xl border border-white/10 shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-linear-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:z-0 after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-t after:from-transparent after:to-white/2 after:pointer-events-none after:z-0"
    >
      <div className="relative z-10">
        <h3
          ref={titleRef}
          className="text-lg sm:text-xl md:text-2xl leading-[1.3] font-medium text-pure mb-4"
        >
          Pricing Terms
        </h3>
        <div
          ref={pricingGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 mb-4 sm:mb-5 md:mb-6 border border-slate/20 rounded-lg overflow-hidden"
        >
          {pricingOptions.map((option, index) => {
            const isLast = index === pricingOptions.length - 1;
            const isLastInRowSm = (index + 1) % 2 === 0 && !isLast;

            return (
              <div
                key={option.label}
                className={`pricing-option flex flex-col border-slate/20 ${
                  !isLast
                    ? "border-b sm:border-b-0 sm:border-r md:border-r"
                    : ""
                } ${
                  isLastInRowSm ? "sm:border-b md:border-b-0" : ""
                } p-3 sm:p-4 md:p-5 cursor-pointer`}
              >
                <span className="pricing-label text-slate font-light leading-normal text-xs sm:text-sm md:text-base mb-1">
                  {option.label}
                </span>
                <span className="pricing-value text-pure text-lg sm:text-xl md:text-2xl font-normal leading-normal">
                  {option.value || "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Book Now Button */}
        <div ref={buttonRef}>
          <Button
            href="/contact"
            variant="outline"
            className="text-solis border-solis hover:bg-transparent hover:text-solis w-full text-sm sm:text-base md:text-lg"
            arrowBgClassName="bg-solis"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
