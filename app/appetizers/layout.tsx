import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appetizer Recipes — Party Dips, Finger Foods & Bites | Dishora",
  description:
    "Crowd-pleasing appetizer recipes for game day, cocktail parties, and holiday gatherings: creamy dips, crispy crostini, and savory finger foods.",
  alternates: {
    canonical: "/appetizers",
  },
  openGraph: {
    title: "Appetizer Recipes — Party Dips, Finger Foods & Bites | Dishora",
    description:
      "Crowd-pleasing appetizer recipes for game day, cocktail parties, and holiday gatherings: creamy dips, crispy crostini, and savory finger foods.",
    url: "https://dishora.net/appetizers",
    type: "website",
  },
};

export default function AppetizersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
