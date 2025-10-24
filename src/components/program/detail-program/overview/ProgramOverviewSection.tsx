"use client";

import React from "react";
import Image from "next/image";
import { useGetAllProgramOverviewQuery } from "./programOverviewApi";
import NotFoundProgram from "../../components/NotFound";

interface Props {
  programUuid: string;
}
const ProgramOverviewSection: React.FC<Props> = ({ programUuid }) => {
  const { data, isLoading, isError } = useGetAllProgramOverviewQuery(
    programUuid,
    { refetchOnMountOrArgChange: true }
  );

  const overviews = data ?? []; // fallback if data is null or undefined

  if (isLoading) return <div>Loading program overviews...</div>;
  if (isError) return <NotFoundProgram title="Failed to load Program Overview " className="bg-background rounded-b-[24px] flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"/>;
  if (!ProgramOverviewSection || ProgramOverviewSection.length === 0) return <NotFoundProgram title="No Program Overview Availbale" className="bg-background rounded-b-[24px] flex flex-col space-y-3 justify-center items-center min-h-screen h-fit"/>;

  return (
    <div className="grid gap-[24px]" data-aos="fade-up">
      {overviews.map((item, index) => (
        <div key={index} className="grid gap-[24px]">
          <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-400 font-bold">
            <Image
              unoptimized
              width={24}
              height={24}
              src="/image/logo/mission.png"
              alt={item.title}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            />
            {item.title}
          </h2>
          <p className="text-foreground text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-amber-400 p-4 sm:p-6 md:p-8 rounded-lg">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};


export default ProgramOverviewSection;
