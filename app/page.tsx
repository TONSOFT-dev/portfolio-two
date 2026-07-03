import HeroSection from "@/components/sections/home/HeroSection";
import StatsSection from "@/components/sections/home/StatsSection";
import FeaturedModelsSection from "@/components/sections/home/FeaturedModelsSection";
import WhyChooseUsSection from "@/components/sections/home/WhyChooseUsSection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import BlogPreviewSection from "@/components/sections/home/BlogPreviewSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedModelsSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <BlogPreviewSection />
    </>
  );
}
