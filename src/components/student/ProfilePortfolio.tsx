
"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";

import CompletedCourseCard from "@/components/ui/completed-course-card";
// (Removed InfiniteMovingCards import – not used)

import type { SocialLink, Scholar } from "@/types/portfolio";
import type { ScholarAchievement } from "@/types/achievement";

import {
  useGetScholarByUsernameQuery,
  useGetScholarSocialLinksQuery,
  useGetScholarCertificatesQuery,
  useGetScholarCompletedCoursesQuery,
  useGetScholarAchievementsQuery,
  useGetOpeningProgramByUuidQuery,
} from "@/components/student/StudentApi";
import { skipToken } from "@reduxjs/toolkit/query";

type Props = {
  username: string;
  avatarAnchorRef?: React.RefObject<HTMLDivElement>;
};

type ApiCertificate = {
  uuid: string;
  fileName?: string;
  scholarUuid?: string;
  openingProgramUuid?: string;
  tempCertificateUrl?: string;
  certificateUrl?: string; // render only when this exists
  isVerified?: boolean;
  audit?: {
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

const iconFor = (title: string) => {
  const key = title.toLowerCase();
  if (key.includes("facebook")) return <FaFacebook className="text-blue-600" />;
  if (key.includes("github"))
    return <FaGithub className="text-gray-900 dark:text-white" />;
  if (key.includes("telegram")) return <FaTelegram className="text-sky-500" />;
  if (key.includes("mail") || key.includes("email"))
    return <CgMail className="text-red-500" />;
  return <FiArrowUpRight />;
};

const AVATAR_PX = 192; // same size as SharedScrollAvatar bottomSize

// Small helper that fetches Opening Program name by UUID
function ProgramTitle({
  openingProgramUuid,
  fallback,
}: {
  openingProgramUuid?: string;
  fallback: string;
}) {
  const { data, isLoading, isError } = useGetOpeningProgramByUuidQuery(
    openingProgramUuid ?? skipToken
  );

  if (!openingProgramUuid) return <>{fallback}</>;
  if (isLoading) return <>Loading…</>;
  if (isError || !data) return <>{fallback}</>;

  const label =
    data.programName && data.generation
      ? `${data.programName} • Gen ${data.generation}`
      : data.programName || data.name || fallback;

  return <>{label}</>;
}

export default function ProfilePortfolio({ username, avatarAnchorRef }: Props) {
  const {
    data: scholar,
    isLoading,
    isError,
  } = useGetScholarByUsernameQuery(username, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { data: socialLinks = [] } = useGetScholarSocialLinksQuery(
    scholar?.uuid ?? skipToken,
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  const {
    data: achievements = [],
    isLoading: achievementsLoading,
    isError: achievementsError,
    error: achievementsErrorDetails,
  } = useGetScholarAchievementsQuery(scholar?.uuid ?? skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  // Completed courses (API) – used elsewhere on the page and to build optional local mapping if needed
  const { data: completedCourses = [] } = useGetScholarCompletedCoursesQuery(
    scholar?.uuid ?? skipToken,
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  // Certificates (API)
  const {
    data: certificates = [],
    isLoading: certsLoading,
    isError: certsError,
    error: certsErrorDetails,
  } = useGetScholarCertificatesQuery(scholar?.uuid ?? skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [expandedDescriptions, setExpandedDescriptions] = React.useState<
    Record<string, boolean>
  >({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (isError || !scholar) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load profile for {username}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* LEFT: Profile card */}
      <div className="md:col-span-6 lg:col-span-4">
        <div className="sticky top-6 md:top-25 self-start">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full box-border">
            {/* Avatar */}
            <div className="flex flex-col items-center">
  <div
    className="relative mb-4 rounded-full overflow-hidden"
    style={{ width: 192, height: 192 }}
  >
    <div
      ref={avatarAnchorRef}
      className="absolute inset-0 rounded-full overflow-hidden"
    />
  </div>
</div>

            {/* About */}
            <div className="pt-4">
              <h3 className="font-d2 font-semibold mb-2 dark:text-white text-lg">
                About
              </h3>
              <p className="font-d3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {scholar.bio || "No bio yet."}
              </p>
            </div>

            {/* Social */}
            <div className="pt-4">
              <h3 className="font-d2 font-semibold mb-2 dark:text-white text-lg">
                Social Media
              </h3>
              <div className="space-y-2 text-sm sm:text-base dark:text-white">
                {scholar.email && (
                  <div className="flex items-center gap-2 break-words">
                    <CgMail className="text-red-500" /> {scholar.email}
                  </div>
                )}
                {socialLinks
                  .filter((s: SocialLink) => s.isActive)
                  .map((s: SocialLink) => {
                    const href = /^https?:\/\//i.test(s.link)
                      ? s.link
                      : `https://${s.link}`;
                    return (
                      <div
                        key={s.uuid}
                        className="flex items-center gap-2 break-words"
                      >
                        {iconFor(s.title)}
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {s.title}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Content */}
      <div className="md:col-span-6 lg:col-span-8 flex flex-col gap-10 md:ml-5">
        {/* Certificates */}
        <section>
          <h3 className="font-h4 font-semibold mb-4">Certificate</h3>

          {/* Loading */}
          {certsLoading && (
            <div className="flex gap-4 overflow-x-auto hide-scroll-bar pb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-72 sm:w-80 md:w-96 h-32 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {certsError && (
            <div className="text-sm text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <p className="font-semibold mb-1">Failed to load certificates</p>
              <p className="text-xs opacity-80 mb-2">
                {certsErrorDetails
                  ? `Error: ${JSON.stringify(certsErrorDetails, null, 2)}`
                  : "An error occurred while fetching certificates."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs underline hover:no-underline"
              >
                Try refreshing the page
              </button>
            </div>
          )}

          {/* List (latest per opening program, cards w/ program title from API) */}
          {!certsLoading &&
            !certsError &&
            (() => {
              const list = (certificates as ApiCertificate[]) || [];
              const withFinalUrl = list.filter((c) => !!c.certificateUrl);
              const ts = (c: ApiCertificate) =>
                c.audit?.createdAt ? Date.parse(c.audit.createdAt) : 0;

              const latestByProgram = new Map<string, ApiCertificate>();
              for (const c of withFinalUrl) {
                const key = c.openingProgramUuid || "__no_program__";
                const prev = latestByProgram.get(key);
                if (!prev) {
                  latestByProgram.set(key, c);
                  continue;
                }
                const tNew = ts(c);
                const tOld = ts(prev);
                if (tNew > tOld) {
                  latestByProgram.set(key, c);
                } else if (tNew === tOld) {
                  // prefer verified on tie
                  const scoreNew = c.isVerified ? 1 : 0;
                  const scoreOld = prev.isVerified ? 1 : 0;
                  if (scoreNew > scoreOld) latestByProgram.set(key, c);
                }
              }

              const visible = Array.from(latestByProgram.values()).sort(
                (a, b) => ts(b) - ts(a)
              );

              if (visible.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground">
                    No certificates to display yet.
                  </p>
                );
              }

              return (
                <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4 snap-x snap-mandatory">
                  {visible.map((cert) => {
                    const url = cert.certificateUrl!;
                    const created =
                      cert.audit?.createdAt &&
                      new Date(cert.audit.createdAt).toLocaleDateString();

                    return (
                      <a
                        key={cert.uuid}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={cert.fileName || "Certificate"}
                        className="group relative flex-none w-72 sm:w-80 md:w-96 snap-start rounded-2xl overflow-hidden bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-4"
                      >
                        {/* Icon + title row */}
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-10 h-10 rounded-xl grid place-items-center bg-primary/10 text-primary dark:bg-primary/15">
                            {/* document/award icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5"
                              aria-hidden="true"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16.5a1 1 0 0 0 1.53.85L9 19.14l3.47 2.21a1 1 0 0 0 1.53-.85V4a2 2 0 0 0-2-2Zm6 4h-4v2h3v12H14v2h5a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
                            </svg>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                              <ProgramTitle
                                openingProgramUuid={cert.openingProgramUuid}
                                fallback={cert.fileName || "Certificate"}
                              />
                            </h4>

                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              {cert.isVerified ? (
                                <span className="inline-flex items-center gap-1">
                                  ✅ Verified
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  🗂️ Unverified
                                </span>
                              )}
                              {created && (
                                <>
                                  <span>•</span>
                                  <time>{created}</time>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* footer action hint */}
                        <div className="mt-4 flex items-center justify-between text-xs text-primary">
                          <span className="opacity-80">Open certificate</span>
                          <span className="transition-transform group-hover:translate-x-0.1">
                            ↗
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              );
            })()}
        </section>

        {/* === SECTION: Achievements === */}
        <section >
          <h3 className="font-h4 font-semibold mb-4">Achievement</h3>

          {/* Loading */}
          {achievementsLoading && (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 animate-pulse"
                >
                  <div className="w-full h-36 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2" />
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded mb-5" />
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {achievementsError && (
            <div className="text-sm text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <p className="font-semibold mb-1">Failed to load achievements</p>
              <p className="text-xs opacity-80 mb-2">
                {achievementsErrorDetails
                  ? `Error: ${JSON.stringify(
                      achievementsErrorDetails,
                      null,
                      2
                    )}`
                  : "An error occurred while fetching achievements."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs underline hover:no-underline"
              >
                Try refreshing the page
              </button>
            </div>
          )}

          {/* List */}
          {!achievementsLoading && !achievementsError && (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
              {achievements.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No achievements yet.
                </div>
              ) : (
                achievements.map((ach: ScholarAchievement) => {
                  const isExpanded = !!expandedDescriptions[ach.uuid];
                  const videoUrl =
                    ach.achievement.video || ach.achievement.link
                      ? /^(https?:)?\/\//i.test(
                          ach.achievement.video || ach.achievement.link
                        )
                        ? ach.achievement.video || ach.achievement.link
                        : `https://${
                            ach.achievement.video || ach.achievement.link
                          }`
                      : "";

                  return (
                    <div
                      key={ach.uuid}
                      className="w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col"
                    >
                      {/* Image / Logo */}
                      <div className="w-full h-36 flex justify-center items-center mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ach.achievement.icon}
                          alt={ach.achievement.title}
                          width={160}
                          height={160}
                          className="object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-xl sm:text-base">
                        {ach.achievement.title}
                      </h4>

                      {/* Description */}
                      <div className="relative text-md text-gray-500 mb-2 leading-snug">
                        <p
                          className={
                            isExpanded
                              ? ""
                              : "line-clamp-1 sm:line-clamp-2 transition-all"
                          }
                        >
                          {ach.achievement.description}
                        </p>
                        {ach.achievement.description &&
                          ach.achievement.description.length > 100 && (
                            <button
                              onClick={() =>
                                setExpandedDescriptions((prev) => ({
                                  ...prev,
                                  [ach.uuid]: !prev[ach.uuid],
                                }))
                              }
                              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-1"
                            >
                              {isExpanded ? "See less" : "See more"}
                            </button>
                          )}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex justify-between items-center text-xs text-accent-foreground gap-2">
                        {videoUrl && (
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover flex items-center gap-1"
                          >
                            🎥 Video Demo
                          </a>
                        )}
                        <span>
                          {new Date(ach.audit.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 justify-between text-xs text-accent-foreground">
                        {ach.achievement.link && (
                          <a
                            href={
                              /^(https?:)?\/\//i.test(ach.achievement.link)
                                ? ach.achievement.link
                                : `https://${ach.achievement.link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover flex items-center gap-1"
                          >
                            🔗 Project Link
                          </a>
                        )}

                        <span>{ach.achievement.achievementType}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </section>

        {/* === SECTION: Completed Courses (from scholar.completedCourses) === */}
        <section>
          <h3 className="font-h4 font-semibold mb-4">Completed Courses</h3>

          {!isLoading &&
            !isError &&
            (() => {
              const raw = Array.isArray((scholar as any)?.completedCourses)
                ? (scholar as any).completedCourses
                : [];

              if (raw.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground">
                    No completed courses yet.
                  </p>
                );
              }

              return (
                <div className="flex gap-6 overflow-x-auto hide-scroll-bar pb-4 snap-x snap-mandatory">
                  {raw.map((c: any, idx: number) => (
                    <div
                      key={`${c.uuid}-${idx}`}
                      className="group relative flex-none w-[520px] h-[380px] snap-start overflow-hidden rounded-[32px] [&>div]:w-full [&>div]:h-full [&_img]:block [&_img]:absolute [&_img]:inset-0 [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CompletedCourseCard
                        variant={idx % 2 === 0 ? "dark" : "light"}
                        course={{
                          uuid: c.uuid,
                          programName: c.programName,
                          generation: c.generation,
                          posterUrl:
                            c.posterUrl ||
                            c.thumbnail ||
                            "/course-fallback.jpg",
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
        </section>
      </div>

      {/* styles */}
      <style jsx>{`
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <style jsx global>{`
        .portfolio-avatar-fallback {
          opacity: 1;
          transition: opacity 0.18s ease;
          pointer-events: none;
        }
        :root[data-shared-avatar-ready="true"] .portfolio-avatar-fallback {
          opacity: 0;
        }

        /* --- Straight fall, always rotate(0deg) --- */
        @keyframes fall-straight {
          0% {
            transform: translateY(-120px) rotate(90deg);
            opacity: 0;
          }
          60% {
            transform: translateY(10px) rotate(90deg);
            opacity: 1;
          }
          80% {
            transform: translateY(-5px) rotate(90deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }
        .animate-fall-straight {
          animation: fall-straight 0.9s ease-out forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
