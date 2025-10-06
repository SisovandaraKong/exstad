// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { FaFacebook, FaGithub } from "react-icons/fa";
// import { CgMail } from "react-icons/cg";
// import { FiArrowUpRight } from "react-icons/fi";
// import { LiaGraduationCapSolid } from "react-icons/lia";
// import transcriptions from "@/data/Transcription.json";
// import achievements from "@/data/Achievement.json";
// import profileData from "@/data/profileSection.json";
// import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
// import { CompletedCourseCard } from "@/components/Card/CompletedCourse";
// import completedCourses from "@/data/CompletedCourse.json";
// import Link from "next/link";
// import certificate from "@/data/Certificate.json";
// import { BorderBeam } from "@/components/magicui/border-beam";
// import { RainbowButton } from "@/components/magicui/rainbow-button";
// import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// const ProfilePortfolio = () => {
//   const [profile, setProfile] = useState(profileData);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [bio, setBio] = useState("");
//   const [quote, setQuote] = useState("");

//   const handleSave = () => {
//     const updatedProfile = { ...profile, bio, quote };
//     setProfile(updatedProfile);
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="px-4 sm:px-6 lg:px-12 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
//         {/* Sidebar Profile */}
//         <div className="md:col-span-6 lg:col-span-4">
//           <div className="sticky top-4 md:top-20 self-start">
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 md:p-6 w-full box-border">
//               {/* Profile Picture */}
//               <div className="flex flex-col items-center">
//                 <div className="relative w-28 h-28 sm:w-80 sm:h-80 md:w-50 md:h-50 mb-4">
//                   <Image
//                     src={profile.imageUrl}
//                     alt="Profile"
//                     fill
//                     className="rounded-full object-cover border-4 border-primary shadow-md"
//                   />
//                 </div>

//                 {/* Name & Job */}
//                 <div className="text-center mb-4">
//                   <h2 className="font-d1 font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl break-words">
//                     {profile.name}
//                   </h2>
//                   <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base break-words">
//                     {profile.title}
//                   </p>
//                 </div>

               
//                 <RainbowButton
//                   variant="default"
//                   size="lg"
//                   onClick={() => setIsModalOpen(true)}
//                   className="px-5 py-2 mb-4 transition"
//                 >
//                   Edit Profile
//                 </RainbowButton>
//               </div>

//               {/* About */}
//               <div className="pt-4">
//                 <h3 className="font-d2 font-semibold text-color mb-2 dark:text-white text-sm sm:text-base md:text-d4">
//                   About
//                 </h3>
//                 <p className="font-d3 text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words md:text-d5">
//                   {profile.bio}
//                 </p>
//               </div>

//               {/* Social */}
//               <div className="pt-4">
//                 <h3 className="font-d2 font-semibold text-color mb-2 dark:text-white text-sm sm:text-base md:text-d4">
//                   Social Media
//                 </h3>
//                 <div className="md:text-d5 font-d3 space-y-2.5 text-sm sm:text-base dark:text-white">
//                   <div className="flex flex-wrap items-center gap-2 break-words">
//                     <FaFacebook className="text-blue-600 font-d2" /> Chhun
//                     Meyling
//                   </div>
//                   <div className="flex flex-wrap items-center gap-2 break-words">
//                     <FaGithub className="text-gray-900 dark:text-white font-d2" />{" "}
//                     @Chhun Meyling
//                   </div>
//                   <div className="flex flex-wrap items-center gap-2 break-words">
//                     <CgMail className="text-red-500 font-d2" />{" "}
//                     meyling123@example.edu.kh
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Content */}
//         <div className="md:col-span-6 lg:col-span-8 flex flex-col gap-10 md:ml-5">
//           {/* Transcription Section */}
//           <div>
//             <h3 className="font-h4 sm:text-2xl font-semibold mb-4">
//               Transcription
//             </h3>
//             <MotionHighlight>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//                 {transcriptions.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between p-3 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition cursor-pointer"
//                   >
//                     <div className="flex items-start gap-3 sm:gap-4">
//                       <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-100 text-yellow-500 text-xl sm:text-2xl">
//                         <LiaGraduationCapSolid />
//                       </div>
//                       <div>
//                         <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words">
//                           {item.title}
//                         </h4>
//                         <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-400 break-words">
//                           {item.subtitle}
//                         </p>
//                       </div>
//                     </div>
//                     <Link href="/" className="mt-1 sm:mt-0">
//                       <FiArrowUpRight className="text-yellow-500 text-xl sm:text-2xl" />
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </MotionHighlight>
//           </div>

