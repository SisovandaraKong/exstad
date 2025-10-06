// "use client";

// import React from "react";
// import Image from "next/image";
// import { SparklesText } from "@/components/magicui/sparkles-text";
// import profileData from "@/data/profileData.json"; // <-- import JSON
// import FreelancerProfileCard from "@/components/student/ProfilePortfolio";

// function ProfileSection() {
//   return (
//     // --- Profile Section ---
//     <section
//       id="profile-section"
//       className="relative min-h-dvh flex items-center justify-center px-6 py-12 overflow-hidden mx[120px]"
//     >
//       {/* background blur effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/30 rounded-full blur-xl"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/25 to-primary/20 rounded-full blur-lg"></div>
//         <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/25 rounded-full blur-2xl"></div>
//         <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-accent/20 to-primary/15 rounded-full blur-xl"></div>
//       </div>

//       <div className="relative  max-w-6xl mx-auto">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
//           {/* Profile Image */}
//           <div className="relative">
//             <div className="w-100 h-100 lg:w-[420.52px] lg:h-[434.2px] relative">
//               <div className="absolute inset-0 bg-gradient-to-br bg-background rounded-full blur-md"></div>
//               <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl  shimmer-border">
//                 <Image
//                   src={profileData.imageUrl}
//                   alt={profileData.name}
//                   fill
//                   className="absolute inset-0 w-full h-full object-cover"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Profile Info */}
//           <div className="flex-1 text-center lg:text-left space-y-6">
//             <div className="space-y-2">
//               <h1
//                 className="text-5xl lg:text-6xl font-bold text-primary"
//                 style={{ fontFamily: "var(--font-heading)" }}
//               >
//                 <SparklesText>{profileData.name}</SparklesText>
//               </h1>
//               <h2
//                 className="text-xl lg:text-2xl text-card-foreground font-medium"
//                 style={{ fontFamily: "var(--font-heading)" }}
//               >
//                 {profileData.title}
//               </h2>
//             </div>

//             <p
//               className="text-lg text-foreground leading-relaxed max-w-2xl"
//               style={{ fontFamily: "var(--font-body)" }}
//             >
//               {profileData.bio}
//             </p>

//             <div className="relative">
//               <div className="text-6xl text-accent/20 absolute -top-4 -left-2">
//                 "
//               </div>
//               <blockquote
//                 className="text-2xl lg:text-3xl font-medium text-accent italic pl-8"
//                 style={{ fontFamily: "var(--font-heading)" }}
//               >
//                 {profileData.quote}
//               </blockquote>
//               <div className="text-6xl text-accent/20 absolute -bottom-8 right-0">
//                 "
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//        <div className="flex justify-center p-10">
//       <FreelancerProfileCard />
//     </div>
//     </section>

//   );
// }

// export default ProfileSection;

import { ProfileSection } from "@/components/student/ProfileSection";
import ProfilePortfolio from "@/components/student/ProfilePortfolioSetting";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Profile Section */}
      <ProfileSection username={params.username} />

      {/* Portfolio (certificates, achievements, courses) */}
     <div className="-mt-10 md:-mt-16">
        <ProfilePortfolio username={params.username} />
      </div>
    </div>
  );
}
