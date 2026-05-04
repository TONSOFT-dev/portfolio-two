import {
  Bluetooth,
  Camera,
  Lightbulb,
  Navigation,
  Sun,
  Music,
  Sparkles,
  Car,
  Luggage,
} from "lucide-react";
import { CarModel } from "@/types";

// Feature icon mapping - centralized for reusability
export const featureIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Bluetooth: Bluetooth,
  "Leather Seats": Car,
  "Sound System": Music,
  "360° Camera": Camera,
  "LED Headlights": Lightbulb,
  "Built-in GPS": Navigation,
  Sunroof: Sun,
  "Premium Sound System": Music,
  "Apple CarPlay": Sparkles,
  "Climate Control": Sparkles,
  "Parking Sensors": Camera,
  "Luxury Interior": Sparkles,
  "Advanced Safety Features": Sparkles,
  "Panoramic Sunroof": Sun,
  "Ambient Lighting": Lightbulb,
  "Wireless Charging": Sparkles,
  "4WD System": Car,
  "Terrain Response": Sparkles,
  "Meridian Sound System": Music,
  "Adaptive Cruise Control": Sparkles,
  "Spacious Cabin": Car,
  "Powerful Towing Capacity": Car,
  "Advanced Technology": Sparkles,
  "Premium Audio": Music,
  "Off-Road Package": Sparkles,
  "Bed Storage": Luggage,
  "Removable Doors": Car,
  "Fold-Down Windshield": Car,
  "Trail Rated": Sparkles,
  "Premium Touchscreen": Sparkles,
  "Bluetooth Connectivity": Bluetooth,
  "Backup Camera": Camera,
  "Coupe Design": Car,
  "Digital Cockpit": Sparkles,
  "Sport Seats": Car,
  "Dual-Zone Climate": Sparkles,
  "Keyless Entry": Sparkles,
};

export function getFeatureIcon(feature: string) {
  return featureIconMap[feature] || Sparkles;
}

// Specification items configuration
export const specificationItems = [
  { label: "Model Brand", key: "brand" as keyof CarModel },
  { label: "Type", key: "type" as keyof CarModel },
  { label: "Model Year", key: "year" as keyof CarModel },
  { label: "Transmission", key: "transmission" as keyof CarModel },
  { label: "Fuel Type", key: "fuelType" as keyof CarModel },
  { label: "Engine", key: "engine" as keyof CarModel },
  { label: "Mileage", key: "mileage" as keyof CarModel, suffix: " KM" },
  { label: "Horse Power", key: "horsepower" as keyof CarModel, suffix: " HP" },
  { label: "Cylinders", key: "cylinders" as keyof CarModel },
  { label: "Seats", key: "seats" as keyof CarModel },
  { label: "Baggage", key: "baggage" as keyof CarModel },
  { label: "Doors", key: "doors" as keyof CarModel },
];

export function formatSpecValue(value: unknown, suffix = ""): string {
  if (value === undefined || value === null) return "N/A";
  // Format numbers with comma separators
  if (typeof value === "number") {
    return `${value.toLocaleString()}${suffix}`;
  }
  return `${value}${suffix}`;
}
