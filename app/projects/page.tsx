import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Track Record — TONSOFT",
  description:
    "The systems our founder built at Amazon Web Services and Tamara Finance before founding TONSOFT — real production work at real scale.",
};

const projects = [
  {
    id: "1",
    name: "Fintech Platform Modernization",
    category: "Fintech",
    org: "Tamara Finance",
    description:
      "A consumer-finance platform running on a legacy PHP monolith struggled with reliability and slow product launches. Migrated core BNPL workflows to a distributed Java microservices architecture with service isolation and fault-tolerant orchestration, and transitioned the data layer from relational SQL to NoSQL with Redis caching for checkout workloads.",
    techStack: ["Java", "Microservices", "NoSQL", "Redis", "Service Isolation"],
    metrics: ["83% → 99.9% uptime", "4mo → 2wk product dev", "BNPL workflows"],
  },
  {
    id: "2",
    name: "Global-Scale Billing Infrastructure",
    category: "Cloud Infrastructure",
    org: "AWS",
    description:
      "AWS needed to launch billing services in new cloud regions faster, coordinating across dozens of internal teams. Redesigned the region-launch process end-to-end, introducing new tooling and workflows across 50+ global teams.",
    techStack: ["AWS", "Billing Systems", "Region-Launch Tooling", "Cross-Team Coordination"],
    metrics: ["18mo → 5 days", "110x faster", "50+ teams coordinated"],
  },
  {
    id: "3",
    name: "Data Warehouse Re-architecture",
    category: "Data Infrastructure",
    org: "AWS",
    description:
      "A legacy billing data warehouse had become a performance bottleneck. Rearchitected the platform end-to-end to eliminate structural inefficiencies in storage and batch processing.",
    techStack: ["AWS", "Data Warehousing", "Batch Processing", "Storage Optimization"],
    metrics: ["90% storage reduction", "12hr → 1.5hr exports", "8x faster"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="text-center mb-16">
            <SectionHeader text="Track Record" center />
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-pure leading-[1.2] mt-4" style={{ fontFamily: "var(--font-syne)" }}>
                The Track Record Behind TONSOFT
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                TONSOFT is a new consultancy, but not a new team. Before founding TONSOFT, our
                founder built and shipped the systems below at Amazon Web Services and Tamara
                Finance — real production systems, at real scale.
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
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(254,143,4,0.15)", color: "#FE8F04", border: "1px solid rgba(254,143,4,0.3)" }}>{project.org}</span>
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
              <p className="text-slate text-lg mb-6">Ask us for direct references from this work — we&apos;re happy to connect you.</p>
              <Button href="/contact" variant="outline" className="text-solis border-solis hover:bg-transparent hover:text-solis" arrowBgClassName="bg-solis">
                Book a Technical Consultation
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
