"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Flip3DText from "@/components/animations/Flip3DText";

interface FilterDropdownProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterDropdown({
  title,
  options,
  selectedValue,
  onSelect,
}: FilterDropdownProps) {
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

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-left bg-coal backdrop-blur-sm border border-ashen rounded-xl transition-all duration-300 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
      >
        <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
          <span className="text-pure text-xs sm:text-sm font-light opacity-70 truncate w-full">
            {title}
          </span>
          <span className="text-pure text-sm sm:text-base md:text-lg font-light truncate w-full">
            {selectedValue}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-pure transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-coal backdrop-blur-sm border border-ashen rounded-xl z-60 shadow-lg overflow-hidden"
          >
            <div
              className="max-h-[300px] overflow-y-auto overscroll-contain custom-scrollbar px-1"
              data-lenis-prevent
              onWheel={(e) => {
                // Ensure wheel events are handled by the scroll container
                e.stopPropagation();
              }}
            >
              <div className="py-1 flex flex-col gap-1">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg rounded-xl font-light transition-colors cursor-pointer ${
                      selectedValue === option
                        ? "text-solis bg-solis/10"
                        : "text-pure hover:bg-pure/10"
                    }`}
                  >
                    <Flip3DText
                      defaultContent={
                        <span className="block truncate text-left w-full">
                          {option}
                        </span>
                      }
                      hoverContent={
                        <span className="block truncate text-left w-full">
                          {option}
                        </span>
                      }
                      axis="x"
                      duration={0.6}
                      transformOrigin="left center"
                      className="w-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
