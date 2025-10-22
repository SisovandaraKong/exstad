/** @format */

"use client";

import { motion } from "framer-motion";
import ScholarshipCard from "@/components/scholarship_mainCard/ScholarshipCard";
import ShortCourseCard from "@/components/shortCourse_mainCard/ShortCourseCard";
import { OfferCard } from "@/components/offering/OfferCard";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BiCurrentLocation } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { PartnersSection } from "@/components/partnership/PartnershipSection";
import SwiperSlideComponent_PopularCourse from "@/components/swiper/swiperSlide";
import SwiperSlideComponent_RecommendedCourse from "@/components/swiper/SwiperSlide_RecommendCourse";
import { Welcoming_Card } from "@/components/welcomeCard/Weloming_Card";
import { Marquee3D } from "@/components/marquee3D/Marquee3D";
import AnimatedSpinner from "@/components/animation/animated_spinning";
import { WhyChooseEXSTAD_Card } from "@/components/whyexSTAD/WhyChooseEXSTAD";
import { WaveBackground } from "@/components/ui/wave-background";

// Import skeleton components
import { LoadingWrapper, EnhancedPageSkeleton } from "@/components/skeleton";

export default function HomeWithSkeleton() {
	return (
		<LoadingWrapper
			loadingDuration={2500} // Show skeleton for 2.5 seconds
			className='min-h-screen'>
			<motion.div
				className='min-h-screen flex flex-col bg-background'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<main className='min-h-screen w-full mx-auto overflow-x-hidden'>
					<motion.div
						className='flex flex-col lg:flex-row w-full py-10 px-2 sm:px-4 md:px-8 lg:px-32 mx-auto max-w-full'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						{/* Hero Section */}
						<motion.div
							className='w-full lg:w-1/2 max-w-full mx-auto min-h-[120px] sm:min-h-[180px] flex flex-col items-center justify-center mb-4 relative overflow-hidden'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}>
							<motion.h1
								className='absolute inset-0 flex items-center justify-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-center px-4 sm:px-2 z-20 overflow-hidden'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}>
								Quality education is a key to your future success
							</motion.h1>
							<motion.div
								className='w-full flex items-center justify-center relative z-10'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.8 }}>
								<AnimatedSpinner />
							</motion.div>
						</motion.div>

						{/* Marquee Section */}
						<motion.div
							className='w-full lg:w-1/2 flex items-center justify-center mx-auto'
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}>
							<Marquee3D />
						</motion.div>
					</motion.div>

					{/* Rest of your page content... */}
					{/* You would continue with all the sections from your original page.tsx */}
				</main>
			</motion.div>
		</LoadingWrapper>
	);
}

// Example of using individual skeleton components for specific sections
export function SectionWithSkeleton({
	children,
	isLoading = false,
}: {
	children: React.ReactNode;
	isLoading?: boolean;
}) {
	if (isLoading) {
		return <EnhancedPageSkeleton />;
	}

	return <>{children}</>;
}
