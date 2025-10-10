// "use client";

// import React from "react";
// import { ProfileSection } from "@/components/student/ProfileSection";
// import ProfilePortfolioSetting from "@/components/student/ProfilePortfolioSetting";

// export default function SettingPage({ params }: { params: Promise<{ username: string }> }) {
//   // ✅ unwrap the params promise
//   const { username } = React.use(params);

//   return (
//     <div className="flex flex-col gap-16">
//       {/* 🔹 Top section */}
//       <ProfileSection username={username} />

//       {/* 🔹 Editable portfolio section */}
//       <div className="-mt-10 md:-mt-16">
//         <ProfilePortfolioSetting username={username} />
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useRef } from "react";
import { use as unwrap } from "react"; // alias to avoid TS friction
import { ProfileSection } from "@/components/student/ProfileSection";
import ProfilePortfolioSetting from "@/components/student/ProfilePortfolioSetting";
import SharedScrollAvatar from "@/components/student/SharedScrollAvatar";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+";

export default function SettingPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // ✅ unwrap the params promise (don’t use params.username directly)
  const { username } = unwrap(params);

  // two anchors for the single traveling avatar
  const topAnchor = useRef<HTMLDivElement>(null);
  const bottomAnchor = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* one photo that docks in the hero, then travels to the portfolio card */}
      <SharedScrollAvatar
        username={username}
        topAnchor={topAnchor}
        bottomAnchor={bottomAnchor}
        topSize={350}
        bottomSize={192}
        blurDataURL={BLUR}
      />

      <div className="flex flex-col gap-16">
        {/* Top section exposes the TOP anchor */}
        <ProfileSection username={username} avatarAnchorRef={topAnchor} />

        {/* Editable portfolio exposes the BOTTOM anchor */}
        <div className="-mt-10 md:-mt-16">
          <ProfilePortfolioSetting
            username={username}
            avatarAnchorRef={bottomAnchor}
          />
        </div>
      </div>
    </div>
  );
}
