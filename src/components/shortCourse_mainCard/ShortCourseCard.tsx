/** @format */

import Image from "next/image";
import { Button } from "../ui/button";

type MainCardProps = {
	id: string;
	title: string;
	description: string;
	cardBackground?: string;
	imageSrc?: string;
};

export default function ShortCourse_mc({
	id,
	title,
	description,
	cardBackground,
	imageSrc = "./image/sampleImage/image 23.png",
}: MainCardProps) {
	const isWhiteCard = id === "2";
	return (
		<div className='rounded-3xl flex items-center justify-center'>
			<div
				className={`${
					isWhiteCard ? "bg-white" : "bg-gray-900"
				} rounded-3xl  flex flex-col h-[500px] relative shadow-sm overflow-hidden`}
				style={{
					backgroundImage:
						cardBackground && !isWhiteCard
							? `url(${cardBackground})`
							: undefined,
					backgroundSize: "cover",
				}}>
				{/* Content Part */}
				<div className='flex-1 flex flex-col justify-center px-6 pt-6 sm:pt-12'>
					<h2
						className={`${
							isWhiteCard ? "text-black" : "text-white"
						} text-xl sm:text-2xl font-semibold mb-2`}>
						{title}
					</h2>
					<p
						className={`${
							isWhiteCard ? "text-black" : "text-gray-300"
						} text-base sm:text-[16px] mb-6 leading-relaxed`}>
						{description}
					</p>
					<Button className='bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium w-fit'>
						Up Your Skill
					</Button>
				</div>
				{/* Image Part */}
				<div className='w-full flex justify-end items-end'>
					<Image unoptimized width={500} height={500}
						src={imageSrc}
						alt='Student with backpack holding books'
						className='w-[60%] max-w-[220px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[460px] h-auto rounded-br-3xl object-contain'
						style={{ objectPosition: "bottom right" }}
					/>
				</div>
			</div>
		</div>
	);
}
