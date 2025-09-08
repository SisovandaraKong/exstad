"use client";
import React from "react";
import Image from "next/image";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";
import { LiaGraduationCapSolid } from "react-icons/lia";
import transcriptions from "@/data/Transcription.json";
import achievements from "@/data/Achievement.json";
import profileData from "@/data/profileSection.json";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";

import certificate from "@/data/Certificate.json";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";

const ProfilePortfolio = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Sidebar Profile */}
      <div className="md:col-span-6 lg:col-span-4">
        <div className="sticky top-4 md:top-20 self-start">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 md:p-6 w-full box-border">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 sm:w-80 sm:h-80 md:w-50 md:h-50 mb-4">
                <Image
                  src={profileData.imageUrl}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-4 border-primary shadow-md"
                />
              </div>
              {/* Name & Job */}
              <div className="text-center mb-4">
                <h2 className="font-d1 font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl break-words">
                  {profileData.name}
                </h2>
                <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base break-words">
                  {profileData.title}
                </p>
              </div>
            </div>

            {/* About */}
            <div className="pt-4">
              <h3 className="font-d2 font-semibold text-color mb-2 dark:text-white text-sm sm:text-base md:text-d4">
                About
              </h3>
              <p className="font-d3 text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words md:text-d5">
                {profileData.bio}
              </p>
            </div>

            {/* Social */}
            <div className="pt-4">
              <h3 className="font-d2 font-semibold text-color mb-2 dark:text-white text-sm sm:text-base md:text-d4">
                Social Media
              </h3>
              <div className="md:text-d5 font-d3 space-y-2.5 text-sm sm:text-base dark:text-white">
                <div className="flex flex-wrap items-center gap-2 break-words">
                  <FaFacebook className="text-blue-600 font-d2" /> Chhun Meyling
                </div>
                <div className="flex flex-wrap items-center gap-2 break-words">
                  <FaGithub className="text-gray-900 dark:text-white font-d2" />{" "}
                  @Chhun Meyling
                </div>
                <div className="flex flex-wrap items-center gap-2 break-words">
                  <CgMail className="text-red-500 font-d2" />{" "}
                  meyling123@example.edu.kh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:col-span-6 lg:col-span-8 flex flex-col gap-10 md:ml-5">
        {/* Transcription Section */}
        <div>
          <h3 className="font-h4 sm:text-2xl font-semibold mb-4">
            Transcription
          </h3>
          <MotionHighlight>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {transcriptions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition cursor-pointer"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-100 text-yellow-500 text-xl sm:text-2xl">
                      <LiaGraduationCapSolid />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-400 break-words">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <a href="/" className="mt-1 sm:mt-0">
                    <FiArrowUpRight className="text-yellow-500 text-xl sm:text-2xl" />
                  </a>
                </div>
              ))}
            </div>
          </MotionHighlight>
        </div>

 {/* Certificate Gallery */}
        <div>
          <h3 className="font-h4 font-semibold mb-4">Certificate</h3>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4 ">
            {certificate.map((cert) => (
              <div
                key={cert.id}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[24rem] relative hover:shadow-lg transition-shadow rounded-xl cursor-pointer"
              >
                <Image
                  src={cert.logo}
                  alt={cert.title}
                  width={384} // match desired width
                  height={384} // make height equal to width → perfect square
                  className="object-cover rounded-xl "
                />
              </div>
            ))}
          </div>
        </div>


        {/* Achievement Section */}
        <div>
          <h3 className="font-h4 font-semibold mb-4">Achievement</h3>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="min-w-[300px] sm:min-w-[200px] md:min-w-[350px] lg:min-w-[400px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-card dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col"
              >
                {/* Image Container */}
                <div className="w-full h-40 sm:h-100 md:h-52 flex justify-center items-center mb-4">
                  <Image
                    src={ach.logo}
                    alt={ach.title}
                    width={150} // max width of image
                    height={150} // max height of image
                    className="object-contain w-35 h-35 sm:w-35 sm:h-35 md:w-45 md:h-45 lg:w-50 lg:h-50"
                  />
                </div>

                {/* Title */}
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                  {ach.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-2 line-clamp-3">
                  {ach.description}
                </p>

                {/* Link */}
                {ach.link && (
                  <a
                    href={ach.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline block mb-2 break-words"
                  >
                    {ach.link}
                  </a>
                )}

                {/* Spacer — pushes Date & Type to bottom */}
                <div className="mt-auto" />

                {/* Date & Type */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{ach.date}</span>
                  <span>{ach.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

       
        {/* Completed Courses */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Completed Courses
          </h3>
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={5} direction={1}>
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="min-w-[160px] sm:min-w-[280px] max-w-sm flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md p-2 sm:p-4 hover:shadow-lg transition mx-2 sm:mx-3 flex flex-col items-center"
                >
                  <div className="w-full flex justify-center mb-3 sm:mb-4">
                    <Image
                      src={ach.logo}
                      alt={ach.title}
                      width={200} // increase width
                      height={200} // increase height
                      className=" object-cover  "
                    />
                  </div>
                  <h4 className="text-center font-semibold text-lg">
                    {ach.title}
                  </h4>
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
