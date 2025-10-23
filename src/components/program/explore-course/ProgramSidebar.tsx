"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiNotePencilBold } from "react-icons/pi";
import {
  MdOutlineAccessTime,
  MdOutlineSchool,
  MdOutlinePaid,
} from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa6";
import { useGetMasterProgramByUuidQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import ProgramOverviewSidebarSkeleton from "@/components/program/skeleton/ProgramSidebarSkeleton";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";

type Props = {
  uuid: string;
};

// Same as ScholarshipCard pattern
interface ProgramSidebarProps extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ProgramSidebar: React.FC<Props> = ({ uuid }) => {
  const router = useRouter();

  const {
    data: masterProgram,
    isLoading: loadingMaster,
    isError: errorMaster,
  } = useGetMasterProgramByUuidQuery({ uuid });

  const {
    data: openingPrograms = [],
    isLoading: loadingOpening,
    isError: errorOpening,
  } = useGetAllOpeningProgramsQuery();

  const isLoading = loadingMaster || loadingOpening;
  const isError = errorMaster || errorOpening;

  if (isLoading) return <ProgramOverviewSidebarSkeleton />;
  if (isError || !masterProgram)
    return <p className="text-red-500">Failed to load sidebar.</p>;

  // Attach matching opening program
  const openingProgram = openingPrograms.find(
    (op) => op.programName === masterProgram.title
  );

  // Use combined props style (like ScholarshipCard)
  const program: ProgramSidebarProps = { ...masterProgram, openingProgram };

  const handleEnrollmentClick = () => {
    if (!program.openingProgram?.slug) return;
    router.push(`/explore-course/${program.openingProgram.slug}/enrollment`);
    if (!program.openingProgram?.slug) return;
    router.push(`/explore-course/${program.openingProgram.slug}/enrollment`);
  };

  return (
    <div className="bg-background h-fit gap-[24px] sticky top-27 p-[24px] rounded-[24px] text-center flex flex-col">
      {/* Title */}
      <div>
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[22px]  text-primary">{program.title}</h1>
        <p className="font-medium text-[16px] text-foreground">
          Be ready for your journey at the university
        </p>
      </div>

      {/* QR Code */}
      {program.openingProgram?.qrCodeUrl && (
        <div className="flex flex-col items-center gap-[10px]">
          <Image
            width={143}
            height={142}
            unoptimized
            src={program.openingProgram?.qrCodeUrl}
            alt={program.openingProgram.programName}
            className="w-[143px] h-[142px]"
          />
          <p className="text-[11px]">
            Scan with your phone to access the mobile enrollment form
          </p>
        </div>
      )}

      {/* Info boxes */}
      <div className="flex flex-col w-full gap-[10px]">
        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <MdOutlineAccessTime /> Duration
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {program.openingProgram?.duration}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <VscGraph /> Level
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {program.programLevel}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <BsPeople /> Number
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {program.openingProgram?.totalSlot}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <MdOutlineSchool /> Scholarship
          </p>
          <p className="font-bold text-[14px] text-foreground">
            {program.openingProgram?.scholarship ?? 0}%
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
            <MdOutlinePaid /> Cost
          </p>
          <div className="flex gap-2">
            <p className="font-bold text-[14px] text-foreground line-through">
              {program.openingProgram?.originalFee ?? program.price}$
            </p>
            <p className="text-secondary text-[14px] font-bold">
              {program.openingProgram?.price ?? program.price}$
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      {program.programType !== "SHORT_COURSE" && (
        <button className="bg-background cursor-pointer hover:bg-black hover:text-white flex items-center justify-center gap-2 border border-foreground text-foreground px-[24px] py-[10px] rounded-[24px] text-center font-medium text-[16px]">
          <FaTelegram /> Join Telegram Group
        </button>
      )}

      <button
        className="bg-primary cursor-pointer flex items-center justify-center gap-2 hover:bg-primary-hover text-white px-[24px] py-[10px] rounded-[24px] text-center font-medium text-[16px]"
        onClick={handleEnrollmentClick}
      >
        <PiNotePencilBold /> Enroll Now
      </button>
    </div>
  );
};

export default ProgramSidebar;
