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
      className="p-1 hover:scale-105 transition cursor-pointer rounded-md"
    >
      {isMounted ? (
        <Image
          src={flagSrc}
          alt={altText}
          width={38}
          height={38}
          className="w-[38px] h-[25px] shadow object-cover"
        />
      ) : (
        <span className="w-[38px] h-[25px] inline-block dark:bg-foreground/30 bg-gray-200" />
      )}
    </button>
  );
}
