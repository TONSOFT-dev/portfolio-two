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
    name: "Custom Software Development",
    category: "Engineering",
    badge: "Enterprise-Grade",
    image: "/images/services/software-dev.jpg",
    shortDescription:
      "Web applications, backend systems, and API development engineered for scale and reliability.",
    description:
      "We design and build production-grade software systems from the ground up. Whether you need a high-performance API, a complex web application, or a full-stack platform — we deliver robust, maintainable, and scalable solutions using modern engineering practices.",
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
    slug: "cloud-and-devops",
    name: "Cloud & DevOps",
    category: "Infrastructure",
    badge: "Cloud-Native",
    image: "/images/services/cloud-devops.jpg",
    shortDescription:
      "AWS architecture design, CI/CD pipelines, and full infrastructure automation.",
    description:
      "From architecting multi-region AWS environments to building zero-downtime CI/CD pipelines, we bring AWS-level engineering to every infrastructure challenge. We design cloud systems that scale automatically, recover gracefully, and cost-optimize continuously.",
    techStack: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    highlights: [
      "AWS Well-Architected Framework",
      "Zero-downtime deployments",
      "Auto-scaling infrastructure",
      "Cost-optimized architecture",
    ],
  },
  {
    id: "3",
    slug: "system-design",
    name: "System Design",
    category: "Architecture",
    badge: "High Availability",
    image: "/images/services/system-design.jpg",
    shortDescription:
      "High availability systems, microservices architecture, and event-driven design patterns.",
    description:
      "We design distributed systems that handle millions of requests, remain available under failure conditions, and scale horizontally with demand. Our system design practice is grounded in real-world experience building large-scale infrastructure at Amazon Web Services.",
    techStack: ["Microservices", "Event-Driven", "Kafka", "Redis", "PostgreSQL"],
    highlights: [
      "99.99% availability targets",
      "Horizontal scaling by design",
      "Event-driven architecture",
      "Detailed architecture documentation",
    ],
  },
  {
    id: "4",
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
