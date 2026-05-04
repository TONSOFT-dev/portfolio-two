import { CarModel, BlogPost } from "@/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Falconics Pink",
    alternateName: "Falconics Pink Dubai",
    url: "https://www.falconicspink.com",
    logo: "https://www.falconicspink.com/logo.png",
    description:
      "Women-centric luxury car rental service in Dubai offering premium cars, trusted service, and seamless bookings.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ferhnya Al Suwedi - Warehouse No. 9, Street 54",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-50-905-2392",
      contactType: "customer service",
      email: "hello@falconicspink.com",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      "https://www.instagram.com/falconicspink",
      "https://twitter.com/falconicspink",
      "https://www.youtube.com/@falconicspink",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Falconics Pink",
    image: "https://www.falconicspink.com/logo.png",
    "@id": "https://www.falconicspink.com",
    url: "https://www.falconicspink.com",
    telephone: "+971-50-905-2392",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ferhnya Al Suwedi - Warehouse No. 9, Street 54",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
  };
}

export function carProductSchema(car: CarModel) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: car.name,
    image: car.images,
    description: car.description,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://www.falconicspink.com/models/${car.slug}`,
      priceCurrency: "AED",
      price: car.dailyRental,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Falconics Pink",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Transmission",
        value: car.transmission,
      },
      {
        "@type": "PropertyValue",
        name: "Fuel Type",
        value: car.fuelType,
      },
      {
        "@type": "PropertyValue",
        name: "Seats",
        value: car.seats.toString(),
      },
      {
        "@type": "PropertyValue",
        name: "Engine",
        value: car.engine,
      },
    ],
  };
}

export function blogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author === "falconics-pink" ? "Falconics Pink" : post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Falconics Pink",
      logo: {
        "@type": "ImageObject",
        url: "https://www.falconicspink.com/logo.png",
      },
    },
    description: post.excerpt,
    articleBody: post.content,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.falconicspink.com/blog/${post.slug}`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
