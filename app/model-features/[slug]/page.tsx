"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarModel } from "@/types";
import ModelsGridCard from "@/components/ui/ModelsGridCard";
import ModelsGridCardSkeleton from "@/components/ui/ModelsGridCardSkeleton";
import ModelsFilters from "@/components/sections/models/ModelsFilters";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { cars } from "@/lib/data/cars";
import { slugify } from "@/lib/utils";

const brands = ["All", "Ford", "Mercedes-Benz", "Land Rover", "Dodge", "Jeep"];
const types = ["All", "Convertible", "Sedan", "SUV", "Pickup"];

// Get all unique features from cars
const getAllFeatures = (): string[] => {
  const featureSet = new Set<string>();
  cars.forEach((car) => {
    car.features?.forEach((feature) => featureSet.add(feature));
  });
  return ["All", ...Array.from(featureSet).sort()];
};

const features = getAllFeatures();

// Convert slug back to feature name
const getFeatureFromSlug = (slug: string): string | null => {
  const allFeatures = getAllFeatures().filter((f) => f !== "All");
  return allFeatures.find((feature) => slugify(feature) === slug) || null;
};

const ITEMS_PER_PAGE = 6;

export default function ModelFeaturesPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const featureName = getFeatureFromSlug(slug);

  const [carsData, setCarsData] = useState<CarModel[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFeature, setSelectedFeature] = useState(featureName || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync selectedFeature with URL slug when URL changes (browser back/forward)
  useEffect(() => {
    if (featureName && featureName !== selectedFeature) {
      setSelectedFeature(featureName);
    }
  }, [featureName, selectedFeature]);

  // Update URL when feature changes (user selection)
  useEffect(() => {
    if (
      selectedFeature &&
      selectedFeature !== "All" &&
      selectedFeature !== featureName
    ) {
      const newSlug = slugify(selectedFeature);
      router.push(`/model-features/${newSlug}`, { scroll: false });
    } else if (selectedFeature === "All") {
      router.push("/models", { scroll: false });
    }
  }, [selectedFeature, featureName, router]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/cars");

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCarsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    let filtered = carsData;

    // Filter by the feature from URL (featureName takes precedence)
    const activeFeature =
      featureName || (selectedFeature !== "All" ? selectedFeature : null);
    if (activeFeature) {
      filtered = filtered.filter((car) =>
        car.features?.includes(activeFeature)
      );
    }

    if (selectedBrand !== "All") {
      filtered = filtered.filter((car) => car.brand === selectedBrand);
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((car) => car.type === selectedType);
    }

    return filtered;
  }, [selectedBrand, selectedType, featureName, selectedFeature, carsData]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, selectedType, selectedFeature]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCars = filteredCars.slice(startIndex, endIndex);
  const hasMorePages = currentPage < totalPages;

  // Shared grid classes for DRY principle
  const gridClasses =
    "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6";

  if (!featureName) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
        <Container>
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="rounded-2xl border border-ashen/30 bg-coal backdrop-blur-sm p-8 sm:p-10 md:p-12">
              <p className="text-slate text-sm sm:text-base md:text-lg">
                Feature not found.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Filters and Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Left Side - Filters */}
            <div className="w-full lg:w-[280px] xl:w-[320px] lg:sticky lg:top-24 xl:top-28 lg:self-start">
              <ModelsFilters
                selectedBrand={selectedBrand}
                selectedType={selectedType}
                selectedFeature={selectedFeature}
                onBrandChange={setSelectedBrand}
                onTypeChange={setSelectedType}
                onFeatureChange={setSelectedFeature}
                brands={brands}
                types={types}
                features={features}
                title={`Models With ${featureName}`}
              />
            </div>

            {/* Right Side - Grid */}
            <div className="flex-1 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col">
              {error ? (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <p className="text-slate mb-4 text-sm sm:text-base">
                    Error: {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-solis hover:text-solis/80 underline text-sm sm:text-base"
                  >
                    Try again
                  </button>
                </div>
              ) : loading ? (
                <div className={gridClasses}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ModelsGridCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredCars.length === 0 ? (
                <FadeIn delay={0.2} direction="up">
                  <div className="text-center py-12 sm:py-16 md:py-20">
                    <div className="rounded-2xl border border-ashen/30 bg-coal backdrop-blur-sm p-8 sm:p-10 md:p-12">
                      <p className="text-slate text-sm sm:text-base md:text-lg">
                        No models found matching your criteria.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ) : (
                <>
                  <div className={gridClasses}>
                    {paginatedCars.map((car, index) => (
                      <ModelsGridCard key={car.id} car={car} index={index} />
                    ))}
                  </div>

                  {/* Bottom Right - Next Page */}
                  {hasMorePages && (
                    <FadeIn delay={0.2} direction="up">
                      <div className="mt-8 flex justify-end">
                        <Button
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          variant="rounded-outline"
                          showArrow={true}
                          className="text-pure border-pure w-3/5 md:w-1/3 lg:w-2/5"
                        >
                          Next Page
                        </Button>
                      </div>
                    </FadeIn>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
