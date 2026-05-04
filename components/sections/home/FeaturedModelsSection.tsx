"use client";

import { useRef } from "react";
import { cars } from "@/lib/data/cars";
import ModelCard from "@/components/ui/ModelCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FeaturedModelsSection() {
  // Limit to maximum 4 cards
  const featuredCars = cars.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-noir/50">
      <Container>
        {/* Header and Content - Split Layout */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Left: SectionHeader and Headline */}
          <div className="flex-1">
            <SectionHeader text="Our Models" />
            <FadeIn delay={0.1}>
              <h2 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-pure leading-[1.3]">
                Our Featured Models
              </h2>
            </FadeIn>
          </div>

          {/* Right: Description */}
          <FadeIn delay={0.2} className="lg:flex lg:items-end">
            <p className="text-slate text-sm sm:text-base md:text-lg lg:text-base leading-relaxed max-w-2xl lg:max-w-80 text-left sm:text-left md:text-left lg:text-right">
              A refined fleet chosen for women who value elevated comfort,
              polished style, and absolute peace of mind
            </p>
          </FadeIn>
        </div>

        {/* Scroll Stack Container */}
        <div ref={containerRef} className="relative">
          <div className="grid grid-cols-1 gap-6 min-h-[1800px] sm:min-h-[2200px] md:min-h-[1900px] lg:min-h-[2100px] xl:min-h-[2450px]">
            {featuredCars.slice(0, 4).map((car, index) => (
              <ModelCard
                key={car.id}
                car={car}
                index={index}
                totalCards={featuredCars.length}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>

        <div className="text-center md:text-right">
          <Button
            href="/models"
            variant="outline"
            className="text-solis border-solis hover:bg-transparent hover:text-solis w-full md:w-1/2 lg:w-1/3 text-sm sm:text-base md:text-lg lg:text-lg"
            arrowBgClassName="bg-solis"
          >
            See All Models
          </Button>
        </div>
      </Container>
    </section>
  );
}
