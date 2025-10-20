"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import Link from "next/link";

interface ScholarshipCardProps extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  title,
  description,
  openingProgram,
}) => {
  const router = useRouter();

  const handleEnrollClick = () => {
    if (!openingProgram?.slug) return; // Safety check
    router.push(`/explore-course/${openingProgram.slug}/enrollment`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ boxShadow: "0px 8px 30px rgba(0,0,0,0.1)" }}
      className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]"
    >
      <Link href={`/explore-course/${openingProgram?.slug}`} className="block">
        <Image
          unoptimized
          height={500}
          width={500}
          src={openingProgram?.posterUrl ?? "/fallback.png"}
          alt={title}
          className="w-full aspect-square rounded-[20px] object-cover sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </Link>

      <div className="h-full flex flex-col">

        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-primary text-[20px] md:text-2xl lg:text-3xl font-bold hover:text-primary-hover">
              {title}
            </h1>
            <p className="text-secondary font-bold text-[16px] md:text-[18px] lg:text-[20px]">
              {openingProgram?.scholarship ?? 0}% Scholarship
            </p>
          </div>
        </div>

        {/* Description + Info */}
        <div className="h-full flex flex-col justify-between gap-2">
          <p className="text-foreground font-normal text-[16px] md:text-[18px] lg:text-[20px] overflow-hidden text-ellipsis line-clamp-2 md:line-clamp-5 lg:line-clamp-none">
            {description}
          </p>

          <div className="flex justify-between items-center w-full gap-4">
            {/* Deadline */}
            <div className="border-b-4 text-center rounded-[8px] border-secondary text-secondary px-2 sm:px-6 md:px-6 py-1 sm:py-2">
              <p className="text-secondary font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {openingProgram?.deadline}
              </p>
              <p className="text-sm md:text-base lg:text-lg">Deadline</p>
            </div>

            {/* Duration */}
            <div className="border-b-4 text-primary text-center rounded-[8px] border-primary px-4 sm:px-6 md:px-6 py-1 sm:py-2">
              <p className="font-bold text-[16px] md:text-[18px] lg:text-[22px]">
                {openingProgram?.duration}
              </p>
              <p className="text-sm md:text-base lg:text-lg">Duration</p>
            </div>

            {/* Total Slots */}
            <div className="border-b-4 text-center rounded-[8px] border-[#1E7D34] px-4 sm:px-6 md:px-7 py-1 sm:py-2">
              <p className="text-[#1E7D34] font-bold text-[16px] md:text-[18px] lg:text-[22px]">
                {openingProgram?.totalSlot}
              </p>
              <p className="text-[#1E7D34] text-sm md:text-base lg:text-lg">Total Slots</p>
            </div>
          </div>
          {/* Enroll Now Button */}
          <button
            onClick={handleEnrollClick}
            className="text-white text-center bg-primary p-3 md:p-3.5 lg:p-4 hover:bg-primary-hover cursor-pointer rounded-2xl font-bold text-sm sm:text-base md:text-base"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
