"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";

interface ScholarshipCardProps extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ShortCourseCardActive: React.FC<ScholarshipCardProps> = ({
  uuid,
  title,
  description,
  posterUrl,
  deadline,
  openingProgram
}) => {
  return (
    <div className="grid grid-cols-1 mb-6 md:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]">
      
      {/* Course Image */}
      <Link href={`/explore-course/${uuid}`} className="block">
        <Image
          unoptimized
          src={posterUrl || "/placeholder.jpg"}
          alt={title}
          width={500}
          height={300}
          className="w-full h-auto max-w-[500px] rounded-[20px] object-cover sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </Link>

      {/* Course Info */}
      <div className="h-full flex flex-col">
        {/* Title & Scholarship */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
          </div>
          <div className="flex flex-col">
            <Link href={`/explore-course/${uuid}`}>
              <h1 className="text-primary text-[20px] md:text-2xl lg:text-3xl font-bold hover:text-primary-hover">
                {title}
              </h1>
            </Link>
            <p className="text-secondary font-bold text-[16px] md:text-[18px] lg:text-[20px]">{openingProgram?.scholarship}% Scholarship</p>
          </div>
        </div>

        {/* Description + Info */}
        <div className="h-full gap-2 flex flex-col justify-between">
          <p className="text-foreground font-normal text-[16px] md:text-[18px] lg:text-[20px] overflow-hidden text-ellipsis line-clamp-2 md:line-clamp-5 lg:line-clamp-none">
            {description}
          </p>

          <div className="flex justify-between items-center w-full gap-4">
            {/* Deadline */}
            <div className="border-b-4 text-center rounded-lg border-secondary text-secondary px-4 sm:px-6 md:px-7 py-1 sm:py-2">
              <p className="text-secondary font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {deadline}
              </p>
              <p className="text-sm sm:text-base md:text-base lg:text-lg">Deadline</p>
            </div>

            {/* Duration */}
            <div className="border-b-4 text-center rounded-lg border-primary px-4 sm:px-6 md:px-8 py-1 sm:py-2">
              <p className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {openingProgram?.duration}
              </p>
              <p className="text-primary text-sm sm:text-base md:text-base lg:text-lg">Duration</p>
            </div>

            {/* Discount */}
            <div className="relative inline-block text-center mt-4">
              <p className="text-white font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl bg-primary rounded-full py-1 sm:py-2 px-4 sm:px-6 md:px-7">
                ${openingProgram?.price}
              </p>
              {openingProgram?.originalFee && (
                <p className="absolute -top-4 -right-1 text-white text-xs sm:text-sm md:text-sm lg:text-base line-through bg-secondary rounded-full px-2 sm:px-3 py-0.5 border border-white">
                 ${openingProgram?.originalFee }
                </p>
              )}
            </div>
          </div>

          {/* Enroll Button */}
          <Link href={`/explore-course/${uuid}`}>
            <h2 className="text-white text-center bg-primary p-3 md:p-3.5 lg:p-4 hover:bg-primary-hover cursor-pointer rounded-2xl font-bold text-[16px]">
              Enroll Now
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortCourseCardActive;



// import React from 'react'
// import { programType } from '@/types/programs'
// import Link from 'next/link';
// import Image from 'next/image';

// const ShortCourseCardActive: React.FC<programType> = ({
//   id,
//   title,
//   description,
//   price,
//   duration,
//   scholarship,
//   discount,
//   deadline,
//   openingprogram
// })=>{
//           return (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]">
//           <Link href={`/explore-course/${id}`} className="block "> <Image unoptimized src={openingprogram?.[0]?.shortcourseimage || "/placeholder.jpg"} alt={title}  width={500}  height={300}
//                 className=" w-full  h-auto max-w-[500px] rounded-[20px] object-cover sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"/>
//           </Link>
//             <div className="h-full flex flex-col ">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex flex-col items-center">
//                   <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
//                   <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
//                 </div>
//                      <div className="flex flex-col">
//                   <Link href={`/explore-course/${id}`}>
//                   <h1 className="text-primary text-[20px] md:text-2xl lg:text-3xl font-bold hover:text-primary-hover">  {title}
//                   </h1>
//                   </Link>
//                   <p className="text-secondary font-bold text-[16px] md:text-[18px] lg:text-[20px]">{scholarship}% Scholarship</p>
//                 </div>
//               </div>
//             </div>
//             <div className="h-full gap-2 flex flex-col justify-between">
//               <p className="
//                 text-foreground font-normal
//                 text-[16px] md:text-[18px] lg:text-[20px]
//                 overflow-hidden
//                 text-ellipsis
//                 line-clamp-2 md:line-clamp-5 lg:line-clamp-none">{description}</p>
//               <div className="flex justify-between items-center w-full gap-4">
//   <div className="border-b-4 text-center rounded-lg border-secondary text-secondary px-4 sm:px-6 md:px-7 py-1 sm:py-2">
//     <p className="text-secondary font-bold text-sm sm:text-base md:text-lg lg:text-xl">{deadline}</p>
//     <p className="text-sm sm:text-base md:text-base lg:text-lg">Deadline</p>
//   </div>
//   <div className="border-b-4 text-center rounded-lg border-primary px-4 sm:px-6 md:px-8 py-1 sm:py-2">
//     <p className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl">{duration}</p>
//     <p className="text-primary text-sm sm:text-base md:text-base lg:text-lg">Duration</p>
//   </div>
//   <div className="relative inline-block text-center mt-4">
//     <p className="text-white font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl bg-primary rounded-full py-1 sm:py-2 px-4 sm:px-6 md:px-7">{discount}</p>
//     <p className="absolute -top-4 -right-1 text-white text-xs sm:text-sm md:text-sm lg:text-base line-through bg-secondary rounded-full px-2 sm:px-3 py-0.5 border border-white">{price}</p>
//   </div>
// </div>

//                     <Link href={"/"}>
//                     <h2 className='text-white text-center  bg-primary p-3 md:p-3.5 lg:p-4 hover:bg-primary-hover cursor-pointer rounded-2xl  font-bold text-[16px] '>Enroll Now</h2> 
//                     </Link>
//             </div>
//           </div>
//         </div>

//           )
//         }

// export default ShortCourseCardActive;