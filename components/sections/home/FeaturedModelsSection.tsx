"use client";

import { useRef } from "react";
import Image from "next/image";
import { services } from "@/lib/data/services";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollStack from "@/components/animations/ScrollStack";
import { Code2, Cloud, Settings, Shield } from "lucide-react";

const serviceIcons = [Code2, Cloud, Settings, Shield];

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
      <div className="group block">
        <div
          className="relative overflow-hidden rounded-2xl h-[400px] sm:h-[480px] md:h-[440px] lg:h-[480px] xl:h-[560px] min-h-[400px]"
          style={{ background: "#122840" }}
        >
          {/* Service image layer */}
          <Image
            src={service.image}
            alt={service.name}
            fill
            priority={index < 2}
            className="object-cover opacity-[0.40] group-hover:opacity-[0.55] transition-opacity duration-700"
            style={{
              filter: "saturate(1.05) contrast(1.05)",
              mixBlendMode: "screen",
            }}
          />

          {/* Animated background glow */}
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, rgba(254,143,4,0.2) 0%, transparent 60%)",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(254,143,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Image readability overlay */}
          <div className="absolute inset-0 bg-[rgba(14,35,54,0.18)]" />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(14,35,54,0.95) 0%, rgba(14,35,54,0.5) 50%, transparent 100%)",
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10">
            {/* Top row: icon + badge */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl border"
                style={{
                  background: "rgba(254,143,4,0.1)",
                  borderColor: "rgba(254,143,4,0.3)",
                }}
              >
                <IconComponent
                  className="w-7 h-7"
                  style={{ color: "#FE8F04" }}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(254,143,4,0.15)",
                  color: "#FE8F04",
                  border: "1px solid rgba(254,143,4,0.3)",
                }}
              >
                {service.badge}
              </span>
            </div>

            {/* Bottom: name + description */}
            <div className="flex flex-col gap-3">
              <p className="text-slate text-sm font-medium uppercase tracking-widest">
                {service.category}
              </p>
              <h3
                className="text-pure text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-solis transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {service.name}
              </h3>
              <p className="text-slate text-sm sm:text-base leading-relaxed max-w-sm">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
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

        <div className="text-center md:text-right">
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
