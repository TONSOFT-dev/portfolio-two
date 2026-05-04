import { Metadata } from "next";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutStorySection from "@/components/sections/about/AboutStorySection";
import AboutShowroomSection from "@/components/sections/about/AboutShowroomSection";
import { statsWithLabels } from "@/lib/data/stats";

export const metadata: Metadata = {
  title: "About Us - Women-Centric Luxury Car Rental",
  description:
    "Learn about Falconics Pink, Dubai's premier women-centric luxury car rental service. Discover our mission, values, and commitment to providing safe, comfortable, and luxurious transportation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AboutHeroSection />

      {/* Story Section - Who We Are */}
      <AboutStorySection
        imageSrc="/images/about/who-we-are.jpg"
        imageAlt="Luxury cars"
        label="Who We Are"
        title="Falconics Pink is Crafted for Women Who Expect More Than Just a Ride."
        paragraphs={[
          "Enjoy a world-class fleet, smooth bookings, trusted support, and a service experience tailored exclusively for women in the UAE. We combine comfort, reliability, and elegance so every drive feels effortless.",
        ]}
        imagePosition="left"
      />

      {/* Story Section - Our Numbers */}
      <AboutStorySection
        imageSrc="/images/about/our-numbers.jpg"
        imageAlt="Our Numbers"
        label="Our Numbers"
        title="Key Statistics That Define Our Journey"
        stats={statsWithLabels}
        imagePosition="right"
      />

      {/* Showroom Section */}
      <AboutShowroomSection />
    </div>
  );
}
