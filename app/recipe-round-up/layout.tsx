import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe Round-Ups & Seasonal Menus | Dishora",
  description:
    "Curated recipe round-ups: 30-minute weeknight dinners, summer cookout ideas, holiday feast guides, and budget-friendly grocery lists.",
  alternates: {
    canonical: "/recipe-round-up",
  },
  openGraph: {
    title: "Recipe Round-Ups & Seasonal Menus | Dishora",
    description:
      "Curated recipe round-ups: 30-minute weeknight dinners, summer cookout ideas, holiday feast guides, and budget-friendly grocery lists.",
    url: "https://dishora.net/recipe-round-up",
    type: "website",
  },
};

export default function RecipeRoundUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
