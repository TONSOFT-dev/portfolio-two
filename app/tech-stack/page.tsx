import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Tech Stack — Technologies We Use",
  description:
    "TONSOFT works with modern, battle-tested technologies across backend, cloud, DevOps, and architecture layers.",
};

const techCategories = [
  {
    label: "Backend",
    color: "#FE8F04",
    techs: [
      { name: "Java", desc: "Enterprise-grade backend systems" },
      { name: "Node.js", desc: "High-throughput APIs & microservices" },
      { name: "Python", desc: "Data processing & automation" },
    ],
  },
  {
    label: "Cloud (AWS)",
    color: "#FF9900",
    techs: [
      { name: "AWS Lambda", desc: "Serverless compute at scale" },
      { name: "ECS / Fargate", desc: "Containerized workloads" },
      { name: "S3 & RDS", desc: "Storage & managed databases" },
      { name: "API Gateway", desc: "Managed API layer" },
      { name: "CloudFront", desc: "Global CDN" },
      { name: "CloudWatch", desc: "Observability & alerting" },
    ],
  },
  {
    label: "DevOps",
    color: "#2196F3",
    techs: [
      { name: "Docker", desc: "Container packaging & portability" },
      { name: "Kubernetes", desc: "Container orchestration at scale" },
      { name: "GitHub Actions", desc: "CI/CD pipeline automation" },
      { name: "Terraform", desc: "Infrastructure as code" },
      { name: "CI/CD Pipelines", desc: "Zero-downtime deployments" },
    ],
  },
  {
    label: "Architecture",
    color: "#9C27B0",
    techs: [
      { name: "Microservices", desc: "Independently deployable services" },
      { name: "Event-Driven", desc: "Async systems with Kafka/SQS" },
      { name: "REST APIs", desc: "Standard HTTP API design" },
      { name: "GraphQL", desc: "Flexible data querying layer" },
      { name: "CQRS / Event Sourcing", desc: "Advanced data patterns" },
    ],
  },
];

export default function TechStackPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <SectionHeader text="Technology" center />
            <FadeIn delay={0.1}>
              <h1
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] font-bold text-pure leading-[1.2] mt-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Our Technology Stack
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We work with modern, battle-tested technologies to deliver production-grade systems.
              </p>
            </FadeIn>
          </div>

          {/* Tech Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techCategories.map((category, catIndex) => (
              <FadeIn key={category.label} delay={catIndex * 0.15} direction="up">
                <div
                  className="rounded-3xl p-8 border h-full"
                  style={{ background: "#122840", borderColor: "rgba(254,143,4,0.15)" }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="h-1 w-8 rounded-full"
                      style={{ background: category.color }}
                    />
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-syne)", color: category.color }}
                    >
                      {category.label}
                    </h2>
                  </div>

                  {/* Tech list */}
                  <div className="space-y-3">
                    {category.techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center justify-between p-3 rounded-xl transition-colors duration-200 group"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: category.color }}
                          />
                          <span className="text-pure font-medium text-sm sm:text-base">{tech.name}</span>
                        </div>
                        <span className="text-slate text-xs sm:text-sm hidden sm:block">{tech.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom CTA */}
          <FadeIn delay={0.4}>
            <div className="text-center mt-16">
              <p className="text-slate text-lg mb-6">
                Want to see these technologies in action?
              </p>
              <Button
                href="/projects"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis"
                arrowBgClassName="bg-solis"
              >
                View Our Projects
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
