/** @format */

// components/FeatureCard.tsx
import { ReactNode } from "react";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<div className='flex flex-col items-center bg-white rounded-xl shadow-lg p-2 text-center h-wrapper max-w-[280px] w-full border border-gray-100 dark:bg-gray-800 dark:border-gray-700'>
			<div className='text-4xl pt-3  text-blue-600'>{icon}</div>{" "}
			<span className='font-bold text-[20px] p-3  text-gray-900 dark:text-white'>
				{title}
			</span>{" "}
			<p className='text-[12px] pb-3 px-3 text-gray-600 dark:text-gray-300'>
				{description}
			</p>
		</div>
	);
}
