import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

/**
 * Formats a number with appropriate suffix (K, %, +)
 */
export function formatStat(
  value: number,
  type: "percentage" | "count" | "k" = "count"
): string {
  if (type === "percentage") {
    return `${value}%`;
  }

  if (type === "k") {
    if (value >= 1000) {
      const kValue = value / 1000;
      // Format to 1 decimal place if needed, otherwise no decimals
      const formatted =
        kValue % 1 === 0 ? kValue.toString() : kValue.toFixed(1);
      return `${formatted}K+`;
    }
    return `${value}+`;
  }

  // Default: count with + suffix
  return `${value}+`;
}

export function parseStatValue(value: string): {
  numberPart: string;
  suffixPart: string;
} {
  const hasKPlus = value.includes("K+");
  const hasPlus = value.endsWith("+") && !hasKPlus;
  const hasPercent = value.endsWith("%");

  if (hasKPlus) {
    const parts = value.split("K+");
    return { numberPart: parts[0], suffixPart: "K+" };
  } else if (hasPlus) {
    const parts = value.split("+");
    return { numberPart: parts[0], suffixPart: "+" };
  } else if (hasPercent) {
    const parts = value.split("%");
    return { numberPart: parts[0], suffixPart: "%" };
  }

  return { numberPart: value, suffixPart: "" };
}

/**
 * Gets the brand logo path for a given brand name
 */
export function getBrandLogoPath(brand: string): string {
  const brandMap: Record<string, string> = {
    Ford: "/images/brand-logos/ford.webp",
    "Mercedes-Benz": "/images/brand-logos/mercedes-benz.webp",
    "Land Rover": "/images/brand-logos/land-rover.webp",
    Dodge: "/images/brand-logos/dodge.webp",
    Jeep: "/images/brand-logos/jeep.webp",
  };
  return brandMap[brand] || "/images/brand-logos/ford.webp";
}

/**
 * Gets the feature icon component name for a given feature
 */
export function getFeatureIconName(feature: string): string {
  const featureMap: Record<string, string> = {
    Bluetooth: "bluetooth",
    "Leather Seats": "seat",
    "Sound System": "speaker",
    "360° Camera": "camera",
    "LED Headlights": "headlight",
    "Built-in GPS": "gps",
    Sunroof: "sunroof",
    "Premium Sound System": "speaker",
    "Apple CarPlay": "smartphone",
    "Climate Control": "thermometer",
    "Parking Sensors": "sensor",
    "Luxury Interior": "sparkles",
    "Advanced Safety Features": "shield",
    "Panoramic Sunroof": "sunroof",
    "Ambient Lighting": "lightbulb",
    "Wireless Charging": "battery",
    "4WD System": "car",
    "Terrain Response": "mountain",
    "Meridian Sound System": "speaker",
    "Adaptive Cruise Control": "cruise",
    "Spacious Cabin": "car",
    "Powerful Towing Capacity": "truck",
    "Advanced Technology": "cpu",
    "Premium Audio": "speaker",
    "Off-Road Package": "mountain",
    "Bed Storage": "package",
    "Removable Doors": "door",
    "Fold-Down Windshield": "windshield",
    "Trail Rated": "award",
    "Premium Touchscreen": "tablet",
    "Bluetooth Connectivity": "bluetooth",
    "Backup Camera": "camera",
    "Coupe Design": "car",
    "Digital Cockpit": "monitor",
    "Sport Seats": "seat",
    "Dual-Zone Climate": "thermometer",
    "Keyless Entry": "key",
  };
  return featureMap[feature] || "sparkles";
}
