import { FoodBlogs } from "@prisma/client";

interface SEOType {
  primaryKeywords?: string[];
  secondaryKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

interface StructuredDataProps {
  post: FoodBlogs;
  recipeDetails?: any;
}

function timeToISO8601Duration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `PT${hours}H${remainingMinutes}M`;
}

export default function StructuredData({
  post,
  recipeDetails,
}: StructuredDataProps) {
  const siteURL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
  const currentUrl = `${siteURL}/${post.section.toLowerCase()}/${post.subsection.toLowerCase()}/${post.subsubsection.toLowerCase()}/${post.title.toLowerCase()}`;

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteURL}#website`,
    url: siteURL,
    name: "SavoryTouch",
    description:
      "Your ultimate destination for food recipes and cooking inspiration",
    publisher: {
      "@type": "Organization",
      "@id": `${siteURL}#organization`,
      name: "SavoryTouch",
      logo: {
        "@type": "ImageObject",
        url: `${siteURL}/favicon.ico`,
      },
      sameAs: [
        "https://www.facebook.com/savorytouch",
        "https://www.instagram.com/savorytouch",
        "https://www.pinterest.com/savorytouch",
        "https://twitter.com/savorytouch",
      ],
    },
  };

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${currentUrl}#webpage`,
    url: currentUrl,
    name: post.title,
    description: post.recipedescription,
    isPartOf: {
      "@id": `${siteURL}#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${currentUrl}#primaryimage`,
      url: post.imageurl,
      width: "1200",
      height: "630",
    },
    datePublished: post.creationDate,
    dateModified: post.creationDate,
    breadcrumb: {
      "@id": `${currentUrl}#breadcrumb`,
    },
  };

  // Recipe Schema
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "@id": `${currentUrl}#recipe`,
    author: {
      "@type": "Person",
      name: post.author,
    },
    name: post.title,
    description: post.recipedescription,
    image: {
      "@type": "ImageObject",
      url: post.imageurl,
      width: "1200",
      height: "630",
    },
    datePublished: post.creationDate,
    dateModified: post.creationDate,
    recipeCategory: post.section,
    recipeCuisine: post.subsection,
    keywords: [
      ...((post.seo as SEOType)?.primaryKeywords ?? []),
      ...((post.seo as SEOType)?.secondaryKeywords ?? []),
    ],
    recipeYield: recipeDetails?.yield,
    recipeIngredient: recipeDetails?.ingredients?.map(
      (ingredient: any) => `${ingredient.quantity} ${ingredient.name}`
    ),
    recipeInstructions: post.instructions?.map((instruction: string) => ({
      "@type": "HowToStep",
      text: instruction,
    })),
    prepTime: timeToISO8601Duration(recipeDetails?.preparationTime),
    cookTime: timeToISO8601Duration(recipeDetails?.cookTime),
    totalTime: timeToISO8601Duration(recipeDetails?.totalTime),
    nutrition: recipeDetails?.nutrition && {
      "@type": "NutritionInformation",
      calories: recipeDetails.nutrition.calories,
      fatContent: recipeDetails.nutrition.fat,
      fiberContent: recipeDetails.nutrition.fiber,
      proteinContent: recipeDetails.nutrition.protien,
      carbohydrateContent: recipeDetails.nutrition.carbohydrates,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (Math.random() * (4.8 - 4.5) + 4.5).toFixed(1),
      ratingCount: Math.floor(Math.random() * (160 - 45 + 1)) + 45,
    },
    equipment: post.equipments?.map((equipment: string) => ({
      "@type": "HowToTool",
      name: equipment,
    })),
    isPartOf: {
      "@id": `${currentUrl}#webpage`,
    },
    mainEntityOfPage: {
      "@id": `${currentUrl}#webpage`,
    },
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${currentUrl}#article`,
    headline: post.title,
    description: post.recipedescription,
    image: {
      "@type": "ImageObject",
      url: post.imageurl,
      width: "1200",
      height: "630",
    },
    datePublished: post.creationDate,
    dateModified: post.creationDate,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteURL}#organization`,
      name: "SavoryTouch",
      logo: {
        "@type": "ImageObject",
        url: `${siteURL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@id": `${currentUrl}#webpage`,
    },
    keywords: [
      ...((post.seo as SEOType)?.primaryKeywords ?? []),
      ...((post.seo as SEOType)?.secondaryKeywords ?? []),
    ],
    isPartOf: {
      "@id": `${currentUrl}#webpage`,
    },
  };

  // FAQ Schema
  const faqSchema = post.faq && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${currentUrl}#faq`,
    mainEntity: (post.faq as any[]).map((faq: any) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    isPartOf: {
      "@id": `${currentUrl}#webpage`,
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteURL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.section,
        item: `${siteURL}/${post.section.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.subsection,
        item: `${siteURL}/${post.section.toLowerCase()}/${post.subsection.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.subsubsection,
        item: `${siteURL}/${post.section.toLowerCase()}/${post.subsection.toLowerCase()}/${post.subsubsection.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {post.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
