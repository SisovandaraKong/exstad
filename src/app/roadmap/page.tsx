"use client";

import GlowingCards, {
  GlowingCard,
} from "@/components/lightswind/glowing-cards";
import { DotPattern } from "@/components/magicui/dot-pattern";
import BackgroundCircle from "@/components/roadmap/BackgroundCircle";
import HorizontalScrollText from "@/components/roadmap/HorizontalScrollText";
import LabelLevel from "@/components/roadmap/LabelLevel";
import { Button } from "@/components/ui/button";
import { programData } from "@/data/programData";
import Image from "next/image";
import React from "react";

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

      <GlowingCards
        enableGlow={true}
        glowRadius={20}
        glowOpacity={0.8}
        animationDuration={500}
        borderRadius="0rem"
        gap="20px"
        responsive={true}
        className="gap-6 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
        backgroundColor="#ffffff"
        customTheme={''}
      >
        {programData.map((data) => (
          <GlowingCard
            key={data.title}
            glowColor="#FF0000"
            className="flex-1 basis-1/3 flex-col rounded-md justify-between p-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-20 w-20 flex justify-center items-center border rounded-md shadow-sm overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              <LabelLevel
                level={data.level as "Beginner" | "Advanced" | "Intermediate"}
              />
            </div>
            <span className="mt-4 text-lg md:text-xl line-clamp-2">
              {data.title}
            </span>
          </GlowingCard>
        ))}
      </GlowingCards>
    </main>
  );
}
