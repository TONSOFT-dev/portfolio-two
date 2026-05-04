"use client";

import { useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { GLASS_CLASSES } from "./config";
import ModelDropdown from "./ModelDropdown";
import SearchInput from "./SearchInput";
import Flip3DText from "@/components/animations/Flip3DText";

interface ModelSearchProps {
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onModelSelect: (name: string, slug: string) => void;
  isExpanded: boolean;
}

/**
 * ModelSearch - Combined model selector and search input
 */
export default function ModelSearch({
  isOpen,
  onToggle,
  searchQuery,
  onSearchChange,
  onModelSelect,
  isExpanded,
}: ModelSearchProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative w-full max-w-[460px]" ref={dropdownRef}>
      {/* Desktop/LG & XL Screens: Full Model Search - Always visible */}
      <div
        className={cn(
          "hidden lg:grid grid-cols-3 items-center overflow-hidden",
          GLASS_CLASSES
        )}
      >
        {/* Models Button - 1/3 width - Fixed width */}
        <button
          onClick={onToggle}
          className="flex items-center justify-between gap-2 px-3 py-[8px] transition-all duration-300 border-r border-[rgba(255,255,255,0.32)] col-span-1 cursor-pointer min-w-0"
          aria-label="Search models"
          aria-expanded={isOpen}
        >
          <Flip3DText
            defaultContent={
              <span className="text-pure text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-6">
                Models
              </span>
            }
            hoverContent={
              <span className="text-pure text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-6">
                Models
              </span>
            }
            axis="x"
            duration={0.6}
            className="h-6 w-full"
          />
          <ChevronDown
            className={cn(
              "w-5 h-5 text-pure shrink-0 transition-transform duration-300",
              isOpen && "rotate-180"
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

      {/* Mobile/Tablet: Compact Search Icon */}
      <button
        onClick={onToggle}
        className={cn(
          "lg:hidden flex items-center justify-center p-[4px] sm:p-[6px] cursor-pointer",
          GLASS_CLASSES
        )}
        aria-label="Search models"
        aria-expanded={isExpanded}
      >
        <Search className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] text-pure" />
      </button>

      {/* Dropdown Menu - LG & XL screens */}
      <ModelDropdown
        isOpen={isOpen}
        searchQuery={searchQuery}
        onModelSelect={onModelSelect}
        className="hidden lg:block mt-5"
        zIndex="z-60"
      />
    </div>
  );
}
