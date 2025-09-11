/** @format */

import Image from "next/image";
import { Button } from "../ui/button";

export function Welcoming_Card() {
	return (
		<div className='bg-whitesmoke mx-auto max-w-auto px-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10 sm:px-6 lg:px-8 rounded-3xl flex flex-col md:flex-row gap-6 md:gap-12 '>
			{/* Left/Top: Text Section */}
			<div className='py-4 sm:py-6 md:py-8'>
				<span className='font-bold text-2xl sm:text-3xl md:text-4xl text-text-color'>
					Welcome to exSTAD
				</span>
				<p className='text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent my-4'>
					A tech hub for Cambodian students to explore ISTAD’s scholarships,
					products, and achievements.
				</p>
				<Button
					onClick={() => {
						window.open("_blank");
					}}
					className='bg-primary hover:bg-primary-hover text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium w-fit mt-2'>
					Up Your Skill
				</Button>
			</div>
			{/* Right/Bottom: Image Section */}
			<div className=' flex items-end justify-end'>
				<Image
					src='./image/sampleImage/3students.png'
					alt='Learn More'
					width={700}
					height={700}
					className='object-contain max-w-full h-auto rounded-xl'
					unoptimized
				/>
			</div>
		</div>
	);
}
