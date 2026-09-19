import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dinner Recipes — Quick Weeknight & Family Meals | Dishora",
  description:
    "Discover foolproof dinner recipes, comforting pasta bakes, one-pot dishes, and traditional slow-simmered Moroccan tagines.",
  alternates: {
    canonical: "/dinner",
  },
  openGraph: {
    title: "Dinner Recipes — Quick Weeknight & Family Meals | Dishora",
    description:
      "Discover foolproof dinner recipes, comforting pasta bakes, one-pot dishes, and traditional slow-simmered Moroccan tagines.",
    url: "https://dishora.net/dinner",
    type: "website",
  },
};

export default function DinnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
