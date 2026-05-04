import { notFound } from "next/navigation";
import { cars } from "@/lib/data/cars";
import { CarModel } from "@/types";
import Container from "@/components/ui/Container";
import CarImageGallery from "@/components/ui/CarImageGallery";
import CarInfoHeader from "@/components/models/CarInfoHeader";
import CarAttributes from "@/components/models/CarAttributes";
import PricingCard from "@/components/models/PricingCard";
import CarSpecifications from "@/components/models/CarSpecifications";
import CarFeatures from "@/components/models/CarFeatures";
import RelatedModelsSection from "@/components/models/RelatedModelsSection";
import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";

export async function generateStaticParams() {
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.name} - Luxury Car Rental in Dubai`,
    description: `Rent the ${car.name} in Dubai. ${car.description}`,
    openGraph: {
      title: `${car.name} - Falconics Pink`,
      description: car.description,
      images: [car.image],
    },
  };
}

async function getCarData(slug: string): Promise<CarModel | null> {
  const car = cars.find((c) => c.slug === slug);
  return car || null;
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarData(slug);

  if (!car) {
    notFound();
  }

  const relatedCars = cars
    .filter((c) => c.brand === car.brand && c.id !== car.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 overflow-x-hidden">
      <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Main Content - 2 Equal Columns for Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Left Column - Information */}
          <div className="space-y-6 sm:space-y-8">
            <FadeIn>
              <CarInfoHeader car={car} />
            </FadeIn>
            <CarAttributes car={car} />
            <FadeIn delay={0.2}>
              <PricingCard car={car} />
            </FadeIn>
          </div>

          {/* Right Column - Car Image */}
          <div className="order-first lg:order-last">
            <FadeIn direction="right" delay={0.1}>
              <CarImageGallery
                images={car.images || [car.image]}
                mainImage={car.image}
                carName={car.name}
              />
            </FadeIn>
          </div>
        </div>

        {/* Specifications and Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-12">
          {/* Left - Specifications */}
          <div className="lg:col-span-2">
            <CarSpecifications car={car} />
          </div>

          {/* Right - Features */}
          <div className="lg:col-span-5">
            <CarFeatures car={car} />
          </div>
        </div>
      </Container>

      {/* Related Models */}
      <RelatedModelsSection relatedCars={relatedCars} brand={car.brand} />
    </div>
  );
}
