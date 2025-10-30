// app/explore-course/page.tsx
import ExploreProgramPageClient from "@/components/program/components/ExploreComponent";
import type { Metadata } from "next";

// Metadata for SEO (server-side)
export const metadata: Metadata = {
  title: "Explore ISTAD Courses & Scholarships | EXSTAD",
  description:
    "Browse and explore ISTAD programs, scholarships, and short courses on EXSTAD. Find open programs, filter by level, type, or keywords, and kickstart your learning journey.",
  keywords: [
    "EXSTAD",
    "ISTAD Courses",
    "Scholarships",
    "Short Courses",
    "Bachelor Scholarship",
    "Pre-University Scholarship",
    "IT Skills",
    "Full Stack Development",
    "Student Learning Platform",
    "Tech Education Cambodia",
    "Online Courses",
    "Hands-on Learning",
    "Cambodia Scholarships",
    "Open Programs",
    "Program Explorer",
  ],
  metadataBase: new URL("https://exstad.tech"),
  alternates: { canonical: "/explore-course" },
  openGraph: {
    type: "website",
    title: "Explore ISTAD Courses & Scholarships | EXSTAD",
    description:
      "Discover and filter ISTAD programs, scholarships, and short courses on EXSTAD. Access open programs and find the perfect learning opportunity.",
    url: "https://exstad.tech/explore-course",
    siteName: "EXSTAD",
    images: [
      {
        url: "https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a",
        width: 1200,
        height: 630,
        alt: "EXSTAD Logo - Explore ISTAD Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore ISTAD Courses & Scholarships | EXSTAD",
    description:
      "Browse open ISTAD programs and scholarships on EXSTAD. Filter by type, level, or program and find your next learning opportunity.",
    images: [
      "https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a",
    ],
    creator: "@exstad",
  },
};

export default function ExploreProgramPageWrapper() {
  return <ExploreProgramPageClient />;
}
