"use client";

import { CarModel } from "@/types";
import FadeIn from "@/components/animations/FadeIn";

interface CarInfoHeaderProps {
  car: CarModel;
}

export default function CarInfoHeader({ car }: CarInfoHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] font-bold text-pure mb-2 sm:mb-3">
        {car.name}
      </h1>
      <FadeIn delay={0.1}>
        <p className="text-slate leading-relaxed text-sm md:text-base">
          {car.description}
        </p>
      </FadeIn>
    </div>
  );
}
