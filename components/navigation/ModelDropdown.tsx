"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cars } from "@/lib/data/cars";
import { DROPDOWN_ANIMATION, GLASS_CLASSES } from "./config";
import Flip3DText from "@/components/animations/Flip3DText";

interface ModelDropdownProps {
  isOpen: boolean;
  searchQuery: string;
  onModelSelect: (name: string, slug: string) => void;
  className?: string;
  zIndex?: string;
}

export default function ModelDropdown({
  isOpen,
  searchQuery,
  onModelSelect,
  className,
  zIndex = "z-60",
}: ModelDropdownProps) {
  // Filter cars based on search query
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...DROPDOWN_ANIMATION}
          className={cn(
            "absolute top-full left-0 mt-3 w-full max-w-[324px] max-h-[400px] overflow-hidden",
            zIndex,
            GLASS_CLASSES,
            "backdrop-blur-3xl",
            className
          )}
        >
          <div className="p-3 flex flex-col gap-1 max-h-[340px] overflow-y-auto">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/models/${car.slug}`}
                  onClick={() => onModelSelect(car.name, car.slug)}
                  className="block text-pure text-base font-light leading-6 hover:text-pure transition-colors duration-200 cursor-pointer"
                >
                  <Flip3DText
                    defaultContent={
                      <span className="text-pure text-base font-light leading-6">
                        {car.name}
                      </span>
                    }
                    hoverContent={
                      <span className="text-pure text-base font-light leading-6">
                        {car.name}
                      </span>
                    }
                    axis="x"
                    duration={0.6}
                    className="h-6 w-full"
                  />
                </Link>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-slate text-sm">No models found</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
