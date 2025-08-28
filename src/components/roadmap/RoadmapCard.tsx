import Image from "next/image";
import React from "react";
import LabelLevel from "./LabelLevel";
import {
  GlowingCards,
  GlowingCard,
} from "@/components/lightswind/glowing-cards";

type Prop = {
  image: string;
  title: string;
  level: string;
  color: string;
};

export default function RoadmapCard(props: Prop) {
  const { image, title, level, color } = props;

  return (
    <GlowingCard className={"flex flex-col w-full"} glowColor={color}>
      <div className="flex items-start justify-between">
        <div className="h-20 w-20 p-1 flex justify-center border-1 items-center rounded-sm shadow-md">
          <Image
            src={image}
            alt={title}
            width={56}
            height={56}
            className="w-full h-full"
            unoptimized
          />
        </div>
        <LabelLevel level={level} />
      </div>
      <span className="text-xl ">{title}</span>
    </GlowingCard>
  );
}
