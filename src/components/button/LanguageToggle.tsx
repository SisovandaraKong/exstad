/** @format */

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, setLocale } from "@/hooks/useLocale";
import { useLanguageLoading } from "@/contexts/LanguageLoadingContext";

export default function LanguageToggle() {
	const locale = useLocale();
	const [isMounted, setIsMounted] = useState(false);
	const { isLoading, startLanguageSwitch } = useLanguageLoading();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleLanguage = () => {
		const targetLocale = locale === "en" ? "kh" : "en";
		startLanguageSwitch(locale, targetLocale);

		// Add a small delay to show the loading state, then reload
		setTimeout(() => {
			// update storage + cookie + broadcast; reload so server-rendered pages use the new locale
			setLocale(targetLocale, { reload: true });
		}, 800); // 800ms delay to show loading animation
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
			disabled={isLoading}
			aria-label={ariaLabel}
			title={titleText}
			className={`hover:scale-105 transition cursor-pointer border-2 border-accent-foreground rounded-full overflow-hidden ${
				isLoading ? "language-loading-button cursor-not-allowed scale-95" : ""
			}`}>
			{isMounted ? (
				<Image
					src={flagSrc}
					alt={altText}
					width={25}
					height={25}
					className={`w-[30px] h-[30px] shadow object-cover rounded-full transition-all ${
						isLoading ? "grayscale" : ""
					}`}
				/>
			) : (
				<span className='w-[30px] h-[30px] inline-block dark:bg-foreground/30 bg-gray-200 rounded-full' />
			)}
		</button>
	);
}
