import { useState } from "react";

/**
 * useDropdownState - Custom hook for managing dropdown states
 */
export function useDropdownState() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModelSearchOpen, setIsModelSearchOpen] = useState(false);
  const [isExpandedSearchOpen, setIsExpandedSearchOpen] = useState(false);
  const [isExpandedDropdownOpen, setIsExpandedDropdownOpen] = useState(false);
  const [modelSearchQuery, setModelSearchQuery] = useState("");

  const closeAllDropdowns = () => {
    setIsMobileMenuOpen(false);
    setIsModelSearchOpen(false);
    setIsExpandedSearchOpen(false);
    setIsExpandedDropdownOpen(false);
    setModelSearchQuery("");
  };

  // Parameters are required by interface but not used in implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleModelSelect = (_name: string, _slug: string) => {
    setIsModelSearchOpen(false);
    setIsExpandedDropdownOpen(false);
    setModelSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  const handleSearchIconClick = () => {
    const willBeOpen = !isExpandedSearchOpen;
    setIsExpandedSearchOpen(willBeOpen);

    // Close other dropdowns when opening expanded search
    if (willBeOpen) {
      setIsExpandedDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleExpandedDropdownToggle = () => {
    const willBeOpen = !isExpandedDropdownOpen;
    setIsExpandedDropdownOpen(willBeOpen);

    // Close mobile menu when opening expanded dropdown
    if (willBeOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileMenuToggle = () => {
    const willBeOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(willBeOpen);

    // Close other dropdowns when opening mobile menu
    if (willBeOpen) {
      setIsModelSearchOpen(false);
      setIsExpandedDropdownOpen(false);
      setIsExpandedSearchOpen(false);
    }
  };

  const handleModelSearchToggle = () => {
    if (window.innerWidth >= 1024) {
      // LG & XL screens: toggle dropdown only
      const willBeOpen = !isModelSearchOpen;
      setIsModelSearchOpen(willBeOpen);

      // Close mobile menu when opening model search dropdown
      if (willBeOpen) {
        setIsMobileMenuOpen(false);
      }
    } else {
      // Mobile/Tablet: toggle expanded search bar only
      handleSearchIconClick();
    }
  };

  return {
    // State
    isMobileMenuOpen,
    isModelSearchOpen,
    isExpandedSearchOpen,
    isExpandedDropdownOpen,
    modelSearchQuery,
    // Setters
    setIsMobileMenuOpen,
    setIsModelSearchOpen,
    setModelSearchQuery,
    // Handlers
    handleModelSelect,
    handleSearchIconClick,
    handleExpandedDropdownToggle,
    handleMobileMenuToggle,
    handleModelSearchToggle,
    closeAllDropdowns,
  };
}
