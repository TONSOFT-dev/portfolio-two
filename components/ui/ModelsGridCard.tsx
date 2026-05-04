"use client";

import Image from "next/image";
import Link from "next/link";
import { CarModel } from "@/types";
import { getBrandLogoPath } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

interface ModelsGridCardProps {
  car: CarModel;
  index?: number;
}

export default function ModelsGridCard({
  car,
  index = 0,
}: ModelsGridCardProps) {
  const brandLogoPath = getBrandLogoPath(car.brand);

  return (
    <FadeIn delay={index * 0.1} direction="up">
      <Link href={`/models/${car.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-coal h-[320px]">
          {/* Car Image */}
          <div className="relative w-full h-full" data-cursor-hover>
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-cursor-hover
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#08080540] to-[#08080522]" />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 bg-linear-to-t from-noir/90 via-noir/50 to-transparent">
              {/* Row 1: Brand Logo + Text - Top Aligned */}
              <div className="flex items-center gap-2">
                <Image
                  src={brandLogoPath}
                  alt={car.brand}
                  width={24}
                  height={24}
                  className="object-contain w-6 h-6"
                />
                <span className="text-pure text-base leading-6 font-medium">
                  {car.brand}
                </span>
              </div>

              {/* Row 2 & 3 Container - Bottom Aligned with 8px gap between rows */}
              <div className="flex flex-col gap-2">
                {/* Row 2: Car Name - Bottom Aligned */}
                <h3 className="text-pure text-2xl leading-[1.3] font-medium line-clamp-2">
                  {car.name}
                </h3>

                {/* Row 3: Car type • dailyRental - Bottom Aligned */}
                <div className="flex items-center gap-2">
                  <span className="text-pure text-base leading-normal">
                    {car.type}
                  </span>
                  <span className="text-pure text-base leading-normal">•</span>
                  <span className="text-pure text-base leading-normal">
                    {car.dailyRental} AED/day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
