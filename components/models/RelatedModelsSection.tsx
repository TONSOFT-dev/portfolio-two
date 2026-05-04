import { CarModel } from "@/types";
import ModelsGridCard from "@/components/ui/ModelsGridCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

interface RelatedModelsSectionProps {
  relatedCars: CarModel[];
  brand: string;
}

export default function RelatedModelsSection({
  relatedCars,
}: RelatedModelsSectionProps) {
  if (relatedCars.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-noir overflow-x-hidden">
      <Container className="px-5 xl:px-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end gap-2 mb-8">
          <div className="flex flex-col gap-2 lg:col-span-8">
            <SectionHeader text="OUR MODELS" />
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-pure leading-[1.3]">
                Similar Models
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="up" className="lg:col-span-4">
            <div className="lg:flex lg:justify-end">
              <Button
                href="/models"
                variant="outline"
                className="text-solis border-solis hover:bg-transparent hover:text-solis w-full sm:w-auto md:w-1/2 lg:w-auto text-sm sm:text-base md:text-lg"
                arrowBgClassName="bg-solis"
              >
                See All Models
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {relatedCars.map((relatedCar, index) => (
            <ModelsGridCard
              key={relatedCar.id}
              car={relatedCar}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
