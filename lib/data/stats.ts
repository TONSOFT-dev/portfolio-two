import { CompanyStats } from "@/types";
import { formatStat } from "@/lib/utils";

// TONSOFT company stats
const rawStats = {
  yearsExperience: 7,
  projectsDelivered: 50,
  cloudArchitectures: 10,
  satisfactionRate: 100,
};

export const companyStats: CompanyStats = {
  totalBookings: formatStat(rawStats.yearsExperience, "count"),
  modelsInStock: formatStat(rawStats.projectsDelivered, "count"),
  clientsSatisfaction: formatStat(rawStats.cloudArchitectures, "count"),
  dailyBookings: formatStat(rawStats.satisfactionRate, "percentage"),
};

export interface StatItem {
  label: string;
  value: string;
}

export const statsWithLabels: StatItem[] = [
  { label: "Years Experience", value: "7+" },
  { label: "Projects Delivered", value: "50+" },
  { label: "Cloud Architectures", value: "10+" },
  { label: "Client Satisfaction", value: "100%" },
];