//           {/* Certificate Gallery */}
//           <div>
//             <h3 className="font-h4 font-semibold mb-4">Certificate</h3>
//             <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4 ">
//               {certificate.map((cert) => (
//                 <Link
//                   key={cert.id}
//                   href={`/certificate/${cert.id}`}
//                   className="flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[24rem] relative hover:shadow-lg transition-shadow rounded-xl"
//                 >
//                   <Image
//                     src={cert.logo}
//                     alt={cert.title}
//                     width={384}
//                     height={384}
//                     className="object-cover rounded-xl"
//                   />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Achievement Section */}
//           <div>
//             <h3 className="font-h4 font-semibold mb-4">Achievement</h3>
//             <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
//               {achievements.map((ach) => (
//                 <div
//                   key={ach.id}
//                   className="min-w-[300px] sm:min-w-[200px] md:min-w-[350px] lg:min-w-[400px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-card dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col"
//                 >
//                   <div className="w-full h-40 sm:h-100 md:h-52 flex justify-center items-center mb-4">
//                     <Image
//                       src={ach.logo}
//                       alt={ach.title}
//                       width={150}
//                       height={150}
//                       className="object-contain"
//                     />
//                   </div>
//                   <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
//                     {ach.title}
//                   </h4>
//                   <p className="text-sm text-gray-500 mb-2 line-clamp-3">
//                     {ach.description}
//                   </p>
//                   {ach.link && (
//                     <a
//                       href={ach.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 text-sm underline block mb-2 break-words"
//                     >
//                       {ach.link}
//                     </a>
//                   )}
//                   <div className="mt-auto" />
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>{ach.date}</span>
//                     <span>{ach.type}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Completed Courses Section */}
//           <div>
//             <h3 className="font-h4 font-semibold">Completed Courses</h3>
//             <InfiniteMovingCards
//               items={completedCourses.map((course) => (
//                 <CompletedCourseCard
//                   key={course.id}
//                   course={course}
//                   className="w-72 sm:w-80 md:w-96 lg:w-[24rem]"
//                 />
//               ))}
//               direction="left"
//               speed="normal"
//               pauseOnHover={true}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-md w-full">
//             <BorderBeam
//               size={90}
//               colorFrom="#ffaa40"
//               colorTo="#9c40ff"
//               borderWidth={1.8}
//               duration={6}
//             />
//             <h2 className="text-xl font-bold mb-2">Edit profile</h2>
//             <p className="text-gray-500 dark:text-gray-400 mb-6">
//               Express your idea through exSTAD
//             </p>
//             <div className="space-y-4 relative z-10">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Bio</label>
//                 <input
//                   type="text"
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   placeholder="Write your bio here"
//                   className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Quote</label>
//                 <input
//                   type="text"
//                   value={quote}
//                   onChange={(e) => setQuote(e.target.value)}
//                   placeholder="Write your quote here"
//                   className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
//                 />
//               </div>
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-2 bg-primary text-white rounded-lg"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfilePortfolio;



"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";
import { LiaGraduationCapSolid } from "react-icons/lia";

import transcriptions from "@/data/Transcription.json";
import achievements from "@/data/Achievement.json";
import completedCourses from "@/data/CompletedCourse.json";
import certificate from "@/data/Certificate.json";

import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import { CompletedCourseCard } from "@/components/Card/CompletedCourse";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BorderBeam } from "@/components/magicui/border-beam";
import { RainbowButton } from "@/components/magicui/rainbow-button";

