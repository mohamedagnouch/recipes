import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunch Recipes — Quick Salads, Sandwiches & Midday Bowls | Dishora",
  description:
    "Quick and satisfying lunch ideas: hearty grain bowls, fresh Mediterranean salads, packed sandwiches, and easy meal-prep favorites.",
  alternates: {
    canonical: "/lunch",
  },
  openGraph: {
    title: "Lunch Recipes — Quick Salads, Sandwiches & Midday Bowls | Dishora",
    description:
      "Quick and satisfying lunch ideas: hearty grain bowls, fresh Mediterranean salads, packed sandwiches, and easy meal-prep favorites.",
    url: "https://dishora.net/lunch",
    type: "website",
  },
};

export default function LunchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
