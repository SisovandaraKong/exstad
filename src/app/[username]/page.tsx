import { ProfileSection } from "@/components/student/ProfileSection";
import ProfilePortfolio from "@/components/student/ProfilePortfolio";

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
