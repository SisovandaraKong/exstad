/** @format */
import Image from "next/image";
import { FeatureCard } from "./FeatureCard";
import istadImage from "../../../public/image/istad-icon.png";

export function WhyChooseISTAD_Card() {
	return (
		<div className='h-full relative'>
			{/* Grid Background - Same as Hero Section */}
			<div className='absolute inset-0 opacity-[0.15] dark:opacity-[0.20]'>
				<div
					className='w-full h-full'
					style={{
						backgroundImage: `
							linear-gradient(rgb(75, 85, 99, 0.6) 1px, transparent 1px),
							linear-gradient(90deg, rgb(75, 85, 99, 0.6) 1px, transparent 1px)
						`,
						backgroundSize: "40px 40px",
						maskImage: `
							radial-gradient(ellipse 80% 60% at 50% 50%, 
								rgba(0, 0, 0, 1) 20%, 
								rgba(0, 0, 0, 0.8) 40%, 
								rgba(0, 0, 0, 0.4) 70%, 
								rgba(0, 0, 0, 0) 100%)
						`,
						WebkitMaskImage: `
							radial-gradient(ellipse 80% 60% at 50% 50%, 
								rgba(0, 0, 0, 1) 20%, 
								rgba(0, 0, 0, 0.8) 40%, 
								rgba(0, 0, 0, 0.4) 70%, 
								rgba(0, 0, 0, 0) 100%)
						`,
					}}
				/>
			</div>
			<div className='relative z-10 text-center space-y-4 pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-0 lg:px-0 xl:px-32'>
				<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary'>
					Why Choose ISTAD?{" "}
				</h2>
				<p className='text-base sm:text-lg md:text-[18px] leading-7 sm:leading-8 text-gray-600 dark:text-gray-300'>
					Unlock your true potential and discover a world of opportunities that
					align with your skills, interests, and aspirations
				</p>
			</div>

			{/* Main Layout Container */}
			<div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-8 md:px-0 lg:px-0 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20'>
				{/* ISTAD Image Overlay - Centered in front of cards (Hidden on mobile) */}
				<div className='absolute inset-0 z-30 hidden md:flex items-center justify-center pointer-events-none'>
					<Image
						src={istadImage}
						alt='ISTAD Logo'
						width={200}
						height={200}
						className='object-contain drop-shadow-2xl bg-white/80 dark:bg-gray-800/80 rounded-full p-1'
						unoptimized
					/>
				</div>
				<FeatureCard
					icon='🔬'
					title='Advanced Science and Technology'
					description='ISTAD guides students toward modern science, technology, and digital skill development.'
				/>
				<FeatureCard
					icon='💼'
					title='Strong Career Opportunities'
					description='Graduates are guaranteed excellent job placements with top IT companies.'
				/>
				<FeatureCard
					icon='🎓'
					title='High-Quality Training'
					description='The institute provides up-to-date teaching methods and learning roadmaps.'
				/>
				<FeatureCard
					icon='🚀'
					title='Best Choice for IT Aspirants'
					description="It's the ideal place for those who want to become IT experts in Cambodia."
				/>
			</div>
		</div>
	);
}
