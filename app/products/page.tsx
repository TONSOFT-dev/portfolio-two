import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products — TONSOFT",
  description:
    "Discover the products TONSOFT is actively building in fintech, automation, and AI-driven systems.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <SectionHeader text="Products" center />
            <FadeIn delay={0.1}>
              <h1
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] font-bold text-pure leading-[1.2] mt-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Products We&apos;re Building
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We are actively developing innovative products in fintech, automation,
                and AI-driven systems. Each product is built to solve a real problem at scale.
              </p>
            </FadeIn>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.15} direction="up">
                <div
                  className="group relative h-full rounded-3xl p-8 border overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  style={{ background: "#122840", borderColor: "rgba(254,143,4,0.15)" }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "radial-gradient(circle at top right, rgba(254,143,4,0.08), transparent 60%)" }}
                  />

                  <div className="relative z-10 flex flex-col gap-4 h-full">
                    {/* Status badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: product.status === "Coming Soon"
                            ? "rgba(148,163,184,0.15)"
                            : "rgba(254,143,4,0.15)",
                          color: product.status === "Coming Soon" ? "#94A3B8" : "#FE8F04",
                          border: `1px solid ${product.status === "Coming Soon" ? "rgba(148,163,184,0.3)" : "rgba(254,143,4,0.3)"}`,
                        }}
                      >
                        {product.status}
                      </span>
                      <span className="text-slate text-xs uppercase tracking-widest">{product.category}</span>
                    </div>

                    <h2
                      className="text-pure text-xl sm:text-2xl font-bold leading-tight group-hover:text-solis transition-colors duration-300"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {product.name}
                    </h2>

                    <p className="text-solis text-sm font-medium">{product.tagline}</p>

                    <p className="text-slate text-sm leading-relaxed flex-1">{product.description}</p>

                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.techStack.map((tech) => (
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

          {/* Bottom CTA */}
          <FadeIn delay={0.3}>
            <div className="text-center rounded-3xl p-12 border" style={{ background: "#122840", borderColor: "rgba(254,143,4,0.2)" }}>
              <h2
                className="text-2xl sm:text-3xl font-bold text-pure mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Have a product idea?
              </h2>
              <p className="text-slate text-base mb-6 max-w-lg mx-auto">
                We love building innovative software. If you have an idea you&apos;d like to bring to life,
                let&apos;s talk about it.
              </p>
              <Button
                href="/contact"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis"
                arrowBgClassName="bg-solis"
              >
                Get in Touch
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
