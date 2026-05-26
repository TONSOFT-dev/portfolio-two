"use client";

import { useState } from "react";
import { services } from "@/lib/data/services";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ServiceCard from "./ServiceCard";
import { Code2, CloudCog, Network, ShieldCheck } from "lucide-react";

const serviceIcons = [Code2, CloudCog, Network, ShieldCheck];
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
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filtered.map((service, index) => {
              const IconComponent = serviceIcons[services.indexOf(service) % serviceIcons.length];
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  icon={IconComponent}
                  index={index}
                />
              );
            })}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
