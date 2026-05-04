"use client";

import { useState } from "react";
import { services } from "@/lib/data/services";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Code2, Cloud, Settings, Shield } from "lucide-react";

const serviceIcons = [Code2, Cloud, Settings, Shield];
const categories = ["All", "Engineering", "Infrastructure", "Architecture", "Security"];

export default function ServicesPage() {
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All"
    ? services
    : services.filter((s) => s.category === selected);

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12">
            <div className="flex-1">
              <SectionHeader text="Services" />
              <FadeIn delay={0.1}>
                <h1
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] font-bold text-pure leading-[1.2]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  What We Build
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl leading-relaxed">
                  We work with modern, battle-tested technologies to deliver production-grade
                  software systems tailored to your business needs.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Category Filter */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: selected === cat ? "#FE8F04" : "rgba(18,40,64,0.8)",
                    color: selected === cat ? "#0E2336" : "#94A3B8",
                    border: `1px solid ${selected === cat ? "#FE8F04" : "rgba(254,143,4,0.2)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((service, index) => {
              const IconComponent = serviceIcons[services.indexOf(service) % serviceIcons.length];
              return (
                <FadeIn key={service.id} delay={index * 0.1} direction="up">
                  <div
                    className="group relative h-full rounded-3xl p-8 border overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{ background: "#122840", borderColor: "rgba(254,143,4,0.15)" }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: "radial-gradient(circle at top right, rgba(254,143,4,0.08), transparent 60%)" }}
                    />

                    <div className="relative z-10 flex flex-col gap-5 h-full">
                      {/* Top row */}
                      <div className="flex items-start justify-between">
                        <div
                          className="flex items-center justify-center w-14 h-14 rounded-2xl border"
                          style={{ background: "rgba(254,143,4,0.1)", borderColor: "rgba(254,143,4,0.3)" }}
                        >
                          <IconComponent className="w-7 h-7" style={{ color: "#FE8F04" }} strokeWidth={1.5} />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "rgba(254,143,4,0.15)",
                            color: "#FE8F04",
                            border: "1px solid rgba(254,143,4,0.3)",
                          }}
                        >
                          {service.badge}
                        </span>
                      </div>

                      <p className="text-slate text-xs font-medium uppercase tracking-widest">{service.category}</p>

                      <h2
                        className="text-pure text-xl sm:text-2xl font-bold leading-tight group-hover:text-solis transition-colors duration-300"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {service.name}
                      </h2>

                      <p className="text-slate text-sm leading-relaxed flex-1">{service.description}</p>

                      {/* Highlights */}
                      <ul className="space-y-1">
                        {service.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-slate text-sm">
                            <span style={{ color: "#FE8F04" }}>▸</span> {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack chips */}
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs text-slate"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Button
                        href="/contact"
                        variant="outline"
                        className="text-solis border-solis hover:bg-transparent hover:text-solis w-full sm:w-auto"
                        arrowBgClassName="bg-solis"
                      >
                        Start a Project
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
