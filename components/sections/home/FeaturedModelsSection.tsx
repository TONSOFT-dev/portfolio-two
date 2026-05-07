"use client";

import { useRef } from "react";
import { services } from "@/lib/data/services";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollStack from "@/components/animations/ScrollStack";
import GlobalServiceCard from "@/app/services/ServiceCard";
import { Code2, CloudCog, Network, ShieldCheck } from "lucide-react";

const serviceIcons = [Code2, CloudCog, Network, ShieldCheck];

interface ServiceCardProps {
  service: (typeof services)[0];
  index?: number;
  totalCards?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

function ServiceCard({ service, index = 0, totalCards = 4, containerRef }: ServiceCardProps) {
  const IconComponent = serviceIcons[index % serviceIcons.length];

  return (
    <ScrollStack
      index={index}
      totalItems={totalCards}
      containerRef={containerRef}
      className="lg:col-span-1"
    >
      <div className="h-[500px] sm:h-[550px] md:h-[580px] lg:h-[600px]">
        <GlobalServiceCard service={service} icon={IconComponent} index={index} />
      </div>
    </ScrollStack>
  );
}

export default function FeaturedModelsSection() {
  const featuredServices = services.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-noir/50">
      <Container>
        {/* Header and Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="flex-1">
            <SectionHeader text="Our Services" />
            <FadeIn delay={0.1}>
              <h2
                className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-pure leading-[1.3]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                What We Build For You
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="lg:flex lg:items-end">
            <p className="text-slate text-sm sm:text-base md:text-lg lg:text-base leading-relaxed max-w-2xl lg:max-w-80 text-left lg:text-right">
              From system design to cloud deployment — we engineer end-to-end solutions
              that scale with your ambitions.
            </p>
          </FadeIn>
        </div>

        {/* Scroll Stack Container */}
        <div ref={containerRef} className="relative">
          <div className="grid grid-cols-1 gap-6 min-h-[1800px] sm:min-h-[2200px] md:min-h-[1900px] lg:min-h-[2100px] xl:min-h-[2450px]">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                totalCards={featuredServices.length}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24 text-center md:text-right">
          <Button
            href="/services"
            variant="outline"
            className="text-solis border-solis hover:bg-transparent hover:text-solis w-full md:w-1/2 lg:w-1/3 text-sm sm:text-base md:text-lg lg:text-lg"
            arrowBgClassName="bg-solis"
          >
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
