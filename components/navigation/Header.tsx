"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import ModelSearch from "./ModelSearch";
import ExpandedSearchBar from "./ExpandedSearchBar";
import NavigationMenu from "./NavigationMenu";
import { useDropdownState } from "./useDropdownState";
import { GLASS_CLASSES } from "./config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {
    isMobileMenuOpen,
    isModelSearchOpen,
    isExpandedSearchOpen,
    isExpandedDropdownOpen,
    modelSearchQuery,
    setIsMobileMenuOpen,
    setModelSearchQuery,
    handleModelSelect,
    handleExpandedDropdownToggle,
    handleMobileMenuToggle,
    handleModelSearchToggle,
    closeAllDropdowns,
  } = useDropdownState();

  // Handle scroll behavior for background change and hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update background based on scroll position
      setIsScrolled(currentScrollY > 50);

      // Hide/show header based on scroll direction
      if (currentScrollY < 10) {
        // Always show at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Reset all open states when header is hidden
  useEffect(() => {
    if (!isVisible) {
      // Close all dropdowns, menus, and clear search query
      closeAllDropdowns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handleMenuClose = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-noir/95 shadow-lg" : "bg-transparent",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      {/* Main Navigation Container - Responsive padding */}
      <div className="w-full max-w-[1315px] mx-auto px-5 xl:px-0 my-2 md:my-3">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Logo onClick={handleMenuClose} />

          {/* Right Side Controls - All Screen Sizes */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Model Search - Responsive */}
            <ModelSearch
              isOpen={isModelSearchOpen}
              onToggle={handleModelSearchToggle}
              searchQuery={modelSearchQuery}
              onSearchChange={setModelSearchQuery}
              onModelSelect={handleModelSelect}
              isExpanded={isExpandedSearchOpen}
            />

            {/* Menu Toggle - All Screens */}
            <div className="relative">
              <div
                className={cn(
                  "flex items-center p-[4px] sm:p-[6px]",
                  GLASS_CLASSES
                )}
              >
                <MenuToggle
                  isOpen={isMobileMenuOpen}
                  onClick={handleMobileMenuToggle}
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

      {/* Expanded Search Bar - Mobile/Tablet (<lg) */}
      <ExpandedSearchBar
        isOpen={isExpandedSearchOpen}
        searchQuery={modelSearchQuery}
        onSearchChange={setModelSearchQuery}
        onModelSelect={handleModelSelect}
        isDropdownOpen={isExpandedDropdownOpen}
        onDropdownToggle={handleExpandedDropdownToggle}
      />

      {/* Mobile/Tablet Fullwidth Menu (<lg) */}
      <NavigationMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        position="fullwidth"
      />
    </header>
  );
}
