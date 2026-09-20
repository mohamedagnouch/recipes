import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dishora",
  description:
    "Get in touch with the Dishora editorial team for feedback, recipe inquiries, partnerships, or press requests.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Dishora",
    description:
      "Get in touch with the Dishora editorial team for feedback, recipe inquiries, partnerships, or press requests.",
    url: "https://dishora.net/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
