"use client";

import React, { useState } from "react";
import { X, Filter } from "lucide-react";
import { useKhmerNumber } from "@/services/to-khmer-number";
import { useTranslations } from "next-intl";

type MasterProgramType = {
  programType: "SCHOLARSHIP" | "SHORT_COURSE" | string;
  title: string;
};

type Props = {
  programData: MasterProgramType[];
  programFilter: string;
  setProgramFilter: (filter: string) => void;
  levelFilter: string;
  setLevelFilter: (filter: string) => void;
  subFilter: string[];
  setSubFilter: (filter: string[]) => void;
};

const ProgramActiveSidebar: React.FC<Props> = ({
  programData,
  programFilter,
  setProgramFilter,
  levelFilter,
  setLevelFilter,
  subFilter,
  setSubFilter,
}) => {
  const [showAllScholarships, setShowAllScholarships] = useState(false);
  const [showAllShortCourses, setShowAllShortCourses] = useState(false);
  const t = useTranslations();
  const toKhmerNumber = useKhmerNumber();
  

  const scholarshipOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.programType === "SCHOLARSHIP")
        .map((p) => p.title)
        .filter(Boolean)
    )
  );

  const shortCourseOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.programType === "SHORT_COURSE")
        .map((p) => p.title)
        .filter(Boolean)
    )
  );

  const visibleScholarshipOptions = showAllScholarships
    ? scholarshipOptions
    : scholarshipOptions.slice(0, 3);

  const visibleShortCourseOptions = showAllShortCourses
    ? shortCourseOptions
    : shortCourseOptions.slice(0, 3);

  const toggleOption = (option: string) => {
    setSubFilter(
      subFilter.includes(option)
        ? subFilter.filter((o) => o !== option)
        : [...subFilter, option]
    );
  };

  const renderOption = (option: string, selected: boolean) => (
    <li
      key={option}
      className="flex items-center gap-2 cursor-pointer transition-opacity duration-300"
    >
      <div
        className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 transition-all duration-150 ${
          selected ? "border-4 border-primary" : ""
        }`}
        onClick={() => toggleOption(option)}
      />
      <button
        onClick={() => toggleOption(option)}
        className="text-[13px] font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-150 text-left"
      >
        {option}
      </button>
    </li>
  );

  const renderToggleButton = (
    options: string[],
    showAll: boolean,
    setShowAll: (show: boolean) => void
  ) => {
    if (options.length <= 3) return null;

    const remainingCount = options.length - 3;
    const displayCount = toKhmerNumber(remainingCount);

    return (
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-2 ml-1 text-primary dark:text-white text-xs font-semibold hover:underline transition-colors duration-150"
      >
        {showAll
          ? t("show-less")
          : `${t("load-more")} (${displayCount})`}
      </button>
    );
  };

  return (
<aside className="w-auto sticky top-28 p-[20px] border rounded-lg bg-background shadow-lg space-y-1">
  <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
    <Filter size={26} className="text-primary  flex-shrink-0" />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight m-0">
      {t("filter")}
    </h2>
  </div>

  {/* Scrollable Filters */}
  <div className="overflow-y-auto max-h-[70vh] space-y-4">
    {/* Program Type Filter */}
    <div>
      <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
        {t("program-type")}
      </h3>
      <ul className="space-y-2 p-2">
        {["All", "Scholarship Course", "Short Course"].map((type) => (
          <li key={type} className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 transition-all duration-150 ${
                programFilter === type ? "border-4 border-primary" : ""
              }`}
              onClick={() => {
                setProgramFilter(type);
                setSubFilter([]);
              }}
            />
            <button
              onClick={() => {
                setProgramFilter(type);
                setSubFilter([]);
              }}
              className="text-[13px] font-medium text-gray-700 dark:text-gray-300"
            >
              {type === "All"
                ? t("all")
                : type === "Scholarship Course"
                ? t("scholarship-courses")
                : t("short-courses")}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Scholarship Filter */}
    <div>
      <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
        {t("scholarship")}
      </h3>
      <ul className="space-y-2 p-2">
        {visibleScholarshipOptions.map((option) =>
          renderOption(option, subFilter.includes(option))
        )}
      </ul>
      {renderToggleButton(
        scholarshipOptions,
        showAllScholarships,
        setShowAllScholarships
      )}
    </div>

    {/* Short Course Filter */}
    <div>
      <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
        {t("short-courses")}
      </h3>
      <ul className="space-y-2 p-2">
        {visibleShortCourseOptions.map((option) =>
          renderOption(option, subFilter.includes(option))
        )}
      </ul>
      {renderToggleButton(
        shortCourseOptions,
        showAllShortCourses,
        setShowAllShortCourses
      )}
    </div>

    {/* Level Filter */}
    <div>
      <h3 className="font-medium text-[16px] mb-2 text-gray-800 dark:text-gray-200">
        {t("level")}
      </h3>
      <ul className="space-y-2 p-2">
        {["All", "Basic", "Intermediate", "Advanced"].map((level) => (
          <li key={level} className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 transition-all duration-150 ${
                levelFilter === level ? "border-4 border-primary" : ""
              }`}
              onClick={() => setLevelFilter(level)}
            />
            <button
              onClick={() => setLevelFilter(level)}
              className="text-[13px] font-medium text-gray-700 dark:text-gray-300"
            >
              {level === "All"
                ? t("all")
                : level === "Basic"
                ? t("basic")
                : level === "Intermediate"
                ? t("intermediate")
                : t("advanced")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>

  <button
    onClick={() => {
      setProgramFilter("All");
      setLevelFilter("All");
      setSubFilter([]);
      setShowAllScholarships(false);
      setShowAllShortCourses(false);
    }}
    className="flex items-center justify-center gap-1 mt-2 px-3 py-1 
      border border-gray-300 text-gray-700 bg-white 
      hover:bg-gray-50 hover:border-gray-400 hover:shadow-md
      dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800
      dark:hover:bg-gray-700 
      text-sm font-medium rounded-lg shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-1 
      transition-all duration-150 w-full"
  >
    <X className="w-4 h-4" />
    {t("reset-filters")}
  </button>
</aside>

  );
};

export default ProgramActiveSidebar;