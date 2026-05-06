"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { HAMBURGER_LINKS, NAV_LINKS, DROPDOWN_ANIMATION, GLASS_CLASSES } from "./config";
import Flip3DText from "@/components/animations/Flip3DText";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "dropdown" | "fullwidth";
}

export default function NavigationMenu({
  isOpen,
  onClose,
  position = "dropdown",
}: NavigationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside (for fullwidth mobile menu only)
  useEffect(() => {
    if (!isOpen || position === "dropdown") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      const target = event.target as HTMLElement;

      // Check if click is inside the menu
      if (menuRef.current.contains(target)) return;

      // Check if click is on the menu toggle button (to avoid closing when opening)
      const toggleButton =
        target.closest('button[aria-label*="menu" i]') ||
        target.closest("button[aria-expanded]");

      // Don't close if clicking the toggle button (it handles its own toggle)
      if (toggleButton) return;

      // Close menu if clicking outside
      onClose();
    };

    // Add slight delay to avoid closing immediately when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen, position, onClose]);

  if (!isOpen) return null;

  const isDropdown = position === "dropdown";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          {...(isDropdown
            ? DROPDOWN_ANIMATION
            : {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.3 },
              })}
          className={cn(
            isDropdown
              ? cn(
                  "absolute top-full right-0 mt-5 w-[324px] z-60",
                  GLASS_CLASSES,
                  "backdrop-blur-3xl"
                )
              : "lg:hidden overflow-hidden bg-[rgba(14,35,54,0.95)] backdrop-blur-3xl border-t border-[rgba(254,143,4,0.2)]"
          )}
        >
          <div
            className={cn(
              "p-3",
              !isDropdown && "w-full max-w-[1315px] mx-auto px-5"
            )}
          >
            {/* Navigation Links */}
            <div className="flex flex-col gap-2 mb-4">
              {(isDropdown ? HAMBURGER_LINKS : NAV_LINKS).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    // Allow navigation to proceed first, then close menu
                    setTimeout(() => {
                      onClose();
                    }, 150);
                  }}
                  className="block text-pure font-light text-base lg:text-lg xl:text-xl leading-6 hover:text-solis transition-colors duration-200 cursor-pointer"
                >
                  <Flip3DText
                    defaultContent={
                      <span className="block text-pure font-light text-base lg:text-lg xl:text-xl leading-6">
                        {link.name}
                      </span>
                    }
                    hoverContent={
                      <span className="block font-light text-base lg:text-lg xl:text-xl leading-6" style={{ color: "#FE8F04" }}>
                        {link.name}
                      </span>
                    }
                    axis="x"
                    duration={0.6}
                    transformOrigin="left center"
                    className="w-full"
                  />
                </Link>
              ))}
            </div>

            {/* Get in Touch CTA Button */}
            <div className="pt-2 border-t border-[rgba(254,143,4,0.2)]">
              <Button
                href="/contact"
                variant="rounded-outline"
                showArrow={true}
                className="w-full lg:text-lg font-light"
                textColor="#FE8F04"
                borderColor="#FE8F04"
                onClick={onClose}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
