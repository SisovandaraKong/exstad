"use client";

import React, { useState } from "react";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  Globe,
  GraduationCap,
  Layers,
  Code,
  BookOpen,
  Award,
  Briefcase,
} from "lucide-react";

import data from "@/data/Schorlar.json";
import { Button } from "../ui/button";

// --- Card Components ---
const Card1 = ({ person }: { person: (typeof data.MOCK_SCHOLARS)[number] }) => (
  <div className="relative rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-md dark:bg-slate-800/40">
    <div className="aspect-[4/5] w-full overflow-hidden relative">
      <Image
        src={person.image}
        alt={person.name}
        fill
        className="object-cover"
        priority={person.id === 1}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-gradient-to-r from-rose-600/70 to-indigo-500/50">
      <h3 className="text-base font-semibold text-white drop-shadow-md">
        {person.name}
      </h3>
      <p className="text-xs md:text-sm text-white/90 mt-1 leading-snug drop-shadow">
        {person.title}
      </p>
    </div>
  </div>
);

const Card2 = ({ person }: { person: (typeof data.MOCK_SCHOLARS_2)[number] }) => (
  <div className="rounded-xl p-[2px] bg-gradient-to-r from-blue-500 to-pink-500 shadow-md transition">
    <div className="rounded-xl bg-white dark:bg-slate-800 p-10 text-center">
      <div className="mx-auto h-40 w-40 rounded-full overflow-hidden border border-slate-200 shadow-md dark:border-slate-600">
        <Image
          src={person.image}
          alt={person.name}
          width={160}
          height={160}
          className="object-cover"
        />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
        {person.name}
      </h3>
      <p className="text-lg text-slate-500 dark:text-slate-400">
        {person.title}
      </p>
      <p className="mt-5 text-lg md:text-xl text-slate-600 dark:text-slate-300 italic leading-relaxed">
        “{person.quote}”
      </p>
    </div>
  </div>
);

// --- Page ---
export default function ScholarsPage() {
  const [activeCategory, setActiveCategory] = useState("Pre University");

  const categories = [
    { name: "All", icon: Globe },
    { name: "Pre University", icon: GraduationCap },
    { name: "Foundation", icon: Layers },
    { name: "Full Stack Web", icon: Code },
    { name: "ITP", icon: BookOpen },
    { name: "ITE", icon: Award },
    { name: "Short Course", icon: Briefcase },
  ];

  const filtered =
    activeCategory === "All"
      ? data.MOCK_SCHOLARS_2
      : data.MOCK_SCHOLARS_2.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* === SECTION 1: Infinite Scroll with Gradient Background === */}
      <section className="relative isolate overflow-hidden min-h-screen bg-gradient-to-b from-blue-200 via-red-200 to-blue-100">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div className="text-center">
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
        From Classrooms to Careers
      </h1>
      <p className="mt-2 text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
        The Journey of Our Abroad Scholars
      </p>
    </div>

    <div className="mt-12">
      <InfiniteMovingCards
        items={data.MOCK_SCHOLARS.map((person) => (
          <div className="w-60 sm:w-72 md:w-80" key={person.id}>
            {/* Card1 without hover/animation overlays */}
            <div className="rounded-2xl shadow-md bg-white dark:bg-slate-800">
              <Card1 person={person} />
            </div>
          </div>
        ))}
        direction="left"
        speed="normal"
        pauseOnHover={true}
      />
    </div>
  </div>
</section>


      {/* === SECTION 2: Filterable Scholars === */}
      <section className="relative isolate overflow-hidden border-t border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Discover Our <br /> exSTAD Scholar
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find the best student for your company and boost your business
              too.
            </p>
          </div>

          {/* Category buttons */}
          <div
            className="mt-6 flex flex-wrap justify-center gap-4"
            // role="tablist"
          >
            {categories.map(({ name, icon: Icon }) => {
              const active = activeCategory === name;
              return (
                <Button
                  key={name}
                  onClick={() => setActiveCategory(name)}
                  className="relative flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors"
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active
                        ? "text-blue-600"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  />
                  <span
                    className={
                      active
                        ? "text-blue-600"
                        : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                    }
                  >
                    {name}
                  </span>
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Scholar cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((person) => (
              <Card2 key={`s2-${person.id}`} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 3: Scholar Spotlight === */}
      <section className="relative isolate overflow-hidden border-t border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-col gap-10 md:grid md:grid-cols-5 md:items-center">
            {/* Image side */}
            <div className="md:col-span-2">
              <div className="rounded-2xl p-[2px] bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={data.SPOTLIGHT.image}
                      alt="exSTAD | ITE scholar spotlight"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="md:col-span-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-slate-800/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-slate-700">
                {data.SPOTLIGHT.badge}
              </span>
              <h3 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {data.SPOTLIGHT.headline}
              </h3>
              <p className="mt-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-rose-600">
                {data.SPOTLIGHT.sub}
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {data.SPOTLIGHT.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-indigo-600 shadow hover:opacity-90"
                >
                  View Full Story
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-300/70 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  Meet More Scholars
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 4: Success Blueprint === */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Title + Steps */}
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                The Success Blueprint for ISTAD Alumni
              </h2>

              <div className="mt-12 flex flex-col gap-10">
                {/* Step 1 */}
                <div className="flex items-center gap-6 relative">
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    01
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-blue-50 text-blue-600 p-2 ring-1 ring-blue-100">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Build a Strong Foundation
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Learn core IT skills
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-6 relative">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-amber-50 text-amber-600 p-2 ring-1 ring-amber-100">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Putting Skills into Practice
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Practice what you’ve learned
                      </p>
                    </div>
                  </div>
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    02
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-6 relative">
                  <span className="text-6xl md:text-7xl font-extrabold text-slate-300/60">
                    03
                  </span>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-6 py-5 ring-1 ring-black/5 flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-rose-50 text-rose-600 p-2 ring-1 ring-rose-100">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        Mastery and Leadership
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Become an expert, lead projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Two images side by side */}
            <div className="grid grid-cols-2 gap-6">
              <Image
                src="/image/reach.jpg"
                alt="Award Ceremony"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-md"
                priority
              />
              <Image
                src="/image/yith_sopheaktra.jpg"
                alt="Student Writing"
                width={500}
                height={400}
                className="rounded-2xl object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
