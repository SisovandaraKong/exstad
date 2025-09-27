"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useGetAllMasterProgramsQuery } from "@/components/programCard/masterProgramApi";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const { data: programs = [], isLoading, isError } = useGetAllMasterProgramsQuery();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Prepare dropdown links dynamically
  const scholarshipPrograms = programs.filter(
    (p) => p.programType === "SCHOLARSHIP"
  );

  const components = [
    ...scholarshipPrograms.map((p) => ({
      id: p.uuid, // ✅ API UUID
      title: p.title,
      href: `/our-program/${p.uuid}`, // link using API UUID
    })),
    { id: "short-courses", title: "Short Courses", href: "/our-program" },
  ];

  if (isLoading) return <p>Loading programs...</p>;
  if (isError) return <p>Failed to load programs.</p>;

  return (
    <div ref={menuRef}>
      <NavigationMenu value={open ? "item1" : ""} onValueChange={() => {}}>
        <NavigationMenuList>
          <NavigationMenuItem
            value="item1"
            onPointerEnter={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
            onPointerMove={(e) => e.preventDefault()}
          >
            <button
              className={`relative rounded-md transition-colors font-d4 font-medium duration-200 hover:text-primary hover:after:opacity-100 bg-transparent border-none outline-none cursor-pointer after:absolute after:-bottom-1.5 after:-left-3 after:-right-3 after:h-[3px] after:bg-primary after:transition-opacity after:duration-200 after:opacity-0 ${
                open ? "text-primary after:opacity-100" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              {t("explore-program")}
            </button>
            {open && (
              <NavigationMenuContent className="bg-background max-w-7xl">
                <ul className="bg-background text-foreground grid font-d4 w-full rounded-none gap-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.id}
                      title={component.title}
                      href={component.href}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
      <NavigationMenuLink asChild>
        <Link
          href={href}
          onClick={onClick}
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
