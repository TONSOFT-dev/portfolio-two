// ============================================================================
// NAVIGATION CONFIGURATION — TONSOFT
// ============================================================================

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Tech Stack", href: "/tech-stack" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
] as const;

export const GLASS_CLASSES =
  "bg-[rgba(14,35,54,0.85)] backdrop-blur-3xl border border-[rgba(254,143,4,0.2)] rounded-xl" as const;

// Dropdown animation variants
export const DROPDOWN_ANIMATION = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
} as const;

// Header container max width
export const HEADER_MAX_WIDTH = "1315px";

// Responsive breakpoints
export const BREAKPOINTS = {
  lg: 1024,
} as const;
