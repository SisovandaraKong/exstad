"use client";
import React from "react";

// Minimal horizontal scroller to replace missing Swiper dependency.
// This component intentionally keeps the same default export usage as the original
// so it can be dropped into pages that import it as a component without props.
export default function SwiperSlide_RecommendCourse() {
  const items = [
    { id: 1, title: "Recommended Course 1", subtitle: "Short description" },
    { id: 2, title: "Recommended Course 2", subtitle: "Short description" },
    { id: 3, title: "Recommended Course 3", subtitle: "Short description" },
    { id: 4, title: "Recommended Course 4", subtitle: "Short description" },
  ];

  return (
    <section aria-label="Recommended courses" className="w-full">
      <h3 className="text-xl font-semibold mb-4">Recommended for you</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((it) => (
          <article
            key={it.id}
            className="min-w-[220px] flex-shrink-0 bg-card p-4 rounded-lg shadow-md"
          >
            <h4 className="font-medium">{it.title}</h4>
            <p className="text-sm text-muted-foreground">{it.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
