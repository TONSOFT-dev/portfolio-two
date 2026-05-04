"use client";

import { Code2, Cloud, Settings, Shield } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

const features = [
  {
    icon: Code2,
    title: "Product-Driven Engineering",
    description:
      "We build software with a product mindset — every line of code serves a business purpose. Clean architecture, maintainable codebases, and systems designed to evolve with your needs.",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Architecture",
    description:
      "From serverless functions to containerized microservices, we design systems that take full advantage of modern cloud infrastructure — scalable, resilient, and cost-efficient.",
  },
  {
    icon: Settings,
    title: "High Availability Systems",
    description:
      "We engineer for uptime. Every system we build targets 99.99% availability through redundancy, graceful degradation, and battle-tested distributed systems patterns.",
  },
  {
    icon: Shield,
    title: "Security-First Approach",
    description:
      "Security is woven into every layer — from IAM policies and encryption at rest, to network design and threat modeling. We build systems that protect what matters.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(254,143,4,0.05)" }}
      />

      <Container>
        <div className="flex flex-col xl:flex-row gap-12 lg:gap-20 xl:gap-24">
          {/* Left: Sticky Header Content */}
          <div className="w-full xl:w-1/3 xl:sticky xl:top-32 h-fit z-10">
            <SectionHeader text="Why TONSOFT?" />
            <FadeIn delay={0.1}>
              <h2
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-medium text-pure leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Engineering
                <br className="hidden xl:block" />
                <span className="text-solis"> Excellence</span>{" "}
                at Every Layer.
              </h2>
              <div className="mt-8 h-1 w-24 rounded-full" style={{ background: "linear-gradient(to right, #FE8F04, transparent)" }} />
            </FadeIn>
          </div>

          {/* Right: Feature Cards Grid */}
          <div className="w-full xl:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <FadeIn
                  key={feature.title}
                  delay={index * 0.15}
                  className="h-full"
                >
                  <div
                    className="group relative h-full min-h-[320px] p-8 sm:p-10 rounded-3xl border bg-coal/40 backdrop-blur-sm hover:bg-coal/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
                    style={{ borderColor: "rgba(254,143,4,0.1)" }}
                  >
                    {/* Hover Gradient Effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: "radial-gradient(circle at top right, rgba(254,143,4,0.08), transparent 60%)" }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-8 inline-flex">
                        <div
                          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/5 transition-all duration-500 group-hover:scale-110"
                          style={{ border: "1px solid rgba(254,143,4,0.1)" }}
                        >
                          <div
                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                            style={{ background: "rgba(254,143,4,0.2)" }}
                          />
                          <feature.icon
                            className="w-7 h-7 relative z-10"
                            style={{ color: "#FE8F04" }}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      <h3
                        className="text-2xl font-medium text-pure mb-4 group-hover:text-solis transition-colors duration-300"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {feature.title}
                      </h3>

                      <p className="text-base text-slate leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
