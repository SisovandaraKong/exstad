"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="text-brand bg-background grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-heading-1">{t("hello")}</h1>
      <p className="font-heading-2">{t("welcome")}</p>
    </div>
  );
}
