"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GLASS_CLASSES } from "./config";
import ModelDropdown from "./ModelDropdown";
import SearchInput from "./SearchInput";

interface ExpandedSearchBarProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onModelSelect: (name: string, slug: string) => void;
  isDropdownOpen: boolean;
  onDropdownToggle: () => void;
}

export default function ExpandedSearchBar({
  isOpen,
  searchQuery,
  onSearchChange,
  onModelSelect,
  isDropdownOpen,
  onDropdownToggle,
}: ExpandedSearchBarProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isDropdownOpen) {
          onDropdownToggle();
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, onDropdownToggle]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden w-full relative z-100"
        >
          {/* Content wrapper with overflow-visible to allow dropdown to escape */}
          <div className="w-full max-w-[1315px] mx-auto px-5 pb-5 overflow-visible">
            <div className="relative w-full overflow-visible" ref={dropdownRef}>
              {/* Full Search Bar */}
              <div
                className={cn(
                  "grid grid-cols-3 items-center overflow-hidden w-full",
                  GLASS_CLASSES
                )}
              >
                {/* Models Button - 1/3 width - Fixed width */}
                <button
                  onClick={onDropdownToggle}
                  className="flex items-center justify-between gap-2 px-3 py-[8px] transition-all duration-300 border-r border-[rgba(255,255,255,0.32)] col-span-1 cursor-pointer min-w-0"
                  aria-label="Search models"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="text-pure text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-6">
                    Models
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-pure shrink-0 transition-transform duration-300",
                      isDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Search Input - 2/3 width - Fixed width */}
                <SearchInput
                  value={searchQuery}
                  onChange={onSearchChange}
                  className="relative col-span-2 min-w-0"
                />
              </div>

              {/* Models Dropdown */}
              <ModelDropdown
                isOpen={isDropdownOpen}
                searchQuery={searchQuery}
                onModelSelect={onModelSelect}
                zIndex="z-100"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
