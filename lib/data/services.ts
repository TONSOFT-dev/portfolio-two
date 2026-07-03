// TONSOFT Services Data

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  badge: string;
  image: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export const services: Service[] = [
  {
    id: "1",
    slug: "custom-software-development",
    name: "Custom Software & Full-Stack Product Development",
    category: "Engineering",
    badge: "Enterprise-Grade",
    image: "/images/services/software-dev.jpg",
    shortDescription:
      "Web applications, backend systems, and full-stack product builds engineered for scale and reliability.",
    description:
      "We design and build production-grade software systems from the ground up — from a high-performance API to a complete full-stack platform. End-to-end build for startups needing a technical partner who thinks in production-readiness from day one, not just a feature factory.",
    techStack: ["Node.js", "Java", "Python", "REST APIs", "GraphQL"],
    highlights: [
      "Production-ready from day one",
      "Clean architecture principles",
      "Comprehensive test coverage",
      "Full documentation included",
    ],
  },
  {
    id: "2",
    slug: "legacy-modernization-microservices-migration",
    name: "Legacy Modernization & Microservices Migration",
    category: "Architecture",
    badge: "Battle-Tested Migrations",
    image: "/images/services/system-design.jpg",
    shortDescription:
      "Move off brittle monoliths without breaking production.",
    description:
      "We plan and execute phased migrations from legacy monoliths to distributed, cloud-native architectures — the same approach used to modernize a live fintech platform serving real transaction volume, without downtime.",
    techStack: ["Java", "Microservices", "Docker", "ECS/Fargate", "PostgreSQL"],
    highlights: [
      "Zero-downtime migration playbooks",
      "Phased, risk-managed rollouts",
      "Service isolation by design",
      "Proven on live production systems",
    ],
  },
  {
    id: "3",
    slug: "system-design",
    name: "High-Availability & Fault-Tolerant System Design",
    category: "Architecture",
    badge: "High Availability",
    image: "/images/services/system-design.jpg",
    shortDescription:
      "High availability systems, microservices architecture, and event-driven design patterns.",
    description:
      "For systems where downtime costs money — checkout flows, payment processing, transactional platforms — we design for graceful degradation, service isolation, and 99.9%+ uptime, grounded in real-world experience building large-scale infrastructure at Amazon Web Services.",
    techStack: ["Microservices", "Event-Driven", "Kafka", "Redis", "PostgreSQL"],
    highlights: [
      "99.9%+ availability targets",
      "Horizontal scaling by design",
      "Event-driven architecture",
      "Detailed architecture documentation",
    ],
  },
  {
    id: "4",
    slug: "cloud-devops-cost-optimization",
    name: "Cloud, DevOps & Cost Optimization",
    category: "Infrastructure",
    badge: "Cloud-Native",
    image: "/images/services/cloud-devops.jpg",
    shortDescription:
      "AWS architecture design, CI/CD pipelines, and infrastructure cost optimization.",
    description:
      "From architecting multi-region AWS environments to building zero-downtime CI/CD pipelines, we bring AWS-level engineering to every infrastructure challenge. Drawing on direct experience running large-scale AWS cost-optimization programs, we cut infrastructure spend without cutting performance.",
    techStack: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    highlights: [
      "AWS Well-Architected Framework",
      "Zero-downtime deployments",
      "Auto-scaling infrastructure",
      "Cost-optimized architecture",
    ],
  },
  {
    id: "5",
    slug: "data-layer-caching-strategy",
    name: "Data Layer & Caching Strategy",
    category: "Infrastructure",
    badge: "Built for Scale",
    image: "/images/services/cloud-devops.jpg",
    shortDescription:
      "SQL-to-NoSQL migrations, Redis-based caching, and data models built for scale from day one.",
    description:
      "We design data layers for high-throughput workloads — from relational-to-NoSQL migrations to Redis-based caching strategies for checkout and transactional flows — ensuring your data model scales with your business instead of becoming the bottleneck.",
    techStack: ["DynamoDB", "Redis", "PostgreSQL", "MongoDB", "Kinesis"],
    highlights: [
      "SQL-to-NoSQL migration playbooks",
      "Sub-100ms caching strategies",
      "Data models built for scale",
      "Zero customer-facing disruption",
    ],
  },
  {
    id: "6",
    slug: "security-solutions",
    name: "Security Solutions",
    category: "Security",
    badge: "Security-First",
    image: "/images/services/security.jpg",
    shortDescription:
      "Secure system design, data protection strategies, and infrastructure hardening.",
    description:
      "Security is not an afterthought — it's a core engineering principle at TONSOFT. We implement defense-in-depth strategies, conduct threat modeling, and build systems that protect sensitive data at rest and in transit. From IAM policies to encryption architectures, we cover every layer.",
    techStack: ["AWS IAM", "KMS", "WAF", "VPC", "TLS/SSL"],
    highlights: [
      "Threat modeling sessions",
      "OWASP compliance",
      "Encryption at every layer",
      "Security audit support",
    ],
  },
];
