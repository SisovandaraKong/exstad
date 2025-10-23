/** @format */

import Image from "next/image";
import Link from "next/link";

export function Welcoming_Card() {
	return (
		<div className='bg-whitesmoke mx-auto max-w-full px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 md:pt-8 lg:pt-10 rounded-3xl flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-center'>
			{/* Left/Top: Text Section */}
			<div className='py-4 sm:py-6 md:py-8 flex-1'>
				<h2 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-color mb-4'>
					Welcome to exSTAD
				</h2>
				<p className='text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent my-4 leading-relaxed'>
					exSTAD is an experimental technology learning space for Cambodian
					students, especially those who want to explore ISTAD&apos;s scholarship
					program, products, and achievements in a unified digital platform.
				</p>
				<Link
					href='/explore-course'
					className='inline-block bg-primary hover:bg-primary-hover text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium w-fit mt-4 transition-colors duration-200 no-underline'>
					Up Your Skill
				</Link>
			</div>
			{/* Right/Bottom: Image Section */}
			<div className='flex items-center justify-center md:justify-end flex-shrink-0 w-full md:w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
				<Image
					src='./image/sampleImage/3students.png'
					alt='Learn More'
					width={700}
					height={700}
					className='object-contain w-full h-auto rounded-xl max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]'
					unoptimized
				/>
			</div>
		</div>
	);
}
