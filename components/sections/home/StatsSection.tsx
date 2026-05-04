"use client";

import { statsWithLabels } from "@/lib/data/stats";
import { parseStatValue } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Odometer from "@/components/ui/Odometer";
import DecryptedText from "@/components/animations/DecryptedText";
import { useState } from "react";
import { StatItem } from "@/lib/data/stats";

const StatCard = ({
  stat,
  index,
  total,
}: {
  stat: StatItem;
  index: number;
  total: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { numberPart, suffixPart } = parseStatValue(stat.value);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const textAlignClass = isFirst
    ? "lg:text-left"
    : isLast
    ? "lg:text-right"
    : "lg:text-center";

  const flexJustifyClass = isFirst
    ? "lg:justify-start"
    : isLast
    ? "lg:justify-end"
    : "lg:justify-center";

  return (
    <FadeIn delay={0.2 + index * 0.1} className="flex-1">
      <div
        className={`text-center group cursor-default ${textAlignClass}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-4xl sm:text-5xl md:text-6xl font-light text-pure mb-2 sm:mb-3 leading-normal group-hover:scale-110 transition-transform duration-300">
          <Odometer
            value={numberPart}
            duration={1.2}
            delay={0.3 + index * 0.1}
            stagger={0.08}
            digitClassName="text-pure"
          />
          {suffixPart && <span className="text-solis">{suffixPart}</span>}
        </div>
        <div
          className={`flex items-center justify-center min-h-[1.5em] ${flexJustifyClass}`}
        >
          <DecryptedText
            text={stat.label}
            className="text-slate text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-normal group-hover:text-white transition-colors duration-300"
            speed={30}
            maxIterations={10}
            sequential={true}
            animate={isHovered}
            animateOnHover={false}
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default function StatsSection() {
  return (
    <section className="py-20 bg-noir">
      <Container>
        {/* Header and Headline */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="flex-1">
            <SectionHeader text="WHO WE ARE" />
            <FadeIn delay={0.1}>
              <h2
                className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-pure leading-[1.3]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Enterprise-grade software engineering, built for the modern world.
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-stretch w-full gap-6 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-14 md:mb-16">
          {statsWithLabels.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              total={statsWithLabels.length}
            />
          ))}
        </div>

        {/* Bottom Content */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-4">
          {/* Description */}
          <FadeIn
            delay={0.6}
            className="col-span-12 md:col-span-12 lg:col-span-5"
          >
            <p className="text-slate text-sm sm:text-base md:text-lg lg:text-base leading-relaxed">
              TONSOFT is a next-generation software development company focused on building
              reliable, scalable, and secure systems for modern businesses. Founded by a
              former Senior Engineer at Amazon Web Services, we bring global engineering
              standards to every project.
            </p>
          </FadeIn>

          {/* Gap */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* CTA Button */}
          <FadeIn
            delay={0.7}
            className="col-span-12 md:col-span-12 lg:col-span-4 flex items-start md:items-end"
          >
            <Button
              href="/about"
              variant="outline"
              className="text-solis border-solis hover:bg-transparent hover:text-solis w-full md:w-1/2 lg:w-full text-sm sm:text-base md:text-lg lg:text-lg"
              arrowBgClassName="bg-solis"
            >
              Learn More
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
