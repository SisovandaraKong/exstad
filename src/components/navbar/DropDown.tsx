/** @format */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useGetAllMasterProgramsQuery } from "../program/masterProgramApi";
import { ChevronDown, ChevronUp, GraduationCap, BookOpen } from "lucide-react";

type ProgramLite = {
  uuid: string;
  title: string;
  slug: string;
  programType?: string;
  subtitle?: string;
  visibility?: string;
};

type ComponentItem = {
  id: string;
  title: string;
  href: string;
  subtitle?: string;
};

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations();

  // Fetch master programs only when menu is open
  const { data: masterProgram = [], refetch: refetchMasters } =
    useGetAllMasterProgramsQuery(undefined, {
      skip: !open,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    });

  // Normalize master programs
  const programs: ProgramLite[] = React.useMemo(() => {
    if (!Array.isArray(masterProgram)) return [];
    return masterProgram
      .map((p): ProgramLite | null => {
        if (typeof p !== "object" || p === null) return null;
        const r = p as Record<string, unknown>;
        const uuid = typeof r.uuid === "string" ? r.uuid : "";
        const title = typeof r.title === "string" ? r.title : "";
        const slug = typeof r.slug === "string" ? r.slug : "";
        const programType =
          typeof r.programType === "string" ? r.programType : undefined;
        const visibility =
          typeof r.visibility === "string" ? r.visibility : undefined;
        const subtitle =
          typeof r.subtitle === "string"
            ? r.subtitle
            : typeof r["subTitle"] === "string"
            ? (r["subTitle"] as string)
            : undefined;
        if (!uuid || !title || !slug) return null;
        return { uuid, title, slug, programType, subtitle, visibility };
      })
      .filter((p): p is ProgramLite => p !== null);
  }, [masterProgram]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  // When menu opens, force a fresh refetch
  useEffect(() => {
    if (open) {
      refetchMasters();
    }
  }, [open, refetchMasters]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Filter only PUBLIC and SCHOLARSHIP master programs
  const scholarshipPrograms = programs.filter(
    (p) => p.programType === "SCHOLARSHIP" && p.visibility === "PUBLIC"
  );

  // Build component items
  const components: ComponentItem[] = [
    ...scholarshipPrograms.map((p) => ({
      id: p.uuid,
      title: p.title,
      href: `/our-program/${p.slug}`, // Link to master program detail
      subtitle: p.subtitle,
    })),
    {
      id: "short-courses",
      title: "Short Courses",
      href: "/our-program/short-courses",
      subtitle:
        "Build specialized IT skills with short, intensive courses to stay current and advance your career.",
    },
  ];

  return (
    <div
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button
        className={cn(
          "relative inline-flex items-center gap-1 rounded-md font-d4 font-normal",
          "transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer",
          "hover:text-foreground",
          "after:absolute after:-bottom-2.5 after:-left-3 after:-right-3 after:h-[2.5px] after:bg-primary",
          "after:transition-opacity after:duration-200",
          open ? "text-foreground after:opacity-100" : "after:opacity-0"
        )}
      >
        {t("our-program")}
        {open ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {open && (
        <div className="fixed left-0 right-0 top-[80px] z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
          <div className="mx-auto max-w-7xl px-8 py-4">
            <ul className="grid w-full gap-0 font-d4 grid-cols-1 md:grid-cols-2">
              {components.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.title}
                  href={component.href}
                  subtitle={component.subtitle}
                  onClick={() => setOpen(false)}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function ListItem({
  title,
  subtitle,
  href,
  className,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}) {
  const lower = title.toLowerCase();
  const Icon = lower.includes("short") ? BookOpen : GraduationCap;

  return (
    <li {...props}>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "group block w-full rounded-md p-4 no-underline outline-none transition-colors",
          "hover:bg-primary/10 focus:bg-primary/10 hover:text-accent-foreground focus:text-accent-foreground font-bilingual",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bilingual">
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="font-d5 font-semibold leading-none truncate font-bilingual">
              {title}
            </div>
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-3 font-bilingual">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
