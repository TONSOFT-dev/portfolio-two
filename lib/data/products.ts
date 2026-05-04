// TONSOFT Products Data

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "In Development" | "Coming Soon" | "Live";
  category: string;
  techStack: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "fintech-automation-platform",
    name: "FinTech Automation Platform",
    tagline: "Intelligent financial workflow automation for modern businesses.",
    description:
      "A comprehensive platform for automating complex financial workflows — from reconciliation and reporting to compliance checks and payment processing. Built for scale and regulatory compliance from the ground up.",
    status: "In Development",
    category: "FinTech",
    techStack: ["Java", "AWS Lambda", "RDS", "Event-Driven", "REST APIs"],
  },
  {
    id: "2",
    slug: "ai-driven-analytics-engine",
    name: "AI-Driven Analytics Engine",
    tagline: "Actionable insights extracted from complex, high-volume data.",
    description:
      "A high-performance analytics engine that processes large-scale data streams in real-time, applying machine learning models to surface actionable business insights. Designed for low latency and high throughput.",
    status: "In Development",
    category: "AI / Analytics",
    techStack: ["Python", "AWS SageMaker", "Kinesis", "S3", "Redshift"],
  },
  {
    id: "3",
    slug: "devops-intelligence-suite",
    name: "DevOps Intelligence Suite",
    tagline: "Smart CI/CD pipeline management and infrastructure intelligence.",
    description:
      "An intelligent operations platform that monitors, analyzes, and optimizes CI/CD pipelines and cloud infrastructure. Surfaces anomalies, predicts failures, and suggests cost optimizations automatically.",
    status: "Coming Soon",
    category: "DevOps",
    techStack: ["Node.js", "GitHub Actions", "AWS CloudWatch", "Docker", "Kubernetes"],
  },
];
