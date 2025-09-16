import React, { useState, useEffect, useRef } from "react";
import {
  // NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuItem,
  NavigationMenuLink,
  // NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { programData } from "@/data/programData";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations();

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

  const scholarshipPrograms = programData.filter(
    (p) => p.program_type === "Scholarship Course"
  );

  const components = [
    ...scholarshipPrograms.map((p) => ({
      id: p.id,
      title: p.title,
      href: `/our-program/${p.id}`,
    })),
    { id: "short-courses", title: "Short Courses", href: "/our-program" },
  ];

  return (
    <>
      <div
        ref={menuRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <button
          className={`relative rounded-md transition-colors font-d4 font-medium duration-200 hover:text-primary hover:after:opacity-100 bg-transparent border-none outline-none cursor-pointer after:absolute after:-bottom-1.5 after:-left-3 after:-right-3 after:h-[3px] after:bg-primary after:transition-opacity after:duration-200 after:opacity-0 ${
            open ? "text-primary after:opacity-100" : ""
          }`}
        >
          {t("our-program")}
        </button>
      </div>

      {open && (
        <div
          className="fixed left-0 right-0 top-[80px] bg-background border-b border-border shadow-lg z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <ul className="grid font-d4 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {components.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.title}
                  href={component.href}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function ListItem({
  title,
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  className?: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
