"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/ui/Container";
import { Mail, MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Mail,
    title: "hello@tonsoft.io",
    description:
      "Reach out anytime — our team responds swiftly and professionally to every inquiry.",
    link: "mailto:hello@tonsoft.io",
  },
  {
    icon: MapPin,
    title: "Sri Lanka · Available Globally Remote",
    description:
      "We work with clients worldwide. Remote-first, globally available across all time zones.",
    link: "#",
  },
  {
    icon: Clock,
    title: "Response within 24 hours",
    description:
      "We take every project seriously. Expect a thoughtful response within one business day.",
    link: "#",
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

      let resizeObserver: ResizeObserver | null = null;

      const syncHeights = () => {
        if (window.innerWidth >= 1024 && formRef.current && imageRef.current) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (formRef.current && imageRef.current) {
                formRef.current.style.height = "";
                imageRef.current.style.height = "";
                void formRef.current.offsetHeight;
                void imageRef.current.offsetHeight;
                const formHeight = formRef.current.offsetHeight;
                const imageHeight = imageRef.current.offsetHeight;
                const maxHeight = Math.max(formHeight, imageHeight);
                gsap.set([formRef.current, imageRef.current], {
                  height: maxHeight,
                  minHeight: maxHeight,
                });
              }
            });
          });
        } else {
          if (formRef.current && imageRef.current) {
            gsap.set([formRef.current, imageRef.current], {
              clearProps: "height,minHeight",
            });
          }
        }
      };

      syncHeights();

      if (formRef.current && imageRef.current) {
        resizeObserver = new ResizeObserver(() => { syncHeights(); });
        resizeObserver.observe(formRef.current);
        resizeObserver.observe(imageRef.current);
      }

      window.addEventListener("resize", syncHeights);

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => { setTimeout(syncHeights, 100); },
          }
        );
      }

      if (imageRef.current && imageInnerRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

        if (!isInViewport) {
          gsap.set(imageRef.current, { opacity: 0, x: -60, scale: 0.95 });
        }

        gsap.fromTo(
          imageRef.current,
          { opacity: isInViewport ? 1 : 0, x: isInViewport ? 0 : -60, scale: isInViewport ? 1 : 0.95 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out",
            immediateRender: !isInViewport,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => { setTimeout(syncHeights, 100); },
          }
        );

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

      if (contactMethodsRef.current) {
        const cards = contactMethodsRef.current.querySelectorAll("a, div[data-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: contactMethodsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      return () => {
        window.removeEventListener("resize", syncHeights);
        if (resizeObserver) { resizeObserver.disconnect(); }
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 z-10">
      <Container>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-4 xl:gap-4 items-stretch mb-12 sm:mb-16 md:mb-20">
          {/* Contact Form Column */}
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

          {/* Visual Column — TONSOFT branded panel */}
          <div
            ref={imageRef}
            className="hidden lg:block relative w-full h-[400px] sm:h-[500px] md:w-full md:h-[400px] md:aspect-square lg:h-auto lg:min-h-[600px] xl:min-h-[550px] lg:col-span-6 xl:col-span-5 rounded-2xl overflow-visible order-1 lg:order-2 will-change-transform z-50"
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl z-10">
              <div
                ref={imageInnerRef}
                className="absolute inset-0 will-change-transform z-20 rounded-2xl overflow-hidden"
                style={{ background: "#122840" }}
              >
                {/* Amber orbs */}
                <div
                  className="absolute rounded-full tonsoft-orb"
                  style={{
                    width: "80%", height: "80%",
                    top: "-20%", left: "-20%",
                    background: "radial-gradient(circle, rgba(254,143,4,0.2) 0%, transparent 65%)",
                    filter: "blur(60px)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "60%", height: "60%",
                    bottom: "-15%", right: "-10%",
                    background: "radial-gradient(circle, rgba(254,143,4,0.12) 0%, transparent 65%)",
                    filter: "blur(50px)",
                    animationDelay: "2s",
                  }}
                />
                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(254,143,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(254,143,4,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Centered logo text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p
                      className="text-7xl xl:text-8xl font-bold leading-none"
                      style={{ fontFamily: "var(--font-syne)", color: "rgba(254,143,4,0.12)" }}
                    >
                      TON
                    </p>
                    <p
                      className="text-7xl xl:text-8xl font-bold leading-none"
                      style={{ fontFamily: "var(--font-syne)", color: "rgba(254,143,4,0.08)" }}
                    >
                      SOFT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
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

function ContactMethodCard({ method }: { method: (typeof contactMethods)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !iconRef.current) return;

      const card = cardRef.current;
      const icon = iconRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, { scale: 0.97, y: -5, duration: 0.4, ease: "power2.out" });
        gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.4, ease: "back.out(1.7)" });
      };

      const handleMouseLeave = () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(icon, { scale: 1, rotation: 0, duration: 0.4, ease: "power2.out" });
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

  const isLink = method.link !== "#";

  const cardContent = (
    <>
      <div
        ref={iconRef}
        className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full p-px mb-4 will-change-transform"
        style={{
          background: "linear-gradient(135deg, #0E2336, #FE8F04)",
        }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{ background: "#122840" }}
        >
          <method.icon className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: "#FE8F04" }} />
        </div>
      </div>
      <h3 className="text-base font-medium text-pure mb-2">{method.title}</h3>
      <p className="text-slate text-sm lg:text-base leading-relaxed flex-1">{method.description}</p>
    </>
  );

  if (isLink) {
    return (
      <a
        href={method.link}
        target={method.link.startsWith("http") ? "_blank" : undefined}
        rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
        className="flex flex-col items-center text-center backdrop-blur-md p-5 rounded-2xl h-full shadow-lg will-change-transform cursor-pointer"
        style={{
          background: "rgba(18,40,64,0.6)",
          border: "1px solid rgba(254,143,4,0.15)",
        }}
      >
        {/* Wrap in div for ref */}
        <div ref={cardRef} className="flex flex-col items-center text-center w-full h-full">
          {cardContent}
        </div>
      </a>
    );
  }

  return (
    <div
      ref={cardRef}
      data-card="true"
      className="flex flex-col items-center text-center backdrop-blur-md p-5 rounded-2xl h-full shadow-lg will-change-transform"
      style={{
        background: "rgba(18,40,64,0.6)",
        border: "1px solid rgba(254,143,4,0.15)",
      }}
    >
      {cardContent}
    </div>
  );
}
