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
import { LanguageLoadingProvider } from "@/contexts/LanguageLoadingContext";

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
  title: "EXSTAD - Student-Led Platform for ISTAD Courses & Scholarships",
  description:
    "EXSTAD: A student-led platform for exploring ISTAD courses, scholarships, and hands-on learning opportunities at CSTAD.",
  keywords: [
    "EXSTAD",
    "ISTAD",
    "CSTAD",
    "Institute of Science and Technology Advanced Development",
    "Cambodia Scholarship",
    "Bachelor degree scholarship",
    "Pre-University scholarship",
    "IT profession scholarship",
    "IT scholarship",
    "IT expert scholarship",
    "Information Technology",
    "Short Course",
    "IT Skills",
    "IT Roadmaps",
    "IT Foundation",
    "Full Stack Web Development",
    "អាហារូបករណ៍កម្ពុជា",
    "អាហារូបករណ៍បរិញ្ញាបត្រ",
    "អាហារូបករណ៍មុខវិជ្ជាព័ត៌មានវិទ្យា",
    "ជំនាញ IT",
    "Student Learning Platform",
    "Tech Education Cambodia",
    "Online Learning",
    "Project-Based Learning",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://www.exstad.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "EXSTAD - Student-Led Platform for ISTAD Courses & Scholarships",
    description:
      "Discover EXSTAD: Explore ISTAD courses, scholarships, and practical learning opportunities at CSTAD with a student-focused platform.",
    url: "https://www.exstad.tech",
    siteName: "EXSTAD",
    images: [
      {
        url: "https://www.exstad.tech/seo.png",
        width: 1200,
        height: 630,
        alt: "EXSTAD Logo - Student Platform for ISTAD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXSTAD - Student-Led Platform for ISTAD Courses & Scholarships",
    description:
      "EXSTAD offers a student-focused platform to explore ISTAD courses, scholarships, and hands-on learning at CSTAD.",
    images: [
      "https://www.exstad.tech/seo.png",
    ],
    creator: "@exstad",
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

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${koh.variable} ${nunito.variable} antialiased relative bg-whitesmoke overflow-x-hidden`}
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
              <LanguageLoadingProvider>
                              <AuthProvider>
                <Navbar />
                <main className="mt-20">
                  {children}
                  <AppToaster />
                </main>
                <Footer />
              </AuthProvider>
              </LanguageLoadingProvider>
            </I18nProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}