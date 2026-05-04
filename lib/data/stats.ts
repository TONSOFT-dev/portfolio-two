import { CompanyStats } from "@/types";
import { formatStat } from "@/lib/utils";

// Raw numeric values
const rawStats = {
  totalBookings: 1300,
  modelsInStock: 100,
  clientsSatisfaction: 99,
  dailyBookings: 20,
};

// Formatted stats with proper suffixes
export const companyStats: CompanyStats = {
  totalBookings: formatStat(rawStats.totalBookings, "k"),
  modelsInStock: formatStat(rawStats.modelsInStock, "count"),
  clientsSatisfaction: formatStat(rawStats.clientsSatisfaction, "percentage"),
  dailyBookings: formatStat(rawStats.dailyBookings, "count"),
};

// Stats array with labels for display
export interface StatItem {
  label: string;
  value: string;
}

export const statsWithLabels: StatItem[] = [
  { label: "Total Bookings", value: companyStats.totalBookings },
  { label: "Models In Stock", value: companyStats.modelsInStock },
  { label: "Happy Clients", value: companyStats.clientsSatisfaction },
  { label: "Daily Bookings", value: companyStats.dailyBookings },
];
