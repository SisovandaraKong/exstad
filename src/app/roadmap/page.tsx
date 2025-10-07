"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import BackgroundCircle from "@/components/roadmap/BackgroundCircle";
import HorizontalScrollText from "@/components/roadmap/HorizontalScrollText";
import RoadmapGrid from "@/components/roadmap/RoadmapGrid";
import { Button } from "@/components/ui/button";
import { programData } from "@/data/programData";

export default function page() {
  return (
    <main className="flex flex-col gap-20 bg-whitesmoke ">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-64px)] w-2/3 mx-auto flex justify-center items-center bg-whitesmoke">
        <DotPattern
          glow
          className="[mask-image:radial-gradient(1200px_circle_at_center,white_0%,transparent_50%)] absolute"
        />
        <BackgroundCircle />

        <div className="absolute ">
          <div className="flex flex-col justify-center items-center gap-5">
            <span className="text-[64px] leading-[110%] text-center font-extrabold">
              ROADMAP TO <br />
              TECH MASTERY
            </span>
            <p className="text-[var(--text-color)]/80 text-center">
              A structured guide to learning the right skills in the right
              order, <br /> helping you grow into a confident developer.
            </p>
            <Button size={"lg"}>Explore More</Button>
          </div>
        </div>
      </div>
      <HorizontalScrollText />
      <RoadmapGrid programData={programData} />

      {/* <GlowingCards
        enableGlow={false}
        glowRadius={0}
        glowOpacity={0}
        borderRadius="0.75rem"
        gap="24px"
        responsive={true}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto px-6 py-12"
      >
        {programData.map((data) => (
          <GlowingCard
            key={data.title}
            glowColor="#d1d1d1"
            className="
        group bg-white/80 dark:bg-[#1c1c1e] 
        backdrop-blur-md 
        rounded-xl 
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]
        hover:-translate-y-1
        flex flex-col justify-between p-6
      "
          >
          
            <div className="flex items-start justify-between">
              <div
                className="
          h-20 w-20 flex justify-center items-center 
          rounded-lg bg-gray-50 dark:bg-[#2c2c2e] 
          shadow-inner overflow-hidden
        "
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <LabelLevel
                level={data.level as "Beginner" | "Advanced" | "Intermediate"}
              />
            </div>

         
            <span
              className="
        mt-5 text-xl font-medium text-gray-900 dark:text-gray-100 
        leading-snug line-clamp-2
        transition-colors duration-200
        group-hover:text-gray-800 dark:group-hover:text-white
      "
            >
              {data.title}
            </span>
          </GlowingCard>
        ))}
      </GlowingCards> */}
    </main>
  );
}
