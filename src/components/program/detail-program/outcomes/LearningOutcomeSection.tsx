"use client";

import React from "react";
import { BsLightbulb } from "react-icons/bs";
import { useGetAllLearningOutcomesQuery } from "./learningOutcomesApi";
import { LearningOutcomeType } from "@/types/master-program";
import NotFoundProgram from "../../components/NotFound";
import { useTranslations } from "next-intl";

interface LearningOutcomeProps {
  programUuid: string;
}

const LearningOutcomeSection: React.FC<LearningOutcomeProps> = ({
  programUuid,
}) => {
  const {
    data: learningOutcomes,
    isLoading,
    isError,
  } = useGetAllLearningOutcomesQuery(programUuid, {
    refetchOnMountOrArgChange: true,
  });
  const t = useTranslations();
  if (isLoading) return <p>Loading learning outcomes...</p>;
  if (isError)
    return (
      <NotFoundProgram
        title="Failed to load Learning Outcomes "
        className="bg-background rounded-b-[24px] flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"
      />
    );
  if (!learningOutcomes || learningOutcomes.length === 0)
    return (
      <NotFoundProgram
        title="No Learning Outcomes Availbale"
        className="bg-background rounded-b-[24px] flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"
      />
    );

  return (
    <div data-aos="fade-up" className="grid gap-6">
      {learningOutcomes.map((outcome: LearningOutcomeType, idx: number) => (
        <div key={outcome.id || idx} className="grid gap-6">
          <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-primary-hover font-bold">
            <BsLightbulb className="text-lg sm:text-xl md:text-2xl" />
            {outcome.title === "Learning Outcome"
              ? t("learningOutcome")
              : outcome.title}
          </h2>
          {outcome.subtitle && (
            <p className="font-medium mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg">
              {outcome.subtitle}
            </p>
          )}
          {outcome.description && outcome.description.length > 0 && (
            <ul className="list-disc list-inside grid gap-4 sm:gap-6 text-description text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-primary-hover p-4 sm:p-6 md:p-8 rounded-lg dark:bg-gray-800">
              {outcome.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningOutcomeSection;
