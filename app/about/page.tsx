import { Metadata } from "next";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutStorySection from "@/components/sections/about/AboutStorySection";
import AboutShowroomSection from "@/components/sections/about/AboutShowroomSection";
import { statsWithLabels } from "@/lib/data/stats";

export const metadata: Metadata = {
  title: "About TONSOFT — We Build Software That Scales",
  description:
    "Learn about TONSOFT, a modern software development company founded by a former Senior Engineer at Amazon Web Services. Discover our mission, values, and engineering approach.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AboutHeroSection />

      {/* Who We Are */}
      <AboutStorySection
        label="Who We Are"
        title="TONSOFT Brings Global Engineering Standards to Every Project."
        paragraphs={[
          "TONSOFT is a next-generation software development company focused on building reliable, scalable, and secure systems for modern businesses. Founded by a former Senior Engineer at Amazon Web Services, TONSOFT brings global engineering standards to every project — ensuring reliability, performance, and security.",
          "We combine deep cloud architecture expertise with product-driven engineering to deliver software systems that scale with your business from day one.",
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
