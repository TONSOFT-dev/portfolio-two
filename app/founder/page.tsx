import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Founder — Ahamed Nibras Jalaldeen",
  description: "Meet the founder of TONSOFT — Ahamed Nibras Jalaldeen, former Senior SDE at Amazon Web Services.",
};

const skills = [
  "Distributed Systems",
  "AWS Cloud Architecture",
  "Event-Driven Systems",
  "DevOps & Automation",
  "Security Engineering",
  "Microservices",
];

const experience = [
  {
    role: "Senior Software Development Engineer",
    company: "Amazon Web Services (AWS)",
    location: "Berlin, Germany",
    description: "Built scalable, event-driven cloud systems and led high-availability architecture improvements for AWS infrastructure serving millions of customers globally.",
  },
  {
    role: "Software Engineer",
    company: "CodeGen",
    location: "Remote",
    description: "Delivered enterprise-grade software solutions for global clients across multiple industries.",
  },
  {
    role: "Freelance Software Developer",
    company: "Independent",
    location: "Remote",
    description: "Worked on diverse international projects across multiple domains including fintech, logistics, and SaaS platforms.",
  },
];

export default function FounderPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="mb-12">
            <SectionHeader text="Founder" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            {/* Avatar Panel */}
            <FadeIn direction="left">
              <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden" style={{ background: "#122840" }}>
                <div className="absolute rounded-full tonsoft-orb" style={{ width: "80%", height: "80%", top: "-20%", left: "-20%", background: "radial-gradient(circle, rgba(254,143,4,0.2) 0%, transparent 65%)", filter: "blur(60px)" }} />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(254,143,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold" style={{ background: "rgba(254,143,4,0.15)", border: "2px solid rgba(254,143,4,0.4)", color: "#FE8F04", fontFamily: "var(--font-syne)" }}>
                      ANJ
                    </div>
                    <p className="text-pure font-bold text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Ahamed Nibras</p>
                    <p className="text-pure font-bold text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Jalaldeen</p>
                    <p className="text-solis text-sm mt-2">Founder & CEO · Software Engineer</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Bio */}
            <FadeIn direction="right">
              <div>
                <FadeIn delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pure leading-[1.2] mb-6" style={{ fontFamily: "var(--font-syne)" }}>
                    The Engineer<br /><span style={{ color: "#FE8F04" }}>Behind TONSOFT</span>
                  </h1>
                </FadeIn>
                <p className="text-slate leading-relaxed mb-4">
                  Ahamed Nibras Jalaldeen is a Software Engineer with over 7 years of experience specializing in distributed systems, cloud computing, and DevOps. He has worked at Amazon Web Services (AWS) in Berlin, contributing to large-scale, high-availability systems.
                </p>
                <p className="text-slate leading-relaxed mb-8">
                  At TONSOFT, Nibras brings that same level of engineering discipline and ambition to every project — building systems that are not just functional, but resilient, scalable, and built to last.
                </p>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "rgba(254,143,4,0.12)", color: "#FE8F04", border: "1px solid rgba(254,143,4,0.3)" }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <Button href="/contact" variant="outline" className="text-solis border-solis hover:bg-transparent hover:text-solis" arrowBgClassName="bg-solis">
                  Work With Us
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Experience Timeline */}
          <FadeIn delay={0.2}>
            <div className="rounded-3xl p-8 border" style={{ background: "#122840", borderColor: "rgba(254,143,4,0.15)" }}>
              <h2 className="text-2xl font-bold text-pure mb-8" style={{ fontFamily: "var(--font-syne)" }}>Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ background: "#FE8F04" }} />
                      {index < experience.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: "rgba(254,143,4,0.2)" }} />}
                    </div>
                    <div className="pb-4">
                      <h3 className="text-pure font-semibold text-lg" style={{ fontFamily: "var(--font-syne)" }}>{exp.role}</h3>
                      <p className="text-solis text-sm font-medium mb-1">{exp.company} · {exp.location}</p>
                      <p className="text-slate text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