import {
  useGetMeQuery,
  useUpdateMeMutation,
  useGetScholarSocialLinksQuery,
} from "@/components/student/StudentApi";
import { skipToken } from "@reduxjs/toolkit/query";

type SocialLink = {
  uuid: string;
  title: string;
  type: string;
  link: string;
  isActive: boolean;
};

const iconFor = (title: string) => {
  const key = (title || "").toLowerCase();
  if (key.includes("facebook")) return <FaFacebook className="text-blue-600" />;
  if (key.includes("github")) return <FaGithub className="text-gray-900 dark:text-white" />;
  if (key.includes("email") || key.includes("mail")) return <CgMail className="text-red-500" />;
  return <FiArrowUpRight />;
};

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+";

const isHttpUrl = (u?: string) => {
  if (!u) return false;
  try {
    const x = new URL(u);
    return x.protocol === "http:" || x.protocol === "https:";
  } catch {
    return false;
  }
};

const withVersion = (src: string, v: number | string) =>
  `${src}${src.includes("?") ? "&" : "?"}v=${encodeURIComponent(String(v))}`;

export default function ProfilePortfolio() {
  /** 1) Load “me” */
  const { data: me, isLoading, isError, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  /** 2) Social links (for this user) */
  const { data: socialLinks = [] } = useGetScholarSocialLinksQuery(me?.uuid ?? skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  /** 3) Edit modal state (private page) */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [quote, setQuote] = useState("");
  const [nickname, setNickname] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [phoneFamilyNumber, setPhoneFamilyNumber] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");

  /** 4) Update mutation */
  const [updateMe, { isLoading: isSaving }] = useUpdateMeMutation();

  /** 5) Avatar cache busting so changes appear immediately */
  const avatarVersion = useMemo(
    () => (me?.audit?.updatedAt ? new Date(me.audit.updatedAt).getTime() : Date.now()),
    [me?.audit?.updatedAt]
  );
  const avatarSrc = useMemo(() => {
    const raw = isHttpUrl(me?.avatar) ? (me!.avatar as string) : "/avatar-fallback.png";
    return withVersion(raw, avatarVersion);
  }, [me?.avatar, avatarVersion]);

  const [imgSrc, setImgSrc] = useState(avatarSrc);
  useEffect(() => setImgSrc(avatarSrc), [avatarSrc]);

  /** Prefill modal when opened */
  useEffect(() => {
    if (!me) return;
    setBio(me.bio || "");
    setQuote((me as any).quote || "");
    setNickname(me.nickname || "");
    setCurrentAddress(me.currentAddress || "");
    setPhoneFamilyNumber(me.phoneFamilyNumber || "");
    setIsPublic(Boolean(me.isPublic));
    setAvatarUrl(me.avatar || "");
  }, [me, isModalOpen]);

  async function handleSave() {
    try {
      await updateMe({
        bio,
        quote,
        nickname,
        currentAddress,
        phoneFamilyNumber,
        isPublic,
        avatar: avatarUrl || undefined,
      }).unwrap();

      // force new avatar URL + re-fetch fresh “me”
      await refetch();
      setIsModalOpen(false);
    } catch (e) {
      console.error("Failed to update profile:", e);
      // you can plug in your toast here
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-gray-500">Loading profile…</p>
      </div>
    );
  }
  if (isError || !me) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load your profile</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-12 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT: your profile card */}
        <div className="md:col-span-6 lg:col-span-4">
          <div className="sticky top-4 md:top-20 self-start">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 md:p-6 w-full">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4">
                  <Image
                    key={imgSrc}
                    src={imgSrc}
                    alt={me.englishName || me.username}
                    fill
                    className="rounded-full object-cover border-4 border-primary shadow-md"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    onError={() => setImgSrc("/avatar-fallback.png")}
                  />
                </div>

                <div className="text-center mb-4">
                  <h2 className="font-d1 font-bold text-gray-900 dark:text-white text-xl md:text-2xl">
                    {me.englishName || me.username}
                    {me.khmerName ? ` (${me.khmerName})` : ""}
                  </h2>
                  <p className="text-gray-400 dark:text-gray-300">
                    {me.university} • {me.role}
                  </p>

                  {/* Settings (private page) */}
                  <div className="mt-3 flex justify-center">
                    <RainbowButton
                      variant="default"
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2"
                    >
                      Edit Profile
                    </RainbowButton>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="pt-4">
                <h3 className="font-d2 font-semibold mb-2 dark:text-white">About</h3>
                <p className="font-d3 text-gray-600 dark:text-gray-300">
                  {me.bio || "No bio yet."}
                </p>
              </div>

              {/* Social */}
              <div className="pt-4">
                <h3 className="font-d2 font-semibold mb-2 dark:text-white">Social Media</h3>
                <div className="space-y-2.5 dark:text-white">
                  {me.email && (
                    <div className="flex flex-wrap items-center gap-2 break-words">
                      <CgMail className="text-red-500" /> {me.email}
                    </div>
                  )}
                  {(socialLinks as SocialLink[])
                    .filter((s) => s.isActive)
                    .map((s) => {
                      const href = /^https?:\/\//i.test(s.link) ? s.link : `https://${s.link}`;
                      return (
                        <div key={s.uuid} className="flex flex-wrap items-center gap-2 break-words">
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

        {/* RIGHT: other blocks (unchanged layout) */}
        <div className="md:col-span-6 lg:col-span-8 flex flex-col gap-10 md:ml-5">
          {/* Transcription */}
          <div>
            <h3 className="font-h4 sm:text-2xl font-semibold mb-4">Transcription</h3>
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
                        <h4 className="text-base sm:text-lg font-semibold dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-400">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <Link href="/" className="mt-1 sm:mt-0">
                      <FiArrowUpRight className="text-yellow-500 text-xl sm:text-2xl" />
                    </Link>
                  </div>
                ))}
              </div>
            </MotionHighlight>
          </div>

          {/* Certificate gallery (local JSON for now) */}
          <div>
            <h3 className="font-h4 font-semibold mb-4">Certificate</h3>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4 ">
              {certificate.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certificate/${cert.id}`}
                  className="flex-shrink-0 w-72 sm:w-80 md:w-96 relative hover:shadow-lg transition-shadow rounded-xl"
                >
                  <Image
                    src={cert.logo}
                    alt={cert.title}
                    width={384}
                    height={384}
                    className="object-cover rounded-xl"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-h4 font-semibold mb-4">Achievement</h3>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll-bar pb-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-card dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col"
                >
                  <div className="w-full h-40 flex justify-center items-center mb-4">
                    <Image
                      src={ach.logo}
                      alt={ach.title}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">{ach.title}</h4>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-3">{ach.description}</p>
                  <div className="mt-auto flex justify-between text-xs text-gray-500">
                    <span>{ach.date}</span>
                    <span>{ach.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Courses */}
          <div>
            <h3 className="font-h4 font-semibold">Completed Courses</h3>
            <InfiniteMovingCards
              items={completedCourses.map((course) => (
                <CompletedCourseCard key={course.id} course={course} />
              ))}
              direction="left"
              speed="normal"
              pauseOnHover
            />
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

      {/* SETTINGS MODAL (saves to /scholars/me) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-md w-full">
            <BorderBeam size={90} colorFrom="#ffaa40" colorTo="#9c40ff" borderWidth={1.8} duration={6} />
            <h2 className="text-xl font-bold mb-2">Edit profile</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">These changes are visible on your public page.</p>

            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-medium mb-1">Nickname</label>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quote</label>
                <input
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current address</label>
                <input
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Family phone</label>
                <input
                  value={phoneFamilyNumber}
                  onChange={(e) => setPhoneFamilyNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Avatar URL</label>
                <input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://…"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span>Show my profile publicly</span>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-60"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
