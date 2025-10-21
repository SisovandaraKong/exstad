/** @format */
import Image from "next/image";
import { Ripple } from "../magicui/ripple";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { PiGlobeStand } from "react-icons/pi";
import { FeatureCard } from "../whyexSTAD/FeatureCard"; // Assuming you have this component

export function WhyChooseEXSTAD_Card() {
	return (
		<div className='h-full relative'>
			{/* Ripple as section background - moved down */}
			<div className='absolute inset-0 top-1/3'>
				<Ripple />
			</div>
			<div className='relative z-10 text-center space-y-4 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32'>
				<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary'>
					Why Choose exSTAD?{" "}
				</h2>
				<p className='text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300'>
					Unlock your true potential and discover a world of opportunities that
					align with your skills, interests, and aspirations
				</p>
			</div>

			{/* Main Layout Container */}
			<div className='relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-12 md:py-16 lg:py-20'>
				{/* Card L - Left Side */}
				<div className='flex flex-col items-center md:items-end gap-y-3 sm:gap-y-4 w-full md:w-1/3'>
					<FeatureCard
						icon={<LuLaptopMinimalCheck className='text-2xl' />}
						title='Quality Education'
						description='We provide high-quality education that meets international standards.'
					/>
					<FeatureCard
						icon={<PiGlobeStand className='text-2xl' />}
						title='Global Opportunities'
						description='Our programs open doors to global career opportunities.'
					/>
				</div>

				{/* Image Section - Center */}
				<div className='flex justify-center w-full md:w-1/3 order-first md:order-none'>
					<Image
						src='./istad-image/istad-icon.png'
						alt='Learn More'
						width={320}
						height={400}
						className='object-contain max-w-full h-auto rounded-xl'
						unoptimized
					/>
				</div>

				{/* Card R - Right Side */}
				<div className='flex flex-col items-center md:items-start gap-y-3 sm:gap-y-4 w-full md:w-1/3'>
					<FeatureCard
						icon={<LuLaptopMinimalCheck className='text-2xl' />}
						title='Quality Education'
						description=''
					/>
					<FeatureCard
						icon={<PiGlobeStand className='text-2xl' />}
						title='Global Opportunities'
						description='Our programs open doors to global career opportunities.'
					/>
				</div>
			</div>
		</div>
	);
}
