import React from "react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "../magicui/scroll-based-velocity";

const items = [
  "Pre-University",
  "Foundation",
  "Full Stack Development",
  "Java",
  "Dev-OPs",
  "Spring Boot",
  "Flutter",
];

export default function HorizontalScrollText() {
  return (
    <div>
      <ScrollVelocityContainer className="text-4xl font-bold  tracking-[-0.02em]">
        <ScrollVelocityRow baseVelocity={5} direction={1}>
          {items.map((item) => (
            <span className="mr-20" key={item}>
              {item}
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-whitesmoke"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-whitesmoke"></div>
    </div>
  );
}