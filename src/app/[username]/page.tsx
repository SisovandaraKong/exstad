// import { ProfileSection } from "@/components/student/ProfileSection";
// import ProfilePortfolio from "@/components/student/ProfilePortfolio";

// export default function Page({ params }: { params: { username: string } }) {
//   return (
//     <div className="flex flex-col gap-16">
//       {/* Hero Profile Section */}
//       <ProfileSection username={params.username} />

//       {/* Portfolio (certificates, achievements, courses) */}
//      <div className="-mt-10 md:-mt-16">
//         <ProfilePortfolio username={params.username} />
//       </div>
//     </div>
//   );
// }
// src/app/[username]/page.tsx
// src/app/[username]/page.tsx
"use client";
import React, { useRef } from "react";
import { ProfileSection } from "@/components/student/ProfileSection";
import ProfilePortfolio from "@/components/student/ProfilePortfolio";
import SharedScrollAvatar from "@/components/student/SharedScrollAvatar";

export default function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = React.use(params); // ✅ unwrap params in Next 15+

  const topAnchor = useRef<HTMLDivElement>(null);
  const bottomAnchor = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* ✅ the ONLY image on the page */}
      <SharedScrollAvatar
        username={username}
        topAnchor={topAnchor}
        bottomAnchor={bottomAnchor}
        topSize={350}
        bottomSize={192}
        viewportOffsetTop={72}     // height of your fixed navbar
      />

      <div className="flex flex-col gap-16">
        <ProfileSection username={username} avatarAnchorRef={topAnchor} />
        <div className="-mt-10 md:-mt-16">
          <ProfilePortfolio username={username} avatarAnchorRef={bottomAnchor} />
        </div>
      </div>
    </div>
  );
}
