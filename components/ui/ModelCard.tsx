"use client";

import Image from "next/image";
import Link from "next/link";
import { CarModel } from "@/types";
import ScrollStack from "@/components/animations/ScrollStack";
import { getBrandLogoPath } from "@/lib/utils";

interface ModelCardProps {
  car: CarModel;
  index?: number;
  totalCards?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ModelCard({
  car,
  index = 0,
  totalCards = 4,
  containerRef,
}: ModelCardProps) {
  const brandLogoPath = getBrandLogoPath(car.brand);

  // Specifications data for DRY principle
  const specifications = [
    { label: "Daily Rental", value: `${car.dailyRental} AED` },
    { label: "Mileage", value: `${car.mileage.toLocaleString()} KM` },
    { label: "Horsepower", value: `${car.horsepower} HP` },
    { label: "Engine", value: car.engine },
  ];

  return (
    <ScrollStack
      index={index}
      totalItems={totalCards}
      containerRef={containerRef}
      className="lg:col-span-1"
    >
      <Link href={`/models/${car.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-coal h-[400px] sm:h-[480px] md:h-[440px] lg:h-[480px] xl:h-[560px] min-h-[400px] sm:min-h-[480px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[560px]">
          {/* Car Image - Full Width */}
          <div className="relative w-full h-full" data-cursor-hover>
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-cursor-hover
            />

            {/* Overlay - Same as HeroSection */}
            <div className="absolute inset-0 bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)]" />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-noir/90 via-noir/50 to-transparent p-4 sm:p-6 md:p-8 lg:p-10 xl:p-10">
              {/* Row 1: Brand Logo + Text - Top Aligned */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  src={brandLogoPath}
                  alt={car.brand}
                  width={40}
                  height={40}
                  className="object-contain w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10"
                />
                <span className="text-pure text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-normal font-medium truncate">
                  {car.brand}
                </span>
              </div>

              {/* Row 2: Car Name - Middle Aligned */}
              <div className="flex items-center">
                <h3 className="text-pure text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-medium leading-tight line-clamp-2 sm:line-clamp-3">
                  {car.name}
                </h3>
              </div>

              {/* Row 3: Specifications - Bottom Aligned */}
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-[60px] flex-wrap sm:flex-nowrap">
                {specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-1 sm:gap-2 md:gap-3"
                  >
                    <p className="text-pure text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg leading-normal truncate">
                      {spec.label}
                    </p>
                    <p className="text-pure text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-normal font-medium truncate">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollStack>
  );
}
