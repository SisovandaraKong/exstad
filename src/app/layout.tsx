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
				url: "https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/535958664_784778544302648_5507524163295142187_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=kZGIf03F7o0Q7kNvwGMNQRz&_nc_oc=AdlXxwxoKWtoqpDvd3RpWaRRmPiLgA92ZVfFDUg4uSG4-2c_4sY1AF7JErwepgizNHU&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=chFmXevMZCDQQ4vZR2SJoQ&oh=00_Afd8QkjuA-qzsywFbyq0MLnOrBZPHfZiOBcBGjtW7kMWjg&oe=6900C566",
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
			"https://scontent.fpnh9-2.fna.fbcdn.net/v/t39.30808-6/540349826_784819700965199_7049553995288016805_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEY6AHda9dM26wi3ycNE1IAhfQRPeQf5RyF9BE95B_lHJ_8nNHSBiFkD3UgN5rshyn5Ywe8AaF1QNVte7u9XU7L&_nc_ohc=1g_CfFYyUrkQ7kNvwEUzUZ0&_nc_oc=AdnuvFO8Tw84rjB4Sfp2mi6X_QeyuQx57om0w0MttCJazpx6AO6CKkc78fP-Qy8Tdr0&_nc_zt=23&_nc_ht=scontent.fpnh9-2.fna&_nc_gid=bdhALjyn0Nk5plcFRCL7GA&oh=00_AfXGxiKMNA8wU_78N53lViSRUy-iHPe_6H0FqWAT1Df4Xw&oe=68B7B2F4",
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
