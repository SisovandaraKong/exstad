"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useGetMasterCurriculumsQuery } from "./curriculumApi";
import { CurriculumType } from "@/types/master-program";

type CurriculumProps = {
  programUuid: string;
};

const ProgramCurriculumTap: React.FC<CurriculumProps> = ({ programUuid }) => {
  const { data: curriculumSections = [], isLoading, isError } = useGetMasterCurriculumsQuery(programUuid, {
    refetchOnMountOrArgChange: true,
  });

  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  // Initialize all sections as open when data changes
  useEffect(() => {
    const initialState: { [key: number]: boolean } = {};
    curriculumSections.forEach((section) => {
      // Use 'order' as the unique key
      initialState[section.order] = true;
    });
    setOpenSections(initialState);
  }, [curriculumSections]);

  const toggle = (key: number) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) return <p>Loading curriculum...</p>;
  if (isError) return <p>Failed to load curriculum.</p>;
  if (!curriculumSections.length) return <p>No curriculum available.</p>;

  return (
    <div className="w-full bg-background p-4 sm:p-6 md:p-6 space-y-8 md:space-y-10">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">Curriculum</h1>
        <div className="grid gap-3 sm:gap-4">
          {curriculumSections.map((section, idx) => {
            const key = section.order; // unique key
            const isOpen = openSections[key];
            const height = refs.current[key]?.scrollHeight || 0;
            return (
              <div key={key} className="border border-[#8AB9FF] rounded-2xl p-4 sm:p-6">
                <button
                  onClick={() => toggle(key)}
                  className="flex justify-between items-center w-full text-start font-semibold text-base sm:text-lg md:text-xl text-foreground"
                >
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    <span className="text-primary mr-2">{(idx + 1).toString().padStart(2, "0")}</span>
                    {section.title}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              <div
                  ref={(el) => { refs.current[key] = el; }} 
                  style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                >

                  <div className="grid gap-3 sm:gap-4 border-t border-gray-300 py-4 sm:py-6 mt-3 sm:mt-4">
                    {section.subtitle && (
                      <p className="text-base sm:text-lg md:text-xl text-foreground font-medium">{section.subtitle}</p>
                    )}
                    {section.description.map((des, i) => (
                      <p key={i} className="flex items-start font-normal text-sm sm:text-base md:text-lg text-foreground">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-primary mr-2 mt-1" />
                        {des}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

    </div>
  );
};

export default ProgramCurriculumTap;
