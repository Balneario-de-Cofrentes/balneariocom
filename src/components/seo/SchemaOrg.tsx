interface SchemaOrgProps {
  type?: "website" | "localbusiness";
  pageUrl?: string;
  pageName?: string;
  description?: string;
}

export function SchemaOrg({ type = "website", pageUrl, pageName, description }: SchemaOrgProps) {
  const baseUrl = "https://balneario.com";
  const resolvedUrl = pageUrl || baseUrl;
  const resolvedName = pageName || "Balneario de Cofrentes";
  const resolvedDescription =
    description ||
    "Balneario de Cofrentes, la clinica de longevidad mas grande de Europa. Tratamientos termales, medicina regenerativa y programas de salud personalizados.";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: resolvedName,
    url: resolvedUrl,
    description: resolvedDescription,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: resolvedName,
    image: `${baseUrl}/images/og-image.jpg`,
    url: resolvedUrl,
    description: resolvedDescription,
    telephone: "+34 96 189 40 25",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Balneario s/n",
      addressLocality: "Cofrentes",
      addressRegion: "Valencia",
      postalCode: "46625",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.2333,
      longitude: -1.0167,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    priceRange: "65€ - 200€ por dia",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.3,
      reviewCount: 1200,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const schema = type === "localbusiness" ? localBusinessSchema : websiteSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalServiceSchema({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Balneario de Cofrentes",
      url: "https://balneario.com",
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
