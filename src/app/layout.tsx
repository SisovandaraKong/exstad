import type { Metadata } from "next";
import { Inter, Koh_Santepheap, Nunito_Sans } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "@/components/footer/Footer";
import OnlineStatusIndicator from "@/components/offline/online-status-indicator";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/lib/auth-provider";
import I18nProvider from "@/lib/I18nProvider";
import Providers from "@/lib/providers";
import "./globals.css";
import AppToaster from "@/components/ui/app-toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// koh-santepheap
const koh = Koh_Santepheap({
  variable: "--font-koh",
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});
const nunito = Nunito_Sans({
  variable: "--font-nunito",
  weight: ["400", "700"],
  subsets: ["latin"],
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
	}
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

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${koh.variable} ${nunito.variable} antialiased relative bg-whitesmoke`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OnlineStatusIndicator />
          <Providers>
            <I18nProvider initialLocale={internalLocale}>
              <AuthProvider>
                <Navbar />
                <main className="mt-20">
                  {children}
                  <AppToaster />
                </main>
                <Footer />
              </AuthProvider>
            </I18nProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
