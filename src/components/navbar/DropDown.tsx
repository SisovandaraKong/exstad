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

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

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
  const components: { title: string; href: string }[] = [
    {
      title: "Pre University",
      href: "/",
    },
    {
      title: "Foundation",
      href: "/",
    },
    {
      title: "Full Stack Development",
      href: "/",
    },
    {
      title: "Information Technology Professional (ITP)",
      href: "/",
    },
    {
      title: "Information Technology Expert (ITE)",
      href: "/",
    },
    {
      title: "Short Courses",
      href: "/",
    },
  ];
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
              {t("explor-program")}
            </button>
            {open && (
              <NavigationMenuContent className="bg-background max-w-7xl">
                <ul className="bg-background text-foreground grid font-d4 w-full rounded-none gap-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      onClick={() => setOpen(false)}
                    ></ListItem>
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
