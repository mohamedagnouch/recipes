import type { Metadata } from "next";
import { recipesData } from "../../data/recipes";

const BASE_URL = "https://dishora.net";

function toIsoDuration(timeStr?: string): string | undefined {
  if (!timeStr) return undefined;
  const hrMatch = timeStr.match(/(\d+)\s*hr/i);
  const minMatch = timeStr.match(/(\d+)\s*min/i);
  const hours = hrMatch ? parseInt(hrMatch[1], 10) : 0;
  const mins = minMatch ? parseInt(minMatch[1], 10) : 0;
  if (hours === 0 && mins === 0) return "PT0M";
  let res = "PT";
  if (hours > 0) res += `${hours}H`;
  if (mins > 0) res += `${mins}M`;
  return res;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipesData.find((r) => r.slug === slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | Dishora",
      description: "The requested recipe could not be found.",
    };
  }

  const metaDescription =
    recipe.leadText ||
    recipe.description.slice(0, 155).replace(/\s+/g, " ").trim();

  const imageUrl = recipe.imageUrl.startsWith("http")
    ? recipe.imageUrl
    : `${BASE_URL}${recipe.imageUrl}`;

  return {
    title: `${recipe.title} | Dishora`,
    description: metaDescription,
    alternates: {
      canonical: `/recipes/${slug}`,
    },
    openGraph: {
      title: `${recipe.title} | Dishora`,
      description: metaDescription,
      url: `${BASE_URL}/recipes/${slug}`,
      type: "article",
      siteName: "Dishora",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.imageAlt || recipe.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipe.title} | Dishora`,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function RecipeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipesData.find((r) => r.slug === slug);

  if (!recipe) {
    return <>{children}</>;
  }

  const fullImageUrl = recipe.imageUrl.startsWith("http")
    ? recipe.imageUrl
    : `${BASE_URL}${recipe.imageUrl}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    headline: recipe.title,
    description: recipe.leadText || recipe.description,
    image: [fullImageUrl],
    author: {
      "@type": "Organization",
      name: "Dishora Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Dishora",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/dishora-icon.png`,
      },
    },
    datePublished: recipe.date,
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    totalTime: toIsoDuration(recipe.totalTime),
    recipeYield: recipe.servings,
    recipeCategory: recipe.category,
    keywords: (recipe.tags || []).join(", "),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: (recipe.instructions || []).map((ins) => ({
      "@type": "HowToStep",
      name: ins.title,
      text: ins.text,
      position: ins.step,
    })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: recipe.nutrition.calories,
      proteinContent: recipe.nutrition.protein,
      carbohydrateContent: recipe.nutrition.carbs,
      fatContent: recipe.nutrition.fat,
      sodiumContent: recipe.nutrition.sodium,
      fiberContent: recipe.nutrition.fiber,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
