import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Recipe Collections & Meal Plans | Dishora",
  description:
    "Explore chef-curated recipe collections, themed dinner series, high-protein meal preps, and family-friendly seasonal menus.",
  alternates: {
    canonical: "/recipe-collections",
  },
  openGraph: {
    title: "Curated Recipe Collections & Meal Plans | Dishora",
    description:
      "Explore chef-curated recipe collections, themed dinner series, high-protein meal preps, and family-friendly seasonal menus.",
    url: "https://dishora.net/recipe-collections",
    type: "website",
  },
};

export default function RecipeCollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
