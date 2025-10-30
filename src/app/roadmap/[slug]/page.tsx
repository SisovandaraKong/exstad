import { Metadata } from "next";
import WorkNodeViewer from "@/components/roadmap/roadmap-detail";
import NotFoundProgram from "@/components/program/components/NotFound";
import { Card } from "@/components/ui/card";

// Params type
interface RoadmapPageParams {
  slug: string;
}

// Program type (adjust to your API type)
interface RoadmapProgramType {
  uuid: string;
  title: string;
  subtitle?: string;
  programLevel?: string;
  slug: string;
  posterUrl?: string;
  description?: string;
}

// Fetch roadmap program
async function getRoadmapProgram(slug: string): Promise<RoadmapProgramType | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/slug/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data ?? null;
}
export async function generateMetadata({ params }: { params: RoadmapPageParams }): Promise<Metadata> {
  const { slug } = params;
  const program = await getRoadmapProgram(slug);

  if (!program) {
    return {
      title: "Program Not Found | exSTAD",
      description: "The requested roadmap program could not be found.",
      openGraph: {
        title: "Program Not Found | exSTAD",
        description: "The requested roadmap program could not be found.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`],
      },
    };
  }

  return {
    title: `${program.title} | exSTAD`,
    description: `${program.subtitle || "Explore this roadmap program"} | Level: ${program.programLevel || "N/A"}`,
    openGraph: {
      title: `${program.title} | exSTAD`,
      description: `${program.subtitle || "Explore this roadmap program"} | Level: ${program.programLevel || "N/A"}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/roadmap/${program.slug}`,
      images: [
        {
          url: program.posterUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: program.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.title} | exSTAD`,
      description: program.subtitle || "Explore this roadmap program",
      images: [program.posterUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`],
    },
  };
}

