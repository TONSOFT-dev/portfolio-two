"use client";

import { useRef } from "react";
import Image from "next/image";
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
  const bgImageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax Background Image
      gsap.fromTo(
        bgImageRef.current,
        {
          yPercent: -15,
          scale: 1.15,
        },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, // Smoother inertia
          },
        }
      );

      // Card "Floating" Parallax (moves slightly faster/slower than scroll)
      gsap.fromTo(
        cardRef.current,
        {
          y: 50,
        },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, // Heavier, more luxurious inertia
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden overflow-x-hidden bg-coal"
    >
      {/* Background Images Wrapper - Parallax Target */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full">
        {/* Desktop Image */}
        <div className="hidden lg:block absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 rounded-2xl overflow-hidden will-change-transform">
          <Image
            src="/images/about/our-showroom.webp"
            alt="Our Showroom"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Subtle overlay for better text readability if needed, though card has its own */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 rounded-2xl overflow-hidden will-change-transform">
          <Image
            src="/images/about/our-showroom.webp"
            alt="Our Showroom"
            fill
            priority
            className="object-cover object-left"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>

      {/* Content - Left Aligned Card */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        <div className="absolute inset-0 m-3 md:m-3 lg:m-4 xl:m-5 flex items-center">
          <div className="w-full max-w-[1315px] mx-auto px-0 h-full flex items-center">
            <Container className="h-full flex items-center">
              <div
                ref={cardRef}
                className="pointer-events-auto bg-coal/85 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto max-h-[90%] flex flex-col will-change-transform"
              >
                <div className="mb-4">
                  <SectionHeader text="OUR SHOWROOM" />
                </div>

                <FadeIn delay={0.1}>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-medium text-pure leading-[1.2] mb-4 sm:mb-5 md:mb-6">
                    The Art of Luxury, Designed for Her
                  </h1>
                </FadeIn>

                <div className="flex-1 flex flex-col justify-end min-h-0">
                  <FadeIn delay={0.3}>
                    <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[280px] p-2 sm:p-3 md:p-4 rounded-lg overflow-hidden mb-3 sm:mb-4 group">
                      <Image
                        src="/images/about/our-showroom.webp"
                        alt="Our Showroom Interior"
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        quality={90}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 rounded-lg bg-linear-to-t from-coal/95 to-[rgba(8,8,5,0.2)]" />

                      {/* Address text above image */}
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 z-10">
                        <p className="text-pure text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg leading-relaxed font-light">
                          Fathima Al Suweidi - Warehouse No. 5, Street 54, Dubai
                          Investment Park 1, Dubai, United Arab Emirates
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.4} className="mt-auto">
                    <Button
                      href="/contact"
                      variant="outline"
                      className="text-solis border-solis hover:bg-transparent hover:text-solis w-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg"
                      arrowBgClassName="bg-solis"
                    >
                      Contact Us
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
