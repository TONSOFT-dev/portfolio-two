"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { DROPDOWN_ANIMATION } from "@/components/navigation/config";

interface CategoryDropdownProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

export default function CategoryDropdown({
  categories,
  selectedCategory,
  onCategorySelect,
  className,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  // DRY: Common styles
  const buttonBaseStyles =
    "flex items-center justify-between gap-6 sm:gap-8 md:gap-2 lg:gap-10 px-4 sm:px-5 lg:px-6 py-3 focus:outline-none transition-colors cursor-pointer bg-coal backdrop-blur-sm border border-[rgba(255,255,255,0.32)] rounded-xl";
  const buttonWidthStyles =
    "w-full sm:w-auto min-w-[200px] sm:min-w-[240px] lg:min-w-[280px] xl:min-w-[300px]";
  const dropdownBaseStyles =
    "absolute top-full left-0 mt-3 w-full sm:w-auto min-w-[200px] sm:min-w-[240px] lg:min-w-[280px] xl:min-w-[300px] max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-hidden z-60 bg-coal backdrop-blur-sm border border-[rgba(255,255,255,0.32)] rounded-xl";

  return (
    <div
      ref={dropdownRef}
      className={cn("relative w-full sm:w-auto", className)}
    >
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(buttonBaseStyles, buttonWidthStyles)}
      >
        <span className="text-pure text-sm sm:text-base lg:text-lg xl:text-lg font-light">
          Categories
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-pure transition-transform duration-200 shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...DROPDOWN_ANIMATION}
            className={cn(dropdownBaseStyles)}
          >
            <div className="p-3 sm:p-4 lg:p-4 flex flex-col gap-2 sm:gap-2.5 lg:gap-3 max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "text-left text-pure text-sm sm:text-base lg:text-lg xl:text-lg leading-6 hover:text-pure transition-colors duration-200 cursor-pointer",
                    selectedCategory === category && "text-solis"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
