"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useGetAllMasterProgramsQuery } from "../program/masterProgramApi";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations();

  const {
    data: programs = [],
  } = useGetAllMasterProgramsQuery();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scholarshipPrograms = programs.filter(
    (p) => p.programType === "SCHOLARSHIP"
  );

  const components = [
    ...scholarshipPrograms.map((p) => ({
      id: p.uuid,
      title: p.title,
      href: `/our-program/${p.slug}`,
    })),
    { id: "short-courses", title: "Short Courses", href: "/our-program" },
  ];

  return (
    <div
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button
        className={`relative rounded-md transition-colors font-d4 font-medium duration-200 hover:text-foreground hover:after:opacity-100 bg-transparent border-none outline-none cursor-pointer after:absolute after:-bottom-2.5 after:-left-3 after:-right-3 after:h-[4px] after:bg-primary after:transition-opacity after:duration-200 after:opacity-0 ${
          open ? "text-foreground after:opacity-100" : ""
        }`}
      >
        {t("our-program")}
      </button>

      {open && (
        <div className="fixed left-0 right-0 top-[80px] z-50 bg-background border-b border-border shadow-lg w-full border-t-1 border-text-whitesmoke">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <ul className="grid font-d4 gap-6 w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2">
              {components.slice(0, 4).map((component) => (
                <ListItem
                  key={component.id}
                  title={component.title}
                  href={component.href}
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
  href,
  className,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <li {...props}>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white text-center",
          className
        )}
      >
        <div className="font-d5 font-medium leading-none">{title}</div>
      </Link>
    </li>
  );
}
