import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning & Organizing — Kitchen Hacks, Storage & Appliance Care | Dishora",
  description:
    "Expert tips for deep cleaning kitchen appliances, organizing pantries and fridges, restoring cookware, and maintaining everyday tidy kitchen habits.",
  alternates: {
    canonical: "/cleaning-and-organizing",
  },
  openGraph: {
    title: "Cleaning & Organizing — Kitchen Hacks, Storage & Appliance Care | Dishora",
    description:
      "Expert tips for deep cleaning kitchen appliances, organizing pantries and fridges, restoring cookware, and maintaining everyday tidy kitchen habits.",
    url: "https://dishora.net/cleaning-and-organizing",
    type: "website",
  },
};

export default function CleaningAndOrganizingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
