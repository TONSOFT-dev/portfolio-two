import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers — Build the Future with TONSOFT",
  description:
    "Join TONSOFT and work on challenging distributed systems, cloud infrastructure, and scalable software products.",
};

const openRoles = [
  {
    title: "Backend Engineer (Node.js / Java)",
    type: "Full-time",
    mode: "Remote",
    description:
      "Design and build high-performance backend systems, APIs, and microservices. You will work closely with the founding team on architecture decisions and production systems.",
    requirements: [
      "3+ years of backend development experience",
      "Proficiency in Node.js or Java",
      "Experience with distributed systems and APIs",
      "Strong understanding of system design principles",
    ],
  },
  {
    title: "Cloud & DevOps Engineer",
    type: "Full-time",
    mode: "Remote",
    description:
      "Own our cloud infrastructure on AWS, build and maintain CI/CD pipelines, and drive infrastructure automation using modern DevOps tooling.",
    requirements: [
      "3+ years of AWS experience",
      "Proficiency with Docker, Kubernetes, and Terraform",
      "Experience with GitHub Actions or similar CI/CD",
      "Strong Linux and networking fundamentals",
    ],
  },
  {
    title: "Full Stack Developer",
    type: "Full-time",
    mode: "Remote",
    description:
      "Build end-to-end product features spanning both frontend and backend. Work on our own products and client projects using modern React and Node.js stacks.",
    requirements: [
      "3+ years of full stack experience",
      "Proficiency in React/Next.js and Node.js",
      "Experience with PostgreSQL or similar databases",
      "Passion for clean code and great UX",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <SectionHeader text="Careers" center />
            <FadeIn delay={0.1}>
              <h1
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] font-bold text-pure leading-[1.2] mt-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Build the Future
                <br />
                <span style={{ color: "#FE8F04" }}>with TONSOFT</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We are always looking for passionate engineers who want to work on challenging,
                meaningful problems. If you love distributed systems, cloud infrastructure, or
                building scalable products — we want to hear from you.
              </p>
            </FadeIn>
          </div>

          {/* Open Roles */}
          <div className="space-y-6 mb-16">
            {openRoles.map((role, index) => (
              <FadeIn key={role.title} delay={index * 0.15} direction="up">
                <div
                  className="group rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                  style={{ background: "#122840", borderColor: "rgba(254,143,4,0.15)" }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "radial-gradient(circle at top right, rgba(254,143,4,0.06), transparent 60%)" }}
                  />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: Job info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2
                          className="text-pure text-xl sm:text-2xl font-bold"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {role.title}
                        </h2>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "rgba(254,143,4,0.15)",
                            color: "#FE8F04",
                            border: "1px solid rgba(254,143,4,0.3)",
                          }}
                        >
                          {role.type}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "rgba(148,163,184,0.1)",
                            color: "#94A3B8",
                            border: "1px solid rgba(148,163,184,0.2)",
                          }}
                        >
                          🌍 {role.mode}
                        </span>
                      </div>
                      <p className="text-slate text-sm sm:text-base leading-relaxed mb-4">
                        {role.description}
                      </p>
                      <ul className="space-y-1">
                        {role.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-2 text-slate text-sm">
                            <span style={{ color: "#FE8F04" }} className="mt-0.5">▸</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: CTA */}
                    <div className="lg:shrink-0">
                      <Button
                        href="/contact"
                        variant="outline"
                        className="text-solis border-solis hover:bg-transparent hover:text-solis w-full lg:w-auto"
                        arrowBgClassName="bg-solis"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* General Application */}
          <FadeIn delay={0.3}>
            <div
              className="text-center rounded-3xl p-12 border"
              style={{ background: "rgba(254,143,4,0.05)", borderColor: "rgba(254,143,4,0.2)" }}
            >
              <h2
                className="text-2xl sm:text-3xl font-bold text-pure mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Don&apos;t see your role?
              </h2>
              <p className="text-slate text-base mb-6 max-w-lg mx-auto">
                We&apos;re always open to talented engineers. Send us your profile and tell us how
                you&apos;d like to contribute to TONSOFT.
              </p>
              <Button
                href="/contact"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis"
                arrowBgClassName="bg-solis"
              >
                Send Open Application
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
