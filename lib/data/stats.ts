import { CompanyStats } from "@/types";
import { formatStat } from "@/lib/utils";

// TONSOFT founder track-record stats — verifiable figures from AWS + Tamara Finance
const rawStats = {
  yearsExperience: 8,
  cloudArchitectures: 10,
  satisfactionRate: 100,
};

export const companyStats: CompanyStats = {
  totalBookings: formatStat(rawStats.yearsExperience, "count"),
  modelsInStock: formatStat(rawStats.yearsExperience, "count"),
  clientsSatisfaction: formatStat(rawStats.cloudArchitectures, "count"),
  dailyBookings: formatStat(rawStats.satisfactionRate, "percentage"),
};

export interface StatItem {
  label: string;
  value: string;
}

export const statsWithLabels: StatItem[] = [
  { label: "Years Enterprise Engineering", value: "8+" },
  { label: "Req/Sec Systems Shipped", value: "1M+" },
  { label: "AWS Cost Savings Delivered", value: "$10M" },
  { label: "Faster Region Launches", value: "110x" },
];
