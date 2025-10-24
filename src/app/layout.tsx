/** @format */

import type { Metadata } from "next";
import { Inter, Koh_Santepheap } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
// import Providers from "@/services/store/Providers";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/lib/auth-provider";
import I18nProvider from "@/lib/I18nProvider";
import Providers from "@/lib/providers";
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const koh = Koh_Santepheap({
	variable: "--font-koh",
	weight: "400",
	subsets: ["khmer"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "EXSTAD - Your Ultimate Platform",
	description:
		"EXSTAD is a platform that provides amazing services and content for users.",
	openGraph: {
		title: "EXSTAD - Your Ultimate Platform",
		description:
			"EXSTAD is a platform that provides amazing services and content for users.",
		url: "https://exstad-front-end.vercel.app",
		siteName: "EXSTAD",
		images: [
			{
				url: "https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a",
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
		description:
			"EXSTAD is a platform that provides amazing services and content for users.",
		images: [
			"https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a",
		],
		creator: "@yourtwitterhandle",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get("locale")?.value;

	const internalLocale = cookieLocale === "kh" ? "kh" : cookieLocale ?? "en";
	const htmlLang = internalLocale === "kh" ? "km" : internalLocale;

	// Fallback empty strings for font variables to avoid hydration mismatch
	// const interVariable = inter.variable ?? "";
	// const kohVariable = koh.variable ?? "";

	return (
		<html
			lang={htmlLang}
			suppressHydrationWarning
			className='overflow-x-hidden'>
			<body
				className={`${inter.variable} ${koh.variable} antialiased bg-whitesmoke `}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<AuthProvider>
						<Providers>
							<I18nProvider initialLocale={internalLocale}>
								<Navbar />
								<main className='pt-20'>{children}</main>
								<Footer />
							</I18nProvider>
						</Providers>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
