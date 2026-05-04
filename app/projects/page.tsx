import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Projects — TONSOFT Portfolio",
  description: "Explore the systems TONSOFT has engineered — cloud, backend, DevOps.",
};

const projects = [
  {
    id: "1",
    name: "High-Availability Event Platform",
    category: "Cloud Architecture",
    description:
      "Multi-region, event-driven platform on AWS processing millions of events per day with sub-100ms latency. Active-active failover using Lambda, Kinesis, SQS, and DynamoDB.",
    techStack: ["AWS Lambda", "Kinesis", "SQS", "DynamoDB", "CloudFront"],
    metrics: ["99.99% uptime", "< 100ms P99", "10M+ events/day"],
    status: "Delivered",
  },
  {
    id: "2",
    name: "Microservices Migration",
    category: "System Design",
    description:
      "Led migration of a monolithic enterprise app to microservices on ECS/Fargate with service mesh, distributed tracing, and automated CI/CD — zero downtime.",
    techStack: ["AWS ECS", "Docker", "GitHub Actions", "PostgreSQL", "Redis"],
    metrics: ["0 downtime incidents", "65% cost reduction", "12 services"],
    status: "Delivered",
  },
  {
    id: "3",
    name: "FinTech API Platform",
    category: "Backend Engineering",
    description:
      "Secure financial API platform for payment processing, reconciliation, and reporting. PCI-DSS compliant with end-to-end encryption via AWS KMS.",
    techStack: ["Node.js", "API Gateway", "RDS", "KMS", "WAF"],
    metrics: ["PCI-DSS compliant", "100K+ calls/day", "< 50ms avg"],
    status: "Delivered",
  },
  {
    id: "4",
    name: "DevOps Automation Suite",
    category: "DevOps",
    description:
      "Full CI/CD infrastructure with automated testing, blue-green production releases, and Terraform-managed infrastructure provisioning.",
    techStack: ["Terraform", "GitHub Actions", "Docker", "AWS", "Kubernetes"],
    metrics: ["4h → 8min deploys", "100% automated tests", "Zero manual ops"],
    status: "Delivered",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="text-center mb-16">
            <SectionHeader text="Projects" center />
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-pure leading-[1.2] mt-4" style={{ fontFamily: "var(--font-syne)" }}>
                Systems We&apos;ve Engineered
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                A selection of production systems and platforms we have designed, built, and delivered.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.12} direction="up">
                <div className="group relative h-full rounded-3xl p-8 border overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col" style={{ background: "#122840", borderColor: "rgba(254,143,4,0.15)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(254,143,4,0.08), transparent 60%)" }} />
                  <div className="relative z-10 flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-slate text-xs uppercase tracking-widest">{project.category}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(254,143,4,0.15)", color: "#FE8F04", border: "1px solid rgba(254,143,4,0.3)" }}>✓ {project.status}</span>
                    </div>
                    <h2 className="text-pure text-xl sm:text-2xl font-bold leading-tight group-hover:text-solis transition-colors duration-300" style={{ fontFamily: "var(--font-syne)" }}>{project.name}</h2>
                    <p className="text-slate text-sm leading-relaxed flex-1">{project.description}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map((metric) => (
                        <div key={metric} className="text-center p-2 rounded-xl" style={{ background: "rgba(254,143,4,0.08)", border: "1px solid rgba(254,143,4,0.15)" }}>
                          <p className="text-solis text-xs font-semibold leading-tight">{metric}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded text-xs text-slate" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <p className="text-slate text-lg mb-6">Ready to add your project to this list?</p>
              <Button href="/contact" variant="outline" className="text-solis border-solis hover:bg-transparent hover:text-solis" arrowBgClassName="bg-solis">
                Start a Project
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
