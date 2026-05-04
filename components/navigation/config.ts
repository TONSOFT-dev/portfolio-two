// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Models", href: "/models" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;

export const LOGO_CONFIG = {
  src: "/images/logo/logo.png",
  alt: "Falconics Pink Logo",
  width: 300,
  height: 64,
} as const;

export const GLASS_CLASSES =
  "bg-[rgba(255,255,255,0.16)] backdrop-blur-3xl border border-[rgba(255,255,255,0.32)] rounded-xl" as const;

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
