"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import NavigationMenu from "./NavigationMenu";
import { GLASS_CLASSES } from "./config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMenuClose = () => setIsMobileMenuOpen(false);
  const handleMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-[rgba(14,35,54,0.95)] shadow-lg shadow-[rgba(254,143,4,0.05)]"
          : "bg-transparent",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      <div className="w-full max-w-[1315px] mx-auto px-5 xl:px-0 my-2 md:my-3">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Logo onClick={handleMenuClose} />

          {/* Right Side Controls */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Menu Toggle */}
            <div className="relative">
              <div
                className={cn(
                  "flex items-center p-[4px] sm:p-[6px]",
                  GLASS_CLASSES
                )}
              >
                <MenuToggle
                  isOpen={isMobileMenuOpen}
                  onClick={handleMenuToggle}
                />
              </div>

              {/* Desktop Dropdown Menu (lg+) */}
              <div className="hidden lg:block">
                <NavigationMenu
                  isOpen={isMobileMenuOpen}
                  onClose={handleMenuClose}
                  position="dropdown"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Fullwidth Menu (<lg) */}
      <NavigationMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        position="fullwidth"
      />
    </header>
  );
}
