"use client";
import { Scholar } from "@/types/scholar";
import { Metadata } from "next";
import ScholarDetailPage from "./ScholarDetailPage";

type Params = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username } = await params;
  const data = (await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/scholars/username/${username}`
  ).then((res) => res.json())) as Scholar;

  if (!data) {
    return {};
  }
  return {
    title: `${data.englishName} - EXSTAD Scholar`,
    description: data.bio,
    openGraph: {
      title: `${data.englishName} - EXSTAD Scholar`,
      description: data.bio,
      url: `https://www.exstad.tech/${username}`,
      siteName: "EXSTAD",
      images: [
        {
          url: data.avatar,
          width: 1200,
          height: 630,
          alt: data.englishName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function Page() {
  return <ScholarDetailPage />;
}
