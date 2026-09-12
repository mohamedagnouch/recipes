import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { collectionDetailsData } from "../../data/collectionDetailsData";
import { recipeCollectionsData } from "../../data/recipeCollectionsData";
import CollectionDetailClient from "./CollectionDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return recipeCollectionsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionDetailsData[slug];

  if (!collection) {
    return {
      title: "Recipe Collection Not Found | Simply Recipes",
      description: "The requested recipe collection could not be located.",
    };
  }

  return {
    title: `${collection.title} | Simply Recipes In The Kitchen`,
    description: collection.subtitle || collection.leadStory.slice(0, 155),
    openGraph: {
      title: collection.title,
      description: collection.subtitle,
      url: `https://simplyrecipes.com/recipe-collections/${collection.slug}`,
      images: [
        {
          url: collection.heroImage,
          width: 1200,
          height: 630,
          alt: collection.heroAlt,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: collection.title,
      description: collection.subtitle,
      images: [collection.heroImage],
    },
  };
}

export default async function RecipeCollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = collectionDetailsData[slug];

  if (!collection) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.subtitle,
    url: `https://simplyrecipes.com/recipe-collections/${collection.slug}`,
    image: collection.heroImage,
    author: {
      "@type": "Person",
      name: collection.author,
      jobTitle: collection.authorRole,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: collection.recipes.map((recipe, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Recipe",
          name: recipe.title,
          description: recipe.description,
          image: recipe.imageUrl,
          recipeYield: recipe.servings,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CollectionDetailClient collection={collection} />
    </>
  );
}
