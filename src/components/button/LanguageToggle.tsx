"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, setLocale } from "@/hooks/useLocale";

export default function LanguageToggle() {
  const locale = useLocale();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "kh" : "en";
    // update storage + cookie + broadcast; reload so server-rendered pages use the new locale
    setLocale(nextLocale, { reload: true });
  };

  const flagSrc = locale === "en" ? "/flags/en.png" : "/flags/kh.png";
  const altText = locale === "en" ? "English" : "Khmer";

  const ariaLabel = isMounted
    ? `Switch language (current: ${locale})`
    : "Switch language";
  const titleText = isMounted
    ? `Switch language (current: ${locale})`
    : "Switch language";

  return (
    <button
      onClick={toggleLanguage}
      aria-label={ariaLabel}
      title={titleText}
      className="p-1 hover:scale-105 transition"
    >
      {isMounted ? (
        <Image
          src={flagSrc}
          alt={altText}
          width={38}
          height={38}
          className=" shadow"
        />
      ) : (
        <span className="w-6 h-6 inline-block bg-gray-200" />
      )}
    </button>
  );
}
