import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy & Delicious Recipes for Home Cooks | Dishora",
  description:
    "Explore delicious step-by-step recipes for weeknight dinners, quick lunches, hearty breakfasts, and homemade desserts.",
  alternates: {
    canonical: "/recipes",
  },
  openGraph: {
    title: "Easy & Delicious Recipes for Home Cooks | Dishora",
    description:
      "Explore delicious step-by-step recipes for weeknight dinners, quick lunches, hearty breakfasts, and homemade desserts.",
    url: "https://dishora.net/recipes",
    type: "website",
  },
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
