import { Metadata } from "next";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutStorySection from "@/components/sections/about/AboutStorySection";
import AboutShowroomSection from "@/components/sections/about/AboutShowroomSection";
import { statsWithLabels } from "@/lib/data/stats";

export const metadata: Metadata = {
  title: "About TONSOFT — We Build Software That Scales",
  description:
    "Learn about TONSOFT, a software consultancy founded by a Senior Software Engineer with 8+ years at Amazon Web Services and Tamara Finance. Discover our mission, values, and engineering approach.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AboutHeroSection />

      {/* Who We Are */}
      <AboutStorySection
        label="Who We Are"
        title="Founder-Led. Enterprise-Tested."
        paragraphs={[
          "TONSOFT is a software consultancy founded by Jalaldeen Ahamed Nibras, a software engineer who spent over four years at Amazon Web Services building the billing infrastructure that supports AWS itself, followed by a role leading fintech platform modernization at Tamara Finance, one of the Middle East's largest Buy-Now-Pay-Later providers.",
          "We bring that same engineering discipline — architecture decision records, fault-tolerant design, production-readiness rigor — to every client engagement, combining deep cloud architecture expertise with product-driven engineering to deliver software systems that scale with your business from day one.",
        ]}
        imagePosition="left"
        useGradientPanel={true}
      />

      {/* Our Numbers */}
      <AboutStorySection
        label="Our Numbers"
        title="Key Milestones That Define Our Journey"
        stats={statsWithLabels}
        imagePosition="right"
        imageSrc="/our-numbers.jpg"
        imageAlt="TONSOFT achievements and growth metrics"
      />

      {/* Vision Section */}
      <AboutShowroomSection />
    </div>
  );
}
