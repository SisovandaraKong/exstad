/** @format */
import Image from "next/image";
import { Ripple } from "../magicui/ripple";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { PiGlobeStand } from "react-icons/pi";
import { FeatureCard } from "../whyexSTAD/FeatureCard"; // Assuming you have this component

export function WhyChooseEXSTAD_Card() {
	return (
		<div className='relative'>
			{/* Image Section */}
			<div className='relative h-[500px] w-full flex justify-center gap-6 px-4 sm:px-8 md:px-16 lg:px-32 mb-12'>
				<Ripple />
				<Image
					src='./image/sampleImage/3students.png'
					alt='Learn More'
					width={320}
					height={200}
					className='object-contain max-w-full h-[100%] rounded-xl'
					unoptimized
				/>
			</div>
			{/* Card Section */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* Card L */}
				<div className='w-full py-3 flex flex-col gap-y-2 px-4 sm:px-8 md:px-16 lg:px-32'>
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

				{/* Card R */}
				<div className='w-full py-3 flex flex-col items-end gap-y-2 px-4 sm:px-8 md:px-16 lg:px-32'>
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

// <div className='items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '>
// 				{/* Title and Description Section */}
// 				<div className='text-center space-y-4 mb-16 max-w-3xl mx-auto'>
// 					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight '>
// 						Why Choose exSTAD?
// 					</h2>
// 					<p className='text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300'>
// 						Unlock your true potential and discover a world of opportunities
// 						that align with your skills, interests, and aspirations.
// 					</p>
// 				</div>
// 			</div>
