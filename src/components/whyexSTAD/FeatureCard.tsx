/** @format */
"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<motion.div
			className='flex flex-col items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl p-2 sm:p-3 md:p-4 lg:p-6 text-center w-full border border-gray-200 dark:border-gray-600 transition-all duration-300'
			whileHover={{
				y: -4,
				scale: 1.02,
				boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
			}}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}>
			<motion.div
				className='mb-2 sm:mb-3 md:mb-4 p-1 sm:p-2 md:p-3 lg:p-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 shadow-inner'
				whileHover={{ scale: 1.1, rotate: 5 }}
				transition={{ duration: 0.2 }}>
				{icon}
			</motion.div>
			<motion.h3
				className='font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2 md:mb-3 text-gray-900 dark:text-white'
				initial={{ opacity: 0.8 }}
				whileHover={{ opacity: 1 }}>
				{title}
			</motion.h3>
			<motion.p
				className='text-base sm:text-lg md:text-[18px] text-gray-600 dark:text-gray-300 mx-auto leading-7 sm:leading-8'
				initial={{ opacity: 0.7 }}
				whileHover={{ opacity: 1 }}>
				{description}
			</motion.p>
		</motion.div>
	);
}
