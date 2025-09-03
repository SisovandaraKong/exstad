"use client";
import React, { useState } from "react";
import { ModeToggle } from "../button/ModeToggle";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageToggle from "../button/LanguageToggle";
import LogInButton from "../button/LogInButton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropDown from "./DropDown";

function Navbar({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const t = useTranslations();

  // Function to check if a link is active
  const isActive = (href: string) => {
    // Remove locale prefix if present (e.g., /en/about -> /about)
    const cleanPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    return cleanPathname === href || (href !== '/' && cleanPathname.startsWith(href));
  };

  // Function to get navigation link classes
  const getNavLinkClasses = (href: string) => {
    const baseClasses = "relative rounded-md transition-colors font-d4 font-medium duration-200";
    const hoverClasses = "hover:text-primary hover:after:opacity-100";
    const afterClasses = "after:absolute after:-bottom-1.5 after:-left-3 after:-right-3 after:h-[3px] after:bg-primary after:transition-opacity after:duration-200";
    
    if (isActive(href)) {
      return `${baseClasses} ${afterClasses} ${hoverClasses} text-primary after:opacity-100`;
    }
    
    return `${baseClasses} ${afterClasses} ${hoverClasses} after:opacity-0`;
  };

  React.useEffect(() => {
    if (!mobileOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div
      ref={navRef}
      className={cn(
        "w-full border-b-1 border-text-color z-50 sticky top-0",
        className
      )}
    >
      {/* Main navbar */}
      <nav className="bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0   md:py-3 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/image/logo/exSTAD-03.png"
                alt="Logo"
                width={50}
                height={70}
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <DropDown />
                <Link
                  href="/explore-course"
                  className={getNavLinkClasses('/exploreProgram')}
                >
                  {t("available-programs")}
                </Link>
                <Link
                  href="/student-dashboard"
                  className={getNavLinkClasses('/scholar')}
                >
                  {t("scholar")}
                </Link>
                <Link
                  href="/roadmap"
                  className={getNavLinkClasses('/roadmap')}
                >
                  {t("roadmap")}
                </Link>
                <Link
                  href="/about"
                  className={getNavLinkClasses('/about')}
                >
                  {t("about-us")}
                </Link>
              </div>
            </div>

            {/* Right side controls */}

            {/* Mobile menu toggle (visible on small screens) */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-background-white-smoke"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="hidden md:block">
              <div className="flex items-center space-x-6 ">
                <LanguageToggle />

                {/* Theme Toggle */}
                <ModeToggle />

                {/* Login Button */}
                <LogInButton />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu (conditionally rendered) */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Mobile menu */}
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50">
              <div className="px-4 py-4">
                <div className="flex flex-col space-y-4 items-center">
                  <DropDown />
                  <Link
                    href="/exploreProgram"
                    className={getNavLinkClasses('/exploreProgram')}
                  >
                    {t("available-programs")}
                  </Link>
                  <Link
                    href="/scholar"
                    className={getNavLinkClasses('/scholar')}
                  >
                    {t("scholar")}
                  </Link>
                  <Link
                    href="/roadmap"
                    className={getNavLinkClasses('/roadmap')}
                  >
                    {t("roadmap")}
                  </Link>
                  <Link
                    href="/about"
                    className={getNavLinkClasses('/about')}
                  >
                    {t("about-us")}
                  </Link>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-6 mt-4">
                    <LanguageToggle />

                    {/* Theme Toggle */}
                    <ModeToggle />

                    {/* Login Button */}
                    <LogInButton />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
