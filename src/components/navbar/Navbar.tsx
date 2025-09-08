/** @format */

"use client";
import React, { useState } from "react";
import { AnimatedModeToggle } from "../button/ModeToggle"; // ✅ replace ModeToggle
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageToggle from "../button/LanguageToggle";
import LogInButton from "../button/LogInButton";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const navRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (!mobileOpen) return;

		function onPointerDown(e: PointerEvent) {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setMobileOpen(false);
			}
		}

		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setMobileOpen(false);
			}
		}

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [mobileOpen]);

	const t = useTranslations();

	return (
		<div
			ref={navRef}
			className={cn("w-full border-text-color z-10 sticky top-0", className)}
			style={{ boxShadow: "0px 4px 28px 0px rgba(0,0,0,0.05)" }}>
			{/* Main navbar */}
			<nav className='bg-background'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo */}
						<Link href='/' className='block'>
							<Image
								src='/image/logo/exSTAD-Outline.PNG'
								alt='Logo'
								width={50}
								height={70}
							/>
						</Link>

						{/* Navigation Links */}
						<div className='hidden md:block'>
							<div className='ml-10 flex items-baseline space-x-8'>
								<Link
									href='/explor-program'
									className='rounded-md transition-colors'>
									{t("explore-program")}
								</Link>
								<Link href='#' className='rounded-md transition-colors'>
									{t("available-programs")}
								</Link>
								<Link href='#' className='rounded-md transition-colors'>
									{t("scholar")}
								</Link>
								<Link href='#' className='rounded-md transition-colors'>
									{t("roadmap")}
								</Link>
								<Link href='#' className='rounded-md transition-colors'>
									{t("about-us")}
								</Link>
							</div>
						</div>

						{/* Mobile menu toggle (visible on small screens) */}
						<button
							className='md:hidden p-2 rounded-md hover:bg-accent/10'
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
							onClick={() => setMobileOpen((v) => !v)}
							type='button'>
							{mobileOpen ? (
								<X className='h-5 w-5' />
							) : (
								<Menu className='h-5 w-5' />
							)}
						</button>

						{/* Right side controls (Desktop) */}
						<div className='hidden md:block'>
							<div className='flex items-center space-x-6'>
								<LanguageToggle />

								{/* ✅ Theme Toggle replaced */}
								<AnimatedModeToggle />

								<LogInButton />
							</div>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileOpen && (
					<div className='md:hidden px-4 pb-4'>
						<div className='flex flex-col space-y-4 items-center'>
							<Link href='#' className='rounded-md'>
								{t("explore-program")}
							</Link>
							<Link href='#' className='rounded-md'>
								{t("available-programs")}
							</Link>
							<Link href='#' className='rounded-md'>
								{t("scholar")}
							</Link>
							<Link href='#' className='rounded-md'>
								{t("roadmap")}
							</Link>
							<Link href='#' className='rounded-md'>
								{t("about-us")}
							</Link>
						</div>
						<div>
							<div className='flex items-center justify-center space-x-6 mt-4'>
								<LanguageToggle />

								{/* ✅ Theme Toggle replaced */}
								<AnimatedModeToggle />

								<LogInButton />
							</div>
						</div>
					</div>
				)}
			</nav>
		</div>
	);
}

export default Navbar;
