"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CompletedCourseCard,
  type CompletedCourse,
} from "@/components/Card/CompletedCourse";
import { cn } from "@/lib/utils";

interface InfiniteMovingCompletedCoursesProps {
  items: CompletedCourse[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCompletedCourses = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCompletedCoursesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    // duplicate items for infinite scroll
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const cloned = item.cloneNode(true);
      scrollerRef.current?.appendChild(cloned);
    });

    // set direction & speed
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current.style.setProperty("--animation-duration", duration);
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    setStart(true);
  }, [items, direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          start
            ? {
                animation:
                  "scroll var(--animation-duration, 40s) linear infinite",
                animationDirection: "var(--animation-direction, forwards)",
              }
            : undefined
        }
      >
        {items.map((course) => (
          <li key={course.id} className="inline-block flex-shrink-0">
            <CompletedCourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
};
