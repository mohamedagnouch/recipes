import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy & Delicious Recipes for Home Cooks | Dishora",
  description:
    "Explore hundreds of triple-tested recipes for weeknight dinners, quick lunches, hearty breakfasts, and show-stopping desserts.",
  alternates: {
    canonical: "/recipes",
  },
  openGraph: {
    title: "Easy & Delicious Recipes for Home Cooks | Dishora",
    description:
      "Explore hundreds of triple-tested recipes for weeknight dinners, quick lunches, hearty breakfasts, and show-stopping desserts.",
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
