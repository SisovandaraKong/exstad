"use client";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
// app/page.tsx
export const metadata: Metadata = {
  title: "EXSTAD - Your Ultimate Platform",
  description: "EXSTAD is a platform that provides amazing services and content for users.",
  openGraph: {
    title: "EXSTAD - Your Ultimate Platform",
    description: "EXSTAD is a platform that provides amazing services and content for users.",
    url: "https://exstad-front-end.vercel.app",
    siteName: "EXSTAD",
    images: [
      {
        url: "https://exstad-front-end.vercel.app/image/logo/exSTAD-03.png",
        width: 1200,
        height: 630,
        alt: "EXSTAD logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXSTAD - Your Ultimate Platform",
    description: "EXSTAD is a platform that provides amazing services and content for users.",
    images: ["https://exstad-front-end.vercel.app/image/logo/exSTAD-03.png"],
    creator: "@yourtwitterhandle",
  },
};

export default function Home() {
  const t = useTranslations();
  return (
    <div className="text-brand bg-background grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-h2">{t("hello")}</h1>
      <p className="font-h4">{t("welcome")}</p>
    </div>
  );
}
