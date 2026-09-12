import { Metadata } from "next";
import { notFound } from "next/navigation";
import { freeziesWinnerDetails, WinnerDetailedData } from "../../../data/freeziesWinnerDetailsData";
import { freeziesProducts } from "../../../data/freeziesData";
import WinnerDetailClient from "./WinnerDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return freeziesProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const winner = freeziesWinnerDetails[slug];

  if (!winner) {
    return {
      title: "Award Winner Not Found - The 2026 Freezies Awards",
    };
  }

  return {
    title: `${winner.name} by ${winner.brand} - The 2026 Freezies Awards`,
    description: `${winner.shortVerdict} Tested, tasted, and scored ${winner.overallScore}/100 by the culinary editorial board.`,
    openGraph: {
      title: `${winner.name} | The 2026 Freezies Awards`,
      description: winner.shortVerdict,
      images: [
        {
          url: winner.imageUrl,
          width: 1200,
          height: 630,
          alt: winner.imageAlt,
        },
      ],
    },
  };
}

export default async function WinnerPage({ params }: PageProps) {
  const { slug } = await params;
  const winner = freeziesWinnerDetails[slug];

  if (!winner) {
    notFound();
  }

  return <WinnerDetailClient winner={winner} />;
}
