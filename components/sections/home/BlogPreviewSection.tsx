"use client";

import { products } from "@/lib/data/products";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

export default function BlogPreviewSection() {
  return (
    <section className="py-20 bg-noir/50">
      <Container>
        <div className="w-full text-center mb-12 sm:mb-16 md:mb-20">
          <SectionHeader text="Products" center />
          <FadeIn delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[46px] font-medium text-pure leading-[1.3]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Products We&apos;re Building
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We are actively developing innovative products in fintech, automation, and AI-driven systems.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.15} direction="up">
              <div
                className="group relative h-full rounded-3xl p-8 border overflow-hidden transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "#122840",
                  borderColor: "rgba(254,143,4,0.15)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(254,143,4,0.08), transparent 60%)",
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4 h-full">
                  {/* Status badge */}
                  <span
                    className="self-start px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background:
                        product.status === "Coming Soon"
                          ? "rgba(148,163,184,0.15)"
                          : "rgba(254,143,4,0.15)",
                      color: product.status === "Coming Soon" ? "#94A3B8" : "#FE8F04",
                      border: `1px solid ${product.status === "Coming Soon" ? "rgba(148,163,184,0.3)" : "rgba(254,143,4,0.3)"}`,
                    }}
                  >
                    {product.status}
                  </span>

                  {/* Category */}
                  <p className="text-slate text-xs font-medium uppercase tracking-widest">
                    {product.category}
                  </p>

                  {/* Name */}
                  <h3
                    className="text-pure text-xl sm:text-2xl font-bold leading-tight group-hover:text-solis transition-colors duration-300"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate text-sm leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs text-slate"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="text-center">
            <Button
              href="/products"
              variant="outline"
              className="text-solis border-solis hover:bg-transparent hover:text-solis w-full md:w-1/2 lg:w-1/4 text-sm sm:text-base md:text-lg lg:text-lg"
              arrowBgClassName="bg-solis"
            >
              View All Products
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
