"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import SplitTextReveal from "@/components/animations/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: -20 });
        tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0);
      }

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 30, scale: 0.95 });
        tl.to(
          titleRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          0.2
        );
      }

      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 20 });
        tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
      }

      if (titleRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            if (titleRef.current) {
              gsap.to(titleRef.current, {
                y: -30 * self.progress,
                ease: "none",
                duration: 0.1,
              });
            }
          },
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-noir relative z-0">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-20 pb-8 md:pb-12 lg:pb-16 bg-noir overflow-hidden relative z-0"
      >
        <Container>
          <div className="flex flex-col items-center text-center">
            <div ref={headerRef} className="will-change-transform">
              <SectionHeader text="Contact Us" center={true} />
            </div>
            <div style={{ fontFamily: "var(--font-syne)" }}>
              <SplitTextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[52px] xl:text-[60px] 2xl:text-[68px] font-bold text-pure leading-[1.2] mb-6"
                duration={0.8}
                stagger={0.01}
                ease="cubic-bezier(0.38, 0, 0.215, 1)"
                triggerStart="top 80%"
              >
                Let&apos;s Build Something Great
              </SplitTextReveal>
            </div>
            <SplitTextReveal
              as="p"
              className="text-slate text-lg max-w-2xl mx-auto"
              duration={0.8}
              stagger={0.01}
              ease="cubic-bezier(0.38, 0, 0.215, 1)"
              delay={0.3}
              triggerStart="top 80%"
            >
              Tell us about your project — we&apos;ll get back to you within 24 hours.
            </SplitTextReveal>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <ContactFormSection />
    </div>
  );
}
