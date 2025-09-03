"use client";

import React from "react";
// import { useRef } from "react";
import Image from "next/image";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { CgMail, CgTranscript } from "react-icons/cg";
import { TbCertificate } from "react-icons/tb";
import { GrAchievement } from "react-icons/gr";
import { IoIosBookmarks } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";
// import { type ConfettiRef } from "@/components/magicui/confetti";
import transcriptions from "@/data/Transcription.json";
import achievements from "@/data/Achievement.json";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity";
import { LiaGraduationCapSolid } from "react-icons/lia";

const ProfilePortfolio = () => {
  // const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sidebar Profile */}
      <div className="md:col-span-1">
        <div className="sticky top-4 md:top-20 self-start">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4">
                <Image
                  src="/imgAboutUs/sanom.jpg"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full object-cover border-4 border-primary shadow-md"
                />
              </div>

              {/* Name & Job */}
              <div className="text-center mb-4">
                <h2 className="font-bold font-h4 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  CHHUM MEYLING
                </h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                  Full Stack Web Development
                </p>
              </div>
            </div>

            {/* About */}
            <div className="pt-4">
              <h3 className="font-d3 font-semibold text-color mb-2 dark:text-white text-sm sm:text-base">
                About
              </h3>
              <p className="font-d4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                As a business owner, I am dedicated to connecting with skilled
                freelancers and professionals to drive success.
              </p>
            </div>

            {/* Social */}
            <div className="pt-4">
              <h3 className="font-semibold font-d3 text-color mb-2 dark:text-white text-sm sm:text-base">
                Social Media
              </h3>
              <div className="space-y-2 font-d4 dark:text-white text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <FaFacebook className="text-blue-600" /> Chhun Meyling
                </div>
                <div className="flex items-center gap-2">
                  <FaGithub className="text-gray-900 dark:text-white" /> @Chhun
                  Meyling
                </div>
                <div className="flex items-center gap-2">
                  <CgMail className="text-red-500" /> meyling123@example.edu.kh
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="pt-4">
              <h3 className="font-semibold font-d3 mb-2 dark:text-white text-sm sm:text-base">
                Menu
              </h3>
              <div className="flex flex-col gap-2 font-d4 text-sm font-medium">
                <button className="flex items-center gap-2 text-primary hover:translate-x-2 transition-transform">
                  <CgTranscript />
                  Transcription
                </button>
                <button className="flex items-center gap-2 text-primary hover:translate-x-2 transition-transform">
                  <TbCertificate /> Certificate
                </button>
                <button className="flex items-center gap-2 text-primary hover:translate-x-2 transition-transform">
                  <GrAchievement /> Achievement
                </button>
                <button className="flex items-center gap-2 text-primary hover:translate-x-2 transition-transform">
                  <IoIosBookmarks /> Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:col-span-2 flex flex-col gap-10 md:ml-10">
        {/* Transcription Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Transcription</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {transcriptions.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start justify-between p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 text-yellow-500 text-2xl">
                    <LiaGraduationCapSolid />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <a href="#" className="mt-2 sm:mt-0">
                  <FiArrowUpRight className="text-yellow-500 text-xl" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Achievement</h3>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="min-w-[220px] sm:min-w-[280px] max-w-sm flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={ach.logo}
                    alt={ach.title}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                  {ach.title}
                </h4>
                <p className="text-sm text-gray-500 mb-2 line-clamp-3">
                  {ach.description}
                </p>
                <a
                  href={ach.link}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  {ach.link}
                </a>
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>{ach.date}</span>
                  <span>{ach.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Courses */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Completed Courses</h3>
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={5} direction={1}>
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="min-w-[220px] sm:min-w-sm max-w-sm flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition mx-2 sm:mx-3"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={ach.logo}
                      alt={ach.title}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    {ach.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-3">
                    {ach.description}
                  </p>
                  <a
                    href={ach.link}
                    target="_blank"
                    className="text-blue-600 text-sm underline"
                  >
                    {ach.link}
                  </a>
                  <div className="mt-3 flex justify-between text-xs text-gray-500">
                    <span>{ach.date}</span>
                    <span>{ach.type}</span>
                  </div>
                </div>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      </div>

      {/* Hide scrollbar style */}
      <style jsx>{`
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProfilePortfolio;
