"use client";

import { useRef } from "react";
import { Search, Car, Mail, Key } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";

const steps = [
  {
    icon: Search,
    title: "Browse Our Elite Fleet",
    description:
      "Discover a curated selection of premium vehicles designed to meet the safety, comfort, and style expectations of today's women. Explore detailed specifications, photos, and features in just a few clicks.",
  },
  {
    icon: Car,
    title: "Pick Your Ideal Vehicle",
    description:
      "Choose the model that fits your lifestyle whether it's for work, travel, or weekend luxury. Every car is prepared to offer a smooth and secure driving experience.",
  },
  {
    icon: Mail,
    title: "Submit Your Enquiry",
    description:
      "Share your booking details and preferences. Our team responds instantly to help you secure the perfect vehicle at the perfect time. You can contact us directly via WhatsApp, call, or message no hassle, no delays.",
  },
  {
    icon: Key,
    title: "Collect and Drive Away",
    description:
      "Your chosen car will be ready, spotless, and waiting for you. Just pick it up and enjoy a premium on-road experience created to support your comfort and confidence.",
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
            <SectionHeader text="How It Works" />
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[46px] font-medium text-pure leading-[1.3] mb-8 sm:mb-10 md:mb-12">
                Simple Steps for a Smooth, Confident Rental Experience.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Button
                href="/contact"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis w-full sm:w-auto md:w-1/2 lg:w-auto text-sm sm:text-base md:text-lg lg:text-lg"
                arrowBgClassName="bg-solis"
              >
                Book Now
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
                      <div className="relative z-10 text-left rounded-3xl border border-white/5 bg-coal/40 backdrop-blur-xl p-px h-full flex flex-col w-full min-h-[220px] overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-10px_rgba(var(--colors-solis),0.15)] group-hover:border-solis/30">
                        {/* Dynamic Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-solis/10 rounded-full blur-[80px] group-hover:bg-solis/20 transition-all duration-700" />

                        {/* Card Content */}
                        <div className="relative z-10 w-full h-full flex flex-col gap-6 p-6 sm:p-8">
                          <div className="flex items-start justify-between">
                            {/* Icon Container with Glow */}
                            <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
                              <div className="absolute inset-0 bg-solis/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-coal to-black border border-white/10 shadow-inner">
                                <step.icon
                                  className="w-7 h-7 text-solis drop-shadow-[0_0_8px_rgba(var(--colors-solis),0.5)]"
                                  strokeWidth={1.5}
                                />
                              </div>
                            </div>

                            {/* Step Number (Optional decorative element) */}
                            <span className="text-4xl font-bold text-white/5 font-mono">
                              0{index + 1}
                            </span>
                          </div>

                          <div className="flex flex-col gap-3">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-solis transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-base text-slate/80 leading-relaxed group-hover:text-slate transition-colors duration-300">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Reflection/Depth Element underneath */}
                      <div className="absolute inset-x-4 -bottom-4 h-4 bg-solis/5 blur-lg rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
