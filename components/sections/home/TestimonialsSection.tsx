"use client";

import { useRef } from "react";
import { testimonials } from "@/lib/data/testimonials";
import TestimonialCard from "@/components/ui/TestimonialCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import MovingTestimonials from "@/components/animations/MovingTestimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !headerRef.current ||
        !titleRef.current ||
        !gridRef.current
      )
        return;

      // Header animation
      gsap.set(headerRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.95,
      });

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Title animation
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -20,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Grid columns reveal with stagger
      const columns = [
        column1Ref.current,
        column2Ref.current,
        column3Ref.current,
      ].filter(Boolean) as HTMLElement[];

      gsap.set(columns, {
        opacity: 0,
        y: 50,
        scale: 0.95,
      });

      gsap.to(columns, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Parallax effect on scroll
      columns.forEach((column, index) => {
        if (!column) return;

        gsap.to(column, {
          y: index % 2 === 0 ? -20 : 20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-noir overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-solis/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-solis/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Header - Centered */}
        <div
          ref={headerRef}
          className="w-full text-center mb-12 sm:mb-16 md:mb-20"
        >
          <SectionHeader text="Testimonials" center />
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[46px] font-medium text-pure leading-[1.3] mt-4 sm:mt-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Trusted by Engineering Teams
            <br />
            Around the World
          </h2>
        </div>

        {/* Testimonials Grid - Full Width with Moving Animation */}
        <div ref={gridRef} className="relative">
          {/* Grid Layout - 1 col on small, 2 cols on md+, 3 cols on xl+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Column 1 */}
            <div
              ref={column1Ref}
              className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden"
            >
              <MovingTestimonials direction="up" speed={0.5}>
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </MovingTestimonials>
            </div>

            {/* Column 2 - Visible on md+ screens */}
            <div
              ref={column2Ref}
              className="hidden md:block relative h-[700px] lg:h-[800px] overflow-hidden"
            >
              <MovingTestimonials direction="down" speed={0.6}>
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index + testimonials.length}
                  />
                ))}
              </MovingTestimonials>
            </div>

            {/* Column 3 - Only visible on xl+ screens */}
            <div
              ref={column3Ref}
              className="hidden xl:block relative h-[800px] overflow-hidden"
            >
              <MovingTestimonials direction="up" speed={0.7}>
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index + testimonials.length * 2}
                  />
                ))}
              </MovingTestimonials>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
