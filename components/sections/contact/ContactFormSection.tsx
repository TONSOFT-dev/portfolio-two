"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/ui/Container";
import { Phone, Mail, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Phone,
    title: "+971 50 905 2392",
    description:
      "Your dedicated support line for bookings, inquiries, and quick assistance.",
    link: "tel:+971509052392",
  },
  {
    icon: Mail,
    title: "hello@falconicspink.com",
    description:
      "Reach out anytime our team responds swiftly and professionally.",
    link: "mailto:hello@falconicspink.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description:
      "Instant help for bookings, model info, and personalized recommendations.",
    link: "https://wa.me/971509052392?text=Hello!%20I'm%20interested%20in%20learning%20more%20about%20Falconics%20Pink%20luxury%20car%20rentals.",
  },
];

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contactMethodsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Sync heights on large screens using ResizeObserver for better accuracy
      let resizeObserver: ResizeObserver | null = null;

      const syncHeights = () => {
        if (window.innerWidth >= 1024 && formRef.current && imageRef.current) {
          // Use double requestAnimationFrame to ensure all layout calculations are complete
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (formRef.current && imageRef.current) {
                // Temporarily clear any inline heights to get natural heights
                formRef.current.style.height = "";
                imageRef.current.style.height = "";

                // Force reflow to get accurate measurements
                void formRef.current.offsetHeight;
                void imageRef.current.offsetHeight;

                const formHeight = formRef.current.offsetHeight;
                const imageHeight = imageRef.current.offsetHeight;
                const maxHeight = Math.max(formHeight, imageHeight);

                // Always set both to the same height to ensure they match
                gsap.set([formRef.current, imageRef.current], {
                  height: maxHeight,
                  minHeight: maxHeight,
                });
              }
            });
          });
        } else {
          // Reset heights on smaller screens - clear inline styles to allow CSS classes to work
          if (formRef.current && imageRef.current) {
            gsap.set([formRef.current, imageRef.current], {
              clearProps: "height,minHeight",
            });
          }
        }
      };

      // Sync heights on load
      syncHeights();

      // Use ResizeObserver for more accurate height syncing
      if (formRef.current && imageRef.current) {
        resizeObserver = new ResizeObserver(() => {
          syncHeights();
        });
        resizeObserver.observe(formRef.current);
        resizeObserver.observe(imageRef.current);
      }

      // Also listen to window resize
      window.addEventListener("resize", syncHeights);

      // Form reveal animation with GSAP
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              // Sync heights after animation completes
              setTimeout(syncHeights, 100);
            },
          }
        );
      }

      // Image reveal animation with scale and parallax
      if (imageRef.current && imageInnerRef.current) {
        // Check if element is already in viewport to avoid opacity: 0 issue
        const rect = imageRef.current.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

        // Set initial state
        if (!isInViewport) {
          gsap.set(imageRef.current, {
            opacity: 0,
            x: -60,
            scale: 0.95,
          });
        }

        gsap.fromTo(
          imageRef.current,
          {
            opacity: isInViewport ? 1 : 0,
            x: isInViewport ? 0 : -60,
            scale: isInViewport ? 1 : 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            immediateRender: !isInViewport,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              // Sync heights after animation completes
              setTimeout(syncHeights, 100);
            },
          }
        );

        // Subtle parallax on image inner (only if image is visible)
        if (imageRef.current) {
          gsap.to(imageInnerRef.current, {
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      }

      // Contact methods cards stagger animation
      if (contactMethodsRef.current) {
        const cards = contactMethodsRef.current.querySelectorAll("a");
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: contactMethodsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cleanup
      return () => {
        window.removeEventListener("resize", syncHeights);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 z-10"
    >
      <Container>
        {/* Grid Layout: Contact Form and Image Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-4 xl:gap-4 items-stretch mb-12 sm:mb-16 md:mb-20">
          {/* Contact Form Column - 6 columns on lg, 7 columns on xl+ */}
          <div
            ref={formRef}
            className="w-full sm:w-full md:w-full lg:max-w-none mx-auto lg:mx-0 order-2 lg:order-1 lg:col-span-6 xl:col-span-7 flex flex-col justify-center will-change-transform"
          >
            <div className="flex-1 w-full flex items-center">
              <div className="w-full">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Image Column - 6 columns on lg, 5 columns on xl+ */}
          <div
            ref={imageRef}
            className="hidden lg:block relative w-full h-[400px] sm:h-[500px] md:w-full md:h-[400px] md:aspect-square lg:h-auto lg:min-h-[600px] xl:min-h-[550px] lg:col-span-6 xl:col-span-5 rounded-2xl overflow-visible order-1 lg:order-2 will-change-transform z-50"
          >
            <div className="absolute inset-0 overflow-visible z-10">
              <div
                ref={imageInnerRef}
                className="absolute inset-[8%] scale-100 sm:scale-100 md:scale-75 lg:scale-70 xl:scale-65 will-change-transform z-20 rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/logo/falconincs-crystal-logo-bg.png"
                  alt="Falconics Crystal Logo"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods - Full Width Below Form and Image */}
        <div ref={contactMethodsRef} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
            {contactMethods.map((method) => (
              <ContactMethodCard key={method.title} method={method} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// Separate component for contact method cards with GSAP hover effects
function ContactMethodCard({ method }: { method: (typeof contactMethods)[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !iconRef.current) return;

      const card = cardRef.current;
      const icon = iconRef.current;

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 0.97,
          y: -5,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef }
  );

  return (
    <a
      ref={cardRef}
      href={method.link}
      target={method.link.startsWith("http") ? "_blank" : undefined}
      rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex flex-col items-center text-center bg-coal/60 backdrop-blur-md p-5 border border-white/10 rounded-2xl hover:bg-coal/80 hover:border-white/20 h-full shadow-lg will-change-transform"
    >
      <div
        ref={iconRef}
        className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-linear-to-br from-noir to-solis p-px mb-4 will-change-transform"
      >
        <div className="w-full h-full rounded-full bg-coal flex items-center justify-center">
          <method.icon className="w-6 h-6 lg:w-7 lg:h-7 text-solis" />
        </div>
      </div>

      <h3 className="text-lg font-light text-pure mb-2">{method.title}</h3>

      <p className="text-slate text-sm lg:text-base leading-relaxed flex-1">
        {method.description}
      </p>
    </a>
  );
}
