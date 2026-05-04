"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutShowroomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden overflow-x-hidden"
      style={{ background: "#0E2336" }}
    >
      {/* Animated CSS gradient background (parallax target) */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 rounded-2xl overflow-hidden will-change-transform">
          {/* Base navy */}
          <div className="absolute inset-0" style={{ background: "#0A1C2E" }} />

          {/* Large amber orb top-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "70%",
              height: "70%",
              top: "-20%",
              right: "-10%",
              background:
                "radial-gradient(circle, rgba(254,143,4,0.18) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />

          {/* Amber orb bottom-left */}
          <div
            className="absolute rounded-full"
            style={{
              width: "50%",
              height: "50%",
              bottom: "-10%",
              left: "-5%",
              background:
                "radial-gradient(circle, rgba(254,143,4,0.10) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(254,143,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(14,35,54,0.7) 0%, transparent 60%)",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        <div className="absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 flex items-center">
          <div className="w-full max-w-[1315px] mx-auto px-0 h-full flex items-center">
            <Container className="h-full flex items-center">
              <div
                ref={cardRef}
                className="pointer-events-auto backdrop-blur-md border shadow-2xl rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto max-h-[90%] flex flex-col will-change-transform"
                style={{
                  background: "rgba(14,35,54,0.85)",
                  borderColor: "rgba(254,143,4,0.2)",
                }}
              >
                <div className="mb-4">
                  <SectionHeader text="OUR VISION" />
                </div>

                <FadeIn delay={0.1}>
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-bold text-pure leading-[1.2] mb-4 sm:mb-5 md:mb-6"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    World-Class Software,{" "}
                    <span style={{ color: "#FE8F04" }}>Built to Last</span>
                  </h2>
                </FadeIn>

                <div className="flex-1 flex flex-col justify-end min-h-0">
                  <FadeIn delay={0.2}>
                    <p className="text-slate text-sm sm:text-base leading-relaxed mb-4">
                      To build world-class software products that solve real-world problems
                      with performance, scalability, and simplicity.
                    </p>
                    <p className="text-slate text-sm sm:text-base leading-relaxed mb-6">
                      We deliver high-quality software solutions while continuously
                      innovating and adapting to emerging technologies — bringing
                      Amazon-level engineering standards to every project we touch.
                    </p>
                  </FadeIn>

                  {/* Values chips */}
                  <FadeIn delay={0.3}>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {["Innovation", "Reliability", "Security", "Performance"].map(
                        (value) => (
                          <span
                            key={value}
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: "rgba(254,143,4,0.12)",
                              color: "#FE8F04",
                              border: "1px solid rgba(254,143,4,0.3)",
                            }}
                          >
                            {value}
                          </span>
                        )
                      )}
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.4} className="mt-auto">
                    <Button
                      href="/contact"
                      variant="outline"
                      className="w-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-solis border-solis hover:bg-transparent hover:text-solis"
                      arrowBgClassName="bg-solis"
                    >
                      Work With Us
                    </Button>
                  </FadeIn>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
