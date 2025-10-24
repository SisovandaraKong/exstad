// "use client";

// import React from "react";
// import Image from "next/image";
// import { SparklesText } from "@/components/magicui/sparkles-text";
// import profileData from "@/data/profileData.json";

// export function ProfileSection() {
//   return (
//     <section className="relative min-h-[95vh] flex items-center justify-center px-6 py-12">
//       <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
//         {/* Image */}
//         <div className="relative w-60 h-60 lg:w-[420px] lg:h-[420px]">
//           <Image
//             src={profileData.imageUrl}
//             alt={profileData.name}
//             fill
//             className="rounded-full object-cover shadow-2xl"
//             priority
//           />
//         </div>

//         {/* Text */}
//         <div className="flex-1 text-center lg:text-left space-y-6">
//           <h1 className="text-5xl lg:text-6xl font-bold text-primary">
//             <SparklesText>{profileData.name}</SparklesText>
//           </h1>
//           <h2 className="text-xl lg:text-2xl text-card-foreground font-medium">
//             {profileData.title}
//           </h2>
//           <p className="text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
//             {profileData.bio}
//           </p>
//           <blockquote className="text-2xl lg:text-3xl font-medium text-accent italic">
//             “{profileData.quote}”
//           </blockquote>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { SparklesText } from "@/components/magicui/sparkles-text";
import profileData from "@/data/profileSection.json";
import Image from "next/image";

export function ProfileSection() {
  return (
    <section className="  relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
      180deg,
      rgba(0,0,255,0.2) 0%,      /* Blue at top, 20% opacity */
      rgba(255,0,0,0.2) 50%,     /* Red in the middle, 20% opacity */
      rgba(101,154,210,0.2) 100% /* Light blue at bottom, 20% opacity */
    )`,
        }}
      ></div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Image */}
        <div className="relative w-50 h-50 lg:w-[350px] lg:h-[350px]">
          <Image
            src={profileData.imageUrl}
            alt={profileData.name}
            fill
            className="rounded-full object-cover shadow-2xl"
            priority
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center lg:text-left space-y-3">
          <h1 className="font-h1 font-extrabold text-color">
            <SparklesText>{profileData.name}</SparklesText>
          </h1>

          <h2 className=" lg:font-h2 text-[#969696] ">{profileData.title}</h2>

          <p className="font-d2 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {profileData.bio}
          </p>
          <blockquote className="text-2xl lg:text-3xl font-medium text-accent italic ">
            “{profileData.quote}”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
