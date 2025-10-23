"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Marquee } from "@/components/magicui/marquee";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Globe,
  GraduationCap,
  Layers,
  Code,
  BookOpen,
  Award,
  Briefcase,
} from "lucide-react";

import styles from "./styles.module.css";
import { useGetAllScholarsQuery } from "@/components/student/StudentApi";

// ✅ canonical type (adjust the import path to yours)
import type { Scholar as ApiScholarBase } from "@/types/scholar/scholar";

/* ---------- Types ---------- */
type ApiSpecialist = {
  uuid?: string;
  country?: string;
  specialist?: string;
  universityName?: string;
  about?: string;
  degreeType?: string;
};

type ApiCareer = {
  uuid: string;
  salary?: number;
  company?: string;
  position?: string;
  interest?: string; // text shown as paragraph
  companyType?: string;
};

type ApiScholar = ApiScholarBase & {
  specialist?: ApiSpecialist[] | null;
  careers?: ApiCareer[] | null; // ✅ used for Section 3
  // Optional: If your API embeds completedCourses directly
  completedCourses?: Array<{ programName?: string; name?: string }> | null;
};

type ApiError = {
  data?: { message?: string };
  error?: string;
};

type ScholarCard = {
  id: number;
  uuid?: string;
  username?: string;
  name: string;
  title: string;
  image: string;
  spec: ApiSpecialist;
};

type ScholarWithQuote = Omit<ScholarCard, "spec"> & {
  quote: string;
  category: string;
  spec: ApiSpecialist;
};

type SpotlightItem = {
  id: number;
  uuid?: string;
  href: string;
  name: string;
  image: string;
  title: string;
  role: string;
  description: string;
  company: string;
};

/* ---------- Helpers ---------- */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.exstad.tech";

function normalizeAvatar(avatar?: string) {
  if (!avatar) return "";
  const v = avatar.trim();
  return v.startsWith("http")
    ? v
    : `${API_BASE}${v.startsWith("/") ? v : `/${v}`}`;
}
function versioned(src: string, ver?: string | number) {
  if (!src) return "/placeholder.svg";
  const v =
    typeof ver === "number" ? ver : ver ? new Date(ver).getTime() : Date.now();
  return `${src}${src.includes("?") ? "&" : "?"}v=${v}`;
}
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+";

/** ===============================
 *  Section 4 helpers (category logic)
 * ================================ */
const CATEGORY_LABELS = {
  ALL: "All",
  PREU: "Pre University",
  FDN: "Foundation",
  FSW: "Full Stack Web Development",
  ITP: "IT Professional",
  ITE: "IT Expert",
  SC: "Short Course",
} as const;

type CategoryLabel = (typeof CATEGORY_LABELS)[keyof typeof CATEGORY_LABELS];

function normalizeProgramName(
  raw?: string
): Exclude<CategoryLabel, "All"> | "" {
  if (!raw) return "";
  const s = raw.trim().toLowerCase();

  // Pre-University (variants)
  if (
    /(^|\b)pre[\s-]?uni(versity)?\b/.test(s) ||
    /pre[-\s]?university/i.test(raw)
  ) {
    return CATEGORY_LABELS.PREU;
  }

  // Foundation
  if (/foundation/i.test(raw)) return CATEGORY_LABELS.FDN;

  // Full Stack Web Development (typo tolerant)
  if (
    s.includes("full") &&
    (s.includes("stack") || s.includes("stak") || s.includes("stcak")) &&
    (s.includes("web") || s.includes("develop"))
  ) {
    return CATEGORY_LABELS.FSW;
  }

  // IT Professional / ITP
  if (/it\s*profession(al)?/i.test(raw) || /\bitp\b/i.test(raw)) {
    return CATEGORY_LABELS.ITP;
  }

  // IT Expert / ITE
  if (/it\s*expert/i.test(raw) || /\bite\b/i.test(raw)) {
    return CATEGORY_LABELS.ITE;
  }

  return ""; // unknown → will become Short Course
}

function deriveCategoryFromCompleted(
  programNames: string[]
): Exclude<CategoryLabel, "All"> {
  const normalized = programNames
    .map(normalizeProgramName)
    .filter(Boolean) as Exclude<CategoryLabel, "All">[];

  // Priority if multiple programs are completed
  const priority: Exclude<CategoryLabel, "All">[] = [
    CATEGORY_LABELS.FSW,
    CATEGORY_LABELS.ITE,
    CATEGORY_LABELS.ITP,
    CATEGORY_LABELS.FDN,
    CATEGORY_LABELS.PREU,
  ];

  for (const label of priority) {
    if (normalized.includes(label)) return label;
  }
  return CATEGORY_LABELS.SC;
}

