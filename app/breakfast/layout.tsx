import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breakfast & Brunch Recipes — Pancakes, Oats & Egg Bakes | Dishora",
  description:
    "Start your morning with foolproof breakfast recipes, fluffy pancakes, high-protein overnight oats, and quick weekend egg bakes.",
  alternates: {
    canonical: "/breakfast",
  },
  openGraph: {
    title: "Breakfast & Brunch Recipes — Pancakes, Oats & Egg Bakes | Dishora",
    description:
      "Start your morning with foolproof breakfast recipes, fluffy pancakes, high-protein overnight oats, and quick weekend egg bakes.",
    url: "https://dishora.net/breakfast",
    type: "website",
  },
};

export default function BreakfastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
