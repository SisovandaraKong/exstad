"use client";

import React from "react";
import { BsJournalCheck } from "react-icons/bs";
import { useGetAllRequirementsQuery } from "./requirementsApi";
import { RequirementsType } from "@/types/master-program";
import NotFoundProgram from "../../components/NotFound";
import { useTranslations } from "next-intl";

interface RequirementsProps {
  programUuid: string;
}

const RequirementSection: React.FC<RequirementsProps> = ({ programUuid }) => {
  const {
    data: requirements,
    isLoading,
    isError,
  } = useGetAllRequirementsQuery(programUuid, {
    refetchOnMountOrArgChange: true,
  });
  const t = useTranslations();
  if (isLoading) return <p>Loading requirements...</p>;
  if (isError) return <p>Failed to load requirements.</p>;
  if (!requirements || requirements.length === 0)
    return (
      <NotFoundProgram
        title="No Requirement Availbale"
        className="bg-background rounded-b-[24px] flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"
      />
    );

  return (
    <div data-aos="fade-up" className="grid gap-6">
      {requirements.map((requirement: RequirementsType, idx: number) => (
        <div key={requirement.id || idx} className="grid gap-6">
          <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-hover font-bold">
            <BsJournalCheck className="text-lg sm:text-xl md:text-2xl" />
            {requirement.title === "Course Requirement"
              ? t("courseRequirement")
              : requirement.title}
          </h2>

          {requirement.subtitle && (
            <p className="font-medium text-sm sm:text-base md:text-lg">
              {requirement.subtitle}
            </p>
          )}

          {requirement.description && requirement.description.length > 0 && (
            <ul className="list-disc list-inside grid gap-4 sm:gap-6 text-description text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-secondary-hover p-4 sm:p-6 md:p-8 rounded-lg">
              {requirement.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequirementSection;
