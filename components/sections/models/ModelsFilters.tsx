"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import FilterDropdown from "@/components/ui/FilterDropdown";
import FadeIn from "@/components/animations/FadeIn";

interface ModelsFiltersProps {
  selectedBrand: string;
  selectedType: string;
  selectedFeature: string;
  onBrandChange: (brand: string) => void;
  onTypeChange: (type: string) => void;
  onFeatureChange: (feature: string) => void;
  brands: string[];
  types: string[];
  features: string[];
  title?: string;
}

export default function ModelsFilters({
  selectedBrand,
  selectedType,
  selectedFeature,
  onBrandChange,
  onTypeChange,
  onFeatureChange,
  brands,
  types,
  features,
  title = "Rydex Models",
}: ModelsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col gap-2">
        <SectionHeader text="MODELS" />
        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-pure leading-[1.3] transition-all duration-300 ease-out sm:duration-500 md:duration-700 lg:duration-1000">
            {title}
          </h2>
        </FadeIn>
      </div>

      {/* Filters - Dropdown on md and <md (2 cols on md), Accordion on lg+ */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <FadeIn delay={0.2} direction="up">
          <FilterDropdown
            title="Model Brand"
            options={brands}
            selectedValue={selectedBrand}
            onSelect={onBrandChange}
          />
        </FadeIn>
        <FadeIn delay={0.3} direction="up">
          <FilterDropdown
            title="Model Type"
            options={types}
            selectedValue={selectedType}
            onSelect={onTypeChange}
          />
        </FadeIn>
        <FadeIn delay={0.4} direction="up">
          <FilterDropdown
            title="Model Feature"
            options={features}
            selectedValue={selectedFeature}
            onSelect={onFeatureChange}
          />
        </FadeIn>
      </div>

      {/* Accordions - Desktop lg+ */}
      <div className="hidden lg:block space-y-3 sm:space-y-4">
        <FadeIn delay={0.2} direction="up">
          <Accordion title="Model Brand">
            {brands.map((brand) => (
              <AccordionItem
                key={brand}
                label={brand}
                value={brand}
                isSelected={selectedBrand === brand}
                onClick={() => onBrandChange(brand)}
              />
            ))}
          </Accordion>
        </FadeIn>
        <FadeIn delay={0.3} direction="up">
          <Accordion title="Model Type">
            {types.map((type) => (
              <AccordionItem
                key={type}
                label={type}
                value={type}
                isSelected={selectedType === type}
                onClick={() => onTypeChange(type)}
              />
            ))}
          </Accordion>
        </FadeIn>
        <FadeIn delay={0.4} direction="up">
          <Accordion title="Model Feature">
            {features.map((feature) => (
              <AccordionItem
                key={feature}
                label={feature}
                value={feature}
                isSelected={selectedFeature === feature}
                onClick={() => onFeatureChange(feature)}
              />
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </div>
  );
}
