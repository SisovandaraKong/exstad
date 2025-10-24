"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import ProgramActiveSidebar from "@/components/program/explore-course/ProgramActivSidebar";
import ProgramSearch from "@/components/program/ProgramSearch";
import ProgramActiveSidebarSkeleton from "@/components/program/skeleton/ProgramActiveSidebarSkeleton";
import ProgramCardList from "@/components/program/explore-course/ProgramCardList";
import { useGetAllMasterProgramsQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import NotFoundProgram from "@/components/program/components/NotFound";

export default function ExploreProgramPage() {
  const [programFilter, setProgramFilter] = useState("All");
  const [subFilter, setSubFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [metaTitle, setMetaTitle] = useState("Explore Programs - EXSTAD");
  const [metaDescription, setMetaDescription] = useState(
    "Browse all programs available on EXSTAD including scholarship and short courses."
  );

  const { data: allPrograms = [], isLoading, isError } = useGetAllMasterProgramsQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const programs = allPrograms.filter(p => p.visibility === "PUBLIC");

  const { data: allOpeningProgram = [] } = useGetAllOpeningProgramsQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const openingPrograms = allOpeningProgram.filter(p => p.status === "OPEN");

  const visiblePrograms = programs.filter((p) =>
    openingPrograms.some((o) => o.programName === p.title)
  );

  const filteredPrograms = visiblePrograms.filter((p) => {
    if (programFilter !== "All") {
      if (programFilter === "Scholarship Course" && p.programType !== "SCHOLARSHIP")
        return false;
      if (programFilter === "Short Course" && p.programType !== "SHORT_COURSE")
        return false;
    }

    if (levelFilter !== "All" && p.programLevel !== levelFilter.toUpperCase()) {
      return false;
    }

    if (subFilter.length > 0 && !subFilter.includes(p.title)) return false;

    if (searchValue && !p.title.toLowerCase().includes(searchValue.toLowerCase()))
      return false;

    return true;
  });

  // ✅ Update metadata dynamically based on filters or program count
  useEffect(() => {
    if (filteredPrograms.length === 0) {
      setMetaTitle("No Programs Found - EXSTAD");
      setMetaDescription("No programs match your search or filters on EXSTAD.");
    } else {
      setMetaTitle(`Explore ${filteredPrograms.length} Programs - EXSTAD`);
      setMetaDescription(
        `Browse ${filteredPrograms.length} programs available on EXSTAD including scholarship and short courses.`
      );
    }
  }, [filteredPrograms]);

  if (isError) return <p>Failed to load programs.</p>;

  return (
    <>
      {/* Dynamic Metadata */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        <meta property="og:image" content="public/image/IMG_1518.jpg" /> {/* replace with your default OG image */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="/og-image.png" /> {/* replace with your Twitter image */}
      </Head>

      {/* Page content */}
      <div className="flex flex-col lg:flex-row md:flex-col bg-whitesmoke min-h-screen mx-auto max-w-7xl gap-6 w-full p-5 md:p-8 lg:py-8 lg:px-0">
        <div className="shrink-0 w-full lg:w-72">
          {isLoading ? (
            <ProgramActiveSidebarSkeleton />
          ) : (
            <ProgramActiveSidebar
              programData={visiblePrograms}
              programFilter={programFilter}
              setProgramFilter={setProgramFilter}
              levelFilter={levelFilter}
              setLevelFilter={setLevelFilter}
              subFilter={subFilter}
              setSubFilter={setSubFilter}
            />
          )}
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <ProgramSearch
              total={filteredPrograms.length}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>

          <div>
            {isLoading ? (
              <ProgramActiveSidebarSkeleton />
            ) : filteredPrograms.length === 0 ? (
              <NotFoundProgram title="No Program Found" />
            ) : (
              <ProgramCardList
                programs={filteredPrograms}
                openingPrograms={openingPrograms}
                programFilter={programFilter}
                subFilter={subFilter}
                levelFilter={levelFilter}
                searchValue={searchValue}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
