"use client";

import { Car, Calendar, DollarSign, Wrench } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

const features = [
  {
    icon: Car,
    title: "Luxurious Car Rentals",
    description:
      "Premium vehicles curated for women who value comfort, style, and confidence on the road. Every ride combines elegance with powerful performance.",
  },
  {
    icon: Calendar,
    title: "Easy Booking Process",
    description:
      "A seamless, stress-free booking experience created with women in mind quick, intuitive, and fully transparent from start to finish.",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing Plans",
    description:
      "Thoughtfully designed rental plans to fit every woman's lifestyle daily, weekly, or monthly options with complete flexibility and no hidden surprises.",
  },
  {
    icon: Wrench,
    title: "Well-Maintained Fleet",
    description:
      "Every vehicle is professionally inspected, serviced, and detailed to ensure women enjoy a safe, smooth, and reliable driving experience every time.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-solis/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div className="flex flex-col xl:flex-row gap-12 lg:gap-20 xl:gap-24">
          {/* Left: Sticky Header Content */}
          <div className="w-full xl:w-1/3 xl:sticky xl:top-32 h-fit z-10">
            <SectionHeader text="Why Choose Us?" />
            <FadeIn delay={0.1}>
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-medium text-pure leading-[1.1] tracking-tight">
                Curated Comfort <br className="hidden xl:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-pure via-pure to-pure/50">
                  & Class for Every
                </span>{" "}
                Woman&apos;s Journey.
              </h2>
              <div className="mt-8 h-1 w-24 bg-linear-to-r from-solis to-transparent rounded-full" />
            </FadeIn>
          </div>

          {/* Right: Fluid Card Grid */}
          <div className="w-full xl:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <FadeIn
                  key={feature.title}
                  delay={index * 0.15}
                  className="h-full"
                >
                  <div className="group relative h-full min-h-[320px] p-8 sm:p-10 rounded-3xl border border-white/5 bg-coal/40 backdrop-blur-sm hover:bg-coal/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.08),transparent_60%)]" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-8 inline-flex">
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 group-hover:border-solis/30 group-hover:scale-110 transition-all duration-500">
                          <div className="absolute inset-0 bg-solis/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <feature.icon
                            className="w-7 h-7 text-solis relative z-10"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl font-medium text-pure mb-4 group-hover:text-solis transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-base text-slate leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {feature.description}
                      </p>
                    </div>

                    {/* Decorative Corner Line */}
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
