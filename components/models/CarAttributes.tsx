"use client";

import { Calendar, Car, Luggage, Users, Fuel } from "lucide-react";
import { CarModel } from "@/types";
import FadeIn from "@/components/animations/FadeIn";

interface CarAttributesProps {
  car: CarModel;
}

export default function CarAttributes({ car }: CarAttributesProps) {
  const attributes = [
    {
      icon: Calendar,
      value: car.year,
      label: "Year",
    },
    {
      icon: Car,
      value: car.type,
      label: "Type",
    },
    ...(car.baggage
      ? [
          {
            icon: Luggage,
            value: car.baggage,
            label: "Baggage",
          },
        ]
      : []),
    {
      icon: Users,
      value: car.seats,
      label: "Seats",
    },
    {
      icon: Fuel,
      value: car.fuelType,
      label: "Fuel Type",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mt-4 sm:mt-6">
      {attributes.map((attr, index) => {
        const IconComponent = attr.icon;
        return (
          <FadeIn key={`${attr.label}-${index}`} delay={0.1 + index * 0.05}>
            <div className="flex items-center gap-[10px] px-[12px] py-[4px] rounded-[100px] bg-coal border border-slate/20">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-solis" />
              <span className="text-pure text-xs sm:text-sm md:text-base leading-normal font-light">
                {attr.value}
              </span>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
