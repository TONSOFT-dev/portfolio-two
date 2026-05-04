"use client";

import { cn } from "@/lib/utils";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export default function MenuToggle({
  isOpen,
  onClick,
  className,
}: MenuToggleProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col justify-center items-center gap-[4px] sm:gap-[6px] w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] transition-all duration-300 cursor-pointer",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          "block w-[20px] sm:w-[26px] h-[1.5px] bg-pure transition-all duration-300",
          isOpen && "rotate-45 translate-y-[6px] sm:translate-y-[7.5px]"
        )}
      />
      <span
        className={cn(
          "block w-[20px] sm:w-[26px] h-[1.5px] bg-pure transition-all duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block w-[20px] sm:w-[26px] h-[1.5px] bg-pure transition-all duration-300",
          isOpen && "-rotate-45 -translate-y-[6px] sm:-translate-y-[7.5px]"
        )}
      />
    </button>
  );
}