/* =========================================================
   Card1 (Section 1)
   ========================================================= */
function Card1({ person }: { person: ScholarCard }) {
  const [src, setSrc] = useState(person.image || "/placeholder.svg");
  const [hovered, setHovered] = useState(false);
  useEffect(() => setSrc(person.image || "/placeholder.svg"), [person.image]);

  // Lock page scroll when hovering a card
  const lockScroll = () => {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${sbw}px`);
    if (!document.body.classList.contains("no-scroll")) {
      document.body.classList.add("no-scroll");
    }
  };
  const unlockScroll = () => {
    document.body.classList.remove("no-scroll");
    document.documentElement.style.removeProperty("--scrollbar-width");
  };
  const onEnter = () => {
    setHovered(true);
    lockScroll();
  };
  const onLeave = () => {
    setHovered(false);
    unlockScroll();
  };
  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.style.removeProperty("--scrollbar-width");
    };
  }, []);

  const slug = person.uuid || person.name.toLowerCase().replace(/\s+/g, "-");
  const href = person.username ? `/${person.username}` : `/scholars/${slug}`;
  const spec = person.spec;

  return (
    <Link
      href={href}
      aria-label={`View ${person.name}'s profile`}
      className="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-xl dark:bg-slate-800/40">
        <div className="relative aspect-[10/13] w-full">
          <Image
            src={src}
            alt={person.name}
            fill
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 18vw"
            className={[
              "absolute inset-0 h-full w-full object-cover",
              "transform-gpu will-change-transform",
              "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hovered ? "scale-[1.045]" : "scale-100",
            ].join(" ")}
            placeholder="blur"
            blurDataURL={BLUR}
            onError={() => setSrc("/placeholder.svg")}
            unoptimized
            priority
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* EXPANDING FOOTER */}
          <div
            className={[
              "absolute bottom-0 left-0 right-0 overflow-hidden bg-primary/95 text-white",
              "transform-gpu will-change-[height]",
              "transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hovered ? "h-full" : "h-[70px]",
            ].join(" ")}
          >
            {/* Compact */}
            <div
              className={[
                "px-3 py-2 text-center",
                "transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hovered ? "opacity-0" : "opacity-100",
              ].join(" ")}
            >
              <p className="font-semibold text-sm">{person.name}</p>
              <p className="text-[11px] text-white/90 line-clamp-2">
                {spec?.specialist}
                {spec?.universityName ? ` • ${spec?.universityName}` : ""}
              </p>
            </div>

            {/* Expanded */}
            <div
              className={[
                "absolute inset-0 px-4 py-4",
                "transform-gpu transition-opacity duration-300 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hovered ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <div className="space-y-0.5">
                <p className="text-sm font-bold">{person.name}</p>
                {spec?.specialist && (
                  <p className="text-xs/5 opacity-90">{spec.specialist}</p>
                )}
                {spec?.universityName && (
                  <p className="text-xs/5 opacity-90">{spec.universityName}</p>
                )}
                {(spec?.degreeType || spec?.country) && (
                  <p className="text-[11px] opacity-80">
                    {spec?.degreeType}
                    {spec?.degreeType && spec?.country ? " • " : ""}
                    {spec?.country}
                  </p>
                )}
              </div>

              {spec?.about && (
                <p
                  className={[
                    "mt-3 text-sm leading-relaxed pe-1",
                    "max-h-[62%] overflow-y-auto",
                    styles.noScrollbar,
                  ].join(" ")}
                >
                  {spec.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   Card2 (Section 4 grid)
   ========================================================= */
function Card2({ person }: { person: ScholarWithQuote }) {
  const [src, setSrc] = useState(person.image || "/placeholder.svg");
  useEffect(() => setSrc(person.image || "/placeholder.svg"), [person.image]);

  const displayName = person.name?.trim() || "Unnamed Scholar";
  const displayTitle = person.title?.trim() || "—";

  return (
    <div className="group rounded-xl p-[2px] bg-gradient-to-r from-blue-500 to-pink-500 shadow-md transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
      {/* Smaller height + tighter padding */}
      <div className="rounded-xl bg-white dark:bg-slate-800 p-5 sm:p-6 md:p-8 text-center transition-all duration-300 ease-out transform-gpu group-hover:shadow-xl h-[350px] flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full overflow-hidden border border-slate-200 shadow-md dark:border-slate-600 bg-slate-200 dark:bg-slate-700">
          <Image
            src={src}
            alt={displayName}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 352px"
            onError={() => setSrc("/placeholder.svg")}
            priority
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="mt-2 flex flex-col items-center text-center">
          <h3
            className="mt-2 text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white line-clamp-2"
            title={displayName}
          >
            {displayName}
          </h3>
          <p
            className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 line-clamp-1"
            title={displayTitle}
          >
            {displayTitle}
          </p>
          {!!person.quote?.trim() && (
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-2">
              “{person.quote}”
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Scholar() {
  const [activeCategory, setActiveCategory] = useState<CategoryLabel>(
    CATEGORY_LABELS.ALL
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  // ✅ Fetch once and reuse
  const {
    data: apiScholars = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllScholarsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  /* =========================================================
     Specialists ONLY 
     ========================================================= */
  const specialistsMarquee = useMemo(() => {
    const dedupMarquee = new Map<string, ApiScholar>(); // relaxed (Section 1)

    (apiScholars as ApiScholar[]).forEach((s) => {
      // RELAXED: allow missing universityName for marquee
      if (
        s?.uuid &&
        Array.isArray(s.specialist) &&
        s.specialist.length > 0 &&
        s.specialist[0]?.specialist
      ) {
        if (!dedupMarquee.has(s.uuid)) dedupMarquee.set(s.uuid, s);
      }
    });

    const listMarquee = Array.from(dedupMarquee.values());

    const marq: ScholarCard[] = listMarquee.map((s, idx) => {
      const spec = s.specialist![0];
      const base = normalizeAvatar(s.avatar) || "/placeholder.svg";
      const img = versioned(base, s.audit?.updatedAt);
      return {
        id: idx + 1,
        uuid: s.uuid,
        username: s.username?.trim(),
        name: s.englishName || s.khmerName || s.username || "Unnamed Scholar",
        title: spec.specialist || "Scholar",
        image: img,
        spec,
      };
    });

    return marq;
  }, [apiScholars]);

  /* =========================================================
     Spotlight (Section 3): ONLY scholars who have careers
     - Title: Name | <ProgramCode>
     - Subline (orange): career.position
     - Paragraph: career.interest (fallback to s.quote)
     ========================================================= */
  const spotlight: SpotlightItem[] = useMemo(() => {
    const list = (apiScholars as ApiScholar[]).filter(
      (s) => Array.isArray(s.careers) && s.careers.length > 0
    );

    // Map categories to short codes shown in title
    const programCode = (category?: string) => {
      const c = (category || "").toLowerCase();
      if (c.includes("it expert")) return "ITE";
      if (c.includes("it professional") || c.includes("it professionl"))
        return "ITP";
      if (c.includes("full stack")) return "FSW";
      if (c.includes("foundation")) return "FDN";
      if (c.includes("pre university")) return "PU";
      if (c.includes("short course")) return "SC";
      return "";
    };

    return list.map((s, idx) => {
      const firstCareer = s.careers![0];
      const base = normalizeAvatar(s.avatar) || "/placeholder.svg";
      const image = versioned(base, s.audit?.updatedAt);

      const displayName =
        s.khmerName || s.englishName || s.username || "Unnamed Scholar";
      const scholarWithCategory = s as ApiScholar & { category?: string };
      const code = programCode(scholarWithCategory.category);
      const title = code ? `${displayName} | ${code}` : displayName;

      const href = s.username?.trim()
        ? `/${s.username.trim()}`
        : `/scholars/${s.uuid}`;

      return {
        id: idx + 1,
        uuid: s.uuid,
        href,
        name: displayName,
        image,
        title, // e.g. "ឡុង ណុប សុបុណ្ណ | ITE"
        role: firstCareer?.position ?? "",
        description: firstCareer?.interest || s.quote || "",
        company: firstCareer?.company || "",
      } as SpotlightItem;
    });
  }, [apiScholars]);

  /* =========================================================
     SECTION 4 data: compute category from completed courses
     ========================================================= */
  const section4: ScholarWithQuote[] = useMemo(() => {
    const scholars = (apiScholars as ApiScholar[]) ?? [];

    const withDerivedCategory: ScholarWithQuote[] = scholars.map((s, idx) => {
      const base = normalizeAvatar(s.avatar) || "/placeholder.svg";
      const image = versioned(base, s.audit?.updatedAt);

      // Read embedded completedCourses if present
      const embedded = s?.completedCourses as
        | Array<{ programName?: string; name?: string }>
        | undefined;

      const programNames = Array.isArray(embedded)
        ? embedded.map((c) => c?.programName || c?.name || "").filter(Boolean)
        : [];

      const scholarWithCategory = s as ApiScholar & { category?: string };
      const derivedCategory =
        programNames.length > 0
          ? deriveCategoryFromCompleted(programNames)
          : // Fallback heuristics
            normalizeProgramName(scholarWithCategory?.category) ||
            normalizeProgramName(s.role || s.university) ||
            CATEGORY_LABELS.SC;

      const spec =
        Array.isArray(s.specialist) && s.specialist.length > 0
          ? s.specialist[0]
          : ({} as ApiSpecialist);

      return {
        id: idx + 1,
        uuid: s.uuid,
        username: s.username?.trim(),
        name: s.englishName || s.khmerName || s.username || "Unnamed Scholar",
        title: [s.university, s.role].filter(Boolean).join(" • ") || "Scholar",
        image,
        quote: s.quote || "",
        category: derivedCategory,
        spec,
      };
    });

    return withDerivedCategory;
  }, [apiScholars]);

  const filtered =
    activeCategory === CATEGORY_LABELS.ALL
      ? section4
      : section4.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* =================================== */}
      {/* SECTION 1: Hero + Marquee (Specialists only) */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden dark:bg-slate-900 h-[calc(100vh-4rem)] sm:h-screen">
        <div
          className={`absolute inset-0 -z-10 ${styles.gradientBackground}`}
        />

        <div className="w-screen h-full flex flex-col justify-center px-0">
          <div className="text-center" data-aos="fade-down">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              From Classrooms to Careers
            </h1>
            <p className="mt-2 text-xl sm:text-2xl md:text-4xl font-bold bg-clip-text text-primary">
              The Journey of Our Abroad Scholars
            </p>
            <p className="mt-2 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300">
              Where learning turns into leadership and dreams into reality
            </p>
          </div>

          <div className="mt-6">
            {isLoading || isFetching ? (
              <div className="flex gap-3 overflow-hidden px-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-40 sm:w-56 md:w-64 h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse"
                  />
                ))}
              </div>
            ) : specialistsMarquee.length > 0 ? (
              <div>
                <Marquee pauseOnHover className="[--duration:20s]">
                  {specialistsMarquee.map((p) => (
                    <div
                      key={`ping-${p.id}`}
                      className="w-40 sm:w-56 md:w-64 shrink-0"
                    >
                      <Card1 person={p} />
                    </div>
                  ))}
                </Marquee>
              </div>
            ) : isError ? (
              <p className="text-center text-sm text-rose-600 py-6">
                {(error as ApiError)?.data?.message ??
                  (error as ApiError)?.error ??
                  "Failed to load scholars."}
              </p>
            ) : (
              <div className="text-center text-sm text-slate-500 py-6">
                No specialists found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================== */}
      {/* SECTION 2: Success Blueprint (static) */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Title + Steps */}
            <div>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white"
                data-aos="fade-right"
              >
                The Success Blueprint for ISTAD Alumni
              </h2>
              <div className="mt-12 flex flex-col gap-10">
                {/* Step 1 */}
                <div
                  className="flex items-center gap-6 relative"
                  data-aos="fade-right"
                  data-aos-delay={100}
                >
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    01
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-blue-50 text-blue-600 p-2 ring-1 ring-blue-100">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Build a Strong Foundation
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Learn core IT skills
                      </p>
                    </div>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-6 relative">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-amber-50 text-amber-600 p-2 ring-1 ring-amber-100">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Putting Skills into Practice
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Practice what you’ve learned
                      </p>
                    </div>
                  </div>
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    02
                  </span>
                </div>
                {/* Step 3 */}
                <div className="flex items-center gap-6 relative">
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    03
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-rose-50 text-rose-600 p-2 ring-1 ring-rose-100">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Mastery and Leadership
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Become an expert, lead projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Two images */}
            <div className="grid grid-cols-2 gap-6" data-aos="zoom-in-left">
              <Image
                src="/image/reach.jpg"
                alt="Award Ceremony"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-md"
                priority
              />
              <Image
                src="/image/yith_sopheaktra.jpg"
                alt="Student Writing"
                width={500}
                height={400}
                className="rounded-2xl object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================== */}
      {/* SECTION 3: Spotlight Carousel (careers only) */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative">
          {isError ? (
            <p className="text-center text-sm text-rose-600">
              {(() => {
                const e = error as ApiError;
                return (
                  e?.data?.message ?? e?.error ?? "Failed to load scholars."
                );
              })()}
            </p>
          ) : isLoading || isFetching ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
          ) : spotlight.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400">
              No employed scholars to spotlight yet.
            </div>
          ) : (
            <Carousel
              className="relative"
              opts={{ align: "start", loop: true }}
            >
              <CarouselContent>
                {spotlight.map((person) => (
                  <CarouselItem key={`spotlight-card-${person.id}`}>
                    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-10 overflow-hidden">
                      <BorderBeam
                        size={200}
                        duration={5}
                        colorFrom="#ff4d4d"
                        colorTo="#4d9cff"
                        borderWidth={1}
                      />
                      <div className="flex flex-col gap-6 md:grid md:grid-cols-5 md:items-center relative z-10">
                        {/* LEFT: image */}
                        <div className="md:col-span-2">
                          <div className="rounded-2xl p-[2px] bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 shadow-lg">
                            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
                              <div className="relative aspect-[16/11] w-full">
                                <Image
                                  src={person.image}
                                  alt={person.name}
                                  fill
                                  className="object-cover w-full h-full"
                                  priority={person.id === 1}
                                  unoptimized
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: text */}
                        <div className="md:col-span-3 mt-4 md:mt-0">
                          {/* Badge */}
                          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-slate-800/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-slate-700">
                            Scholar Spotlight
                          </span>

                          {/* Title: Name | ProgramCode */}
                          <h3 className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            {person.title}
                          </h3>

                          {/* Orange subline: Position */}
                          {person.role ? (
                            <p className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold text-orange-500">
                              {person.role}
                            </p>
                          ) : null}

                          {/* Paragraph: Interest/quote */}
                          {!!person.description && (
                            <p className="mt-2 sm:mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                              {person.description}
                            </p>
                          )}

                          <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
                            <Link
                              href={person.href}
                              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-indigo-600 shadow hover:opacity-90"
                            >
                              View Full Story
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                aria-label="Previous scholar"
                className="hidden md:flex absolute left-[-4rem] top-1/2 -translate-y-1/2 z-10 dark:bg-slate-800 p-2 rounded-full shadow bg-accent"
              />
              <CarouselNext
                aria-label="Next scholar"
                className="hidden md:flex absolute right-[-4rem] top-1/2 -translate-y-1/2 z-10 dark:bg-slate-800 p-2 rounded-full shadow bg-accent"
              />

              <div className="absolute -top-10 right-15 flex gap-0.5 z-20 md:hidden">
                <CarouselPrevious
                  aria-label="Previous scholar"
                  className="dark:bg-slate-800 p-2 rounded-full shadow bg-accent dark:hover:bg-slate-700"
                />
                <CarouselNext
                  aria-label="Next scholar"
                  className="dark:bg-slate-800 p-2 rounded-full shadow bg-accent dark:hover:bg-slate-700"
                />
              </div>
            </Carousel>
          )}
        </div>
      </section>

      {/* =================================== */}
      {/* SECTION 4: Category Filter based on Completed Courses */}
      {/* =================================== */}
      <section className="relative isolate overflow-hidden border-t border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Discover Our <br /> exSTAD Scholar
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find the best student for your company and boost your business
              too.
            </p>
          </div>

          {/* Category filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { name: CATEGORY_LABELS.ALL, icon: Globe },
              { name: CATEGORY_LABELS.PREU, icon: GraduationCap },
              { name: CATEGORY_LABELS.FDN, icon: Layers },
              { name: CATEGORY_LABELS.FSW, icon: Code }, // fixed spelling
              { name: CATEGORY_LABELS.ITP, icon: BookOpen },
              { name: CATEGORY_LABELS.ITE, icon: Award },
              { name: CATEGORY_LABELS.SC, icon: Briefcase },
            ].map(({ name, icon: Icon }) => {
              const active = activeCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setActiveCategory(name)}
                  className={`relative flex items-center gap-2 px-2 py-1 text-sm sm:text-base font-medium transition-colors ${
                    active
                      ? "text-blue-600"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active
                        ? "text-blue-600"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{name}</span>
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {isError ? (
            <p className="mt-10 text-center text-sm md:text-base text-rose-600">
              {(() => {
                const e = error as ApiError;
                return (
                  e?.data?.message ?? e?.error ?? "Failed to load scholars."
                );
              })()}
            </p>
          ) : isLoading || isFetching ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl p-[2px] bg-slate-200 dark:bg-slate-700 animate-pulse"
                >
                  <div className="rounded-xl bg-white dark:bg-slate-800 p-8 text-center">
                    <div className="mx-auto h-40 w-40 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="mt-6 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="mt-3 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((person) => {
                const specWithUuid = person.spec as ApiSpecialist & {
                  uuid?: string;
                };
                return (
                  <Card2
                    key={`s2-${person.uuid}-${specWithUuid?.uuid ?? person.id}`}
                    person={person}
                  />
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
                  No scholars in this category yet.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
