import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In the Kitchen — Cooking Tips, Techniques & Food Guides | Dishora",
  description:
    "Master essential cooking techniques, kitchen equipment maintenance, ingredient substitutions, and chef-tested food prep guides.",
  alternates: {
    canonical: "/in-the-kitchen",
  },
  openGraph: {
    title: "In the Kitchen — Cooking Tips, Techniques & Food Guides | Dishora",
    description:
      "Master essential cooking techniques, kitchen equipment maintenance, ingredient substitutions, and chef-tested food prep guides.",
    url: "https://dishora.net/in-the-kitchen",
    type: "website",
  },
};

export default function InTheKitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
