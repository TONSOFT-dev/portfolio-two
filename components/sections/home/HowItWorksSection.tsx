"use client";

import { useRef } from "react";
import { Lightbulb, Code2, Rocket, HeartHandshake } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";

const steps = [
  {
    icon: Lightbulb,
    title: "Discovery & Architecture",
    description:
      "We start by deeply understanding your business requirements, technical constraints, and scalability goals. From there, we design a robust system architecture — selecting the right technologies, patterns, and cloud services for your specific context.",
  },
  {
    icon: Code2,
    title: "Engineering & Development",
    description:
      "Our engineers build production-grade systems using clean architecture principles, comprehensive test coverage, and modern CI/CD practices. Every component is built to be maintainable, observable, and ready for production from day one.",
  },
  {
    icon: Rocket,
    title: "Deployment & Launch",
    description:
      "We deploy to your target environment using automated pipelines, infrastructure-as-code, and zero-downtime strategies. Our cloud expertise ensures smooth launches on AWS with proper monitoring, alerting, and rollback capabilities.",
  },
  {
    icon: HeartHandshake,
    title: "Support & Iteration",
    description:
      "Post-launch, we remain your engineering partner. We monitor system health, respond to incidents, and continuously iterate based on real-world usage data — ensuring your system evolves alongside your business.",
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        {/* Header and Content - Split Layout */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left: SectionHeader, Headline, and Button */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 lg:self-start">
            <SectionHeader text="How We Work" />
            <FadeIn delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[46px] font-medium text-pure leading-[1.3] mb-8 sm:mb-10 md:mb-12"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                A Proven Process for Delivering Production-Grade Systems.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Button
                href="/contact"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis w-full sm:w-auto md:w-1/2 lg:w-auto text-sm sm:text-base md:text-lg lg:text-lg"
                arrowBgClassName="bg-solis"
              >
                Start a Project
              </Button>
            </FadeIn>
          </div>

          {/* Right: Steps Cards with Progress Indicator */}
          <div className="w-full lg:w-1/2 relative" ref={containerRef}>
            <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-10 items-stretch">
              {/* Vertical Progress Indicator - Sticky on left */}
              <ScrollProgressIndicator
                containerRef={containerRef}
                cardsRef={cardsRef}
                totalSteps={steps.length}
              />

              {/* Steps Cards - Scrollable on right */}
              <div
                className="flex flex-col gap-8 sm:gap-10 lg:gap-12 flex-1"
                ref={cardsRef}
              >
                {steps.map((step, index) => (
                  <FadeIn
                    key={step.title}
                    delay={index * 0.1}
                    className="h-full group"
                  >
                    <div className="relative h-full w-full">
                      {/* Floating Card Container */}
                      <div
                        className="relative z-10 text-left rounded-3xl border bg-coal/40 backdrop-blur-xl p-px h-full flex flex-col w-full min-h-[220px] overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2"
                        style={{
                          borderColor: "rgba(254,143,4,0.1)",
                        }}
                      >
                        {/* Dynamic Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div
                          className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] group-hover:opacity-100 transition-all duration-700"
                          style={{ background: "rgba(254,143,4,0.08)" }}
                        />

                        {/* Card Content */}
                        <div className="relative z-10 w-full h-full flex flex-col gap-6 p-6 sm:p-8">
                          <div className="flex items-start justify-between">
                            {/* Icon Container */}
                            <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
                              <div
                                className="absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: "rgba(254,143,4,0.2)" }}
                              />
                              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-coal to-black border border-white/10 shadow-inner">
                                <step.icon
                                  className="w-7 h-7 relative z-10"
                                  style={{ color: "#FE8F04" }}
                                  strokeWidth={1.5}
                                />
                              </div>
                            </div>

                            {/* Step Number */}
                            <span className="text-4xl font-bold text-white/5 font-mono">
                              0{index + 1}
                            </span>
                          </div>

                          <div className="flex flex-col gap-3">
                            <h3
                              className="text-xl sm:text-2xl font-semibold text-white group-hover:text-solis transition-colors duration-300"
                              style={{ fontFamily: "var(--font-syne)" }}
                            >
                              {step.title}
                            </h3>
                            <p className="text-base text-slate/80 leading-relaxed group-hover:text-slate transition-colors duration-300">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Reflection */}
                      <div
                        className="absolute inset-x-4 -bottom-4 h-4 blur-lg rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "rgba(254,143,4,0.05)" }}
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
