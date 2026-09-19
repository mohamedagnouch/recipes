import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dessert Recipes — Cakes, Cookies, Pies & Sweet Treats | Dishora",
  description:
    "Browse scores of easy dessert recipes: from wholesome oat carrot apple cake and show-stopping berry tiramisu to retro cookies and chocolate bakes.",
  alternates: {
    canonical: "/desserts",
  },
  openGraph: {
    title: "Dessert Recipes — Cakes, Cookies, Pies & Sweet Treats | Dishora",
    description:
      "Browse scores of easy dessert recipes: from wholesome oat carrot apple cake and show-stopping berry tiramisu to retro cookies and chocolate bakes.",
    url: "https://dishora.net/desserts",
    type: "website",
  },
};

export default function DessertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
