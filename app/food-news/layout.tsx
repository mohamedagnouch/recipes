import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food News & Trends — Celebrity Chefs, Grocery Releases & Viral Hits | Dishora",
  description:
    "Stay informed with the latest culinary news, supermarket item rollouts, celebrity chef trends, and viral food phenomena in North America.",
  alternates: {
    canonical: "/food-news",
  },
  openGraph: {
    title: "Food News & Trends — Celebrity Chefs, Grocery Releases & Viral Hits | Dishora",
    description:
      "Stay informed with the latest culinary news, supermarket item rollouts, celebrity chef trends, and viral food phenomena in North America.",
    url: "https://dishora.net/food-news",
    type: "website",
  },
};

export default function FoodNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
