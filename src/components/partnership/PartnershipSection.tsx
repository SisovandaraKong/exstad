/** @format */

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

// Categorized partners for better organization
const partnerCategories = {
	government: [
		{
			name: "Ministry of Education, Youth and Sport",
			logo: "https://www.foodi-project.eu/wp-content/uploads/2019/01/P9.png",
			category: "Government",
		},
		{
			name: "Ministry of Post and Telecommunications of Cambodia",
			logo: "https://www.trc.gov.kh/_astro/MPTC.CJZrFdlr_Z1xXAUI.webp",
			category: "Government",
		},
	],
	education: [
		{
			name: "ISTAD",
			logo: "https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a",
			category: "Education",
		},
		{
			name: "Chungbuk National University",
			logo: "https://nturanking.csti.tw/static/NTURankingData/img/UnivImage/KRU000023.png",
			category: "Education",
		},
	],
	banking: [
		{
			name: "ACLEDA Bank",
			logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7I2cke0hUAEafJhGKmrMCymfxU_vOT4GKG0UysGYWHVfoxzZ4QYARYh2jeQ_e5CyFjOw&usqp=CAU",
			category: "Banking",
		},
		{
			name: "ABA Bank",
			logo: "https://play-lh.googleusercontent.com/WU6sZMD1UspzwqYnlACtmN60rckp8hoINSgsR21mKLJBbsHPwXtzwvOocpjC7FcO1g",
			category: "Banking",
		},
		{
			name: "APD Bank",
			logo: "https://cdn.prod.website-files.com/66a88ddcf31fb0b71b89d1fd/66d90c5a1ac7788d194ac247_64954108a868226f441e01f1_Frame%2048099033.png",
			category: "Banking",
		},
		{
			name: "Wing Bank",
			logo: "https://play-lh.googleusercontent.com/-deHHbwBUh2I4dzTjq9n4ggBGPqJwKzj9pwvPqyaR-hPxzKN9QVJOBsZP_ShlCDmX60",
			category: "Banking",
		},
		{
			name: "Woori Bank",
			logo: "https://play-lh.googleusercontent.com/9EjpLk2v3rb1QThCBb8Ep03I7U9aVByTzrc_G77JtKd4O98uA-H4t-c-Ep9sgB1_5g",
			category: "Banking",
		},
		{
			name: "KB Prasac Bank",
			logo: "https://play-lh.googleusercontent.com/rbNyQIKGPrK5nNmJHdkwKG0uZ9rk4qDMJ52JPLV32ui38hysDrUJl2wJhqyIxUAgOu6_",
			category: "Banking",
		},
		{
			name: "Hattha Bank",
			logo: "https://eu-images.contentstack.com/v3/assets/blt7dacf616844cf077/blt25a971650c2ea2ee/67996d0f3b81de5614a817a4/Logo-on-blue-background.jpg?width=1280&auto=webp&quality=80&format=jpg&disable=upscale",
			category: "Banking",
		},
		{
			name: "MayBank",
			logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nNOyLeCnSbIBbNDFQ9MTozu-HAJaWEuG_g&s",
			category: "Banking",
		},
		{
			name: "J Trust Bank",
			logo: "https://webassets.jtrustroyal.com/about-us/JTRUST_Logo.jpg",
			category: "Banking",
		},
		{
			name: "FTB Bank",
			logo: "https://play-lh.googleusercontent.com/dBXpI2QOfWndhjQKboqdt6sOdSeeGk_pxeXqVC8hHD-xCDQIKoD_MLHhVH51gb25F1rY",
			category: "Banking",
		},
	],
	technology: [
		{
			name: "Smart",
			logo: "https://cdn.bitrefill.com/primg/w360h216/smart-cambodia.webp",
			category: "Technology",
		},
		{
			name: "Bankong Open API",
			logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwG-Zx92YNnU6BuabALnRRwBqX_5USd3AJJw&s",
			category: "Technology",
		},
	],
};

// Flatten all partners for the scrolling animation
const allPartners = [
	...partnerCategories.government,
	...partnerCategories.education,
	...partnerCategories.banking,
	...partnerCategories.technology,
];

// Animation variants
// const containerVariants = {
// 	hidden: { opacity: 0 },
// 	visible: {
// 		opacity: 1,
// 		transition: {
// 			staggerChildren: 0.1,
// 			delayChildren: 0.2,
// 		},
// 	},
// };

// const itemVariants = {
// 	hidden: { opacity: 0, y: 20, scale: 0.8 },
// 	visible: { opacity: 1, y: 0, scale: 1 },
// };

// Remove the PartnerCard component since we're only using scroll view

export function PartnersSection() {
	const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
		{}
	);

	const handleImageError = (index: number) => {
		setImageErrors((prev) => ({ ...prev, [index]: true }));
	};

	return (
		<section className='relative py-12 sm:py-16 md:py-20 lg:py-24 bg-background'>
			{/* Background decoration */}
			<div className='absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50 bg-[size:60px_60px] opacity-20' />
			<div className='absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent' />

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<motion.div
					className='text-center mb-12 sm:mb-16'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: true }}>
					<motion.h2
						className='text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}>
						Our Value Partners
					</motion.h2>

					<motion.p
						className='text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}>
						We collaborate with valued partners from various sectors across
						Cambodia and abroad.
					</motion.p>
				</motion.div>

				{/* Scroll View Only */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='relative'>
					<div className='overflow-hidden items-center py-4'>
						<div className='flex animate-scroll mb-8 sm:mb-12'>
							{/* Duplicate partners for seamless loop */}
							{[...allPartners, ...allPartners].map((partner, index) => (
								<div key={index} className='flex-shrink-0 mx-4'>
									<motion.div
										className='group relative cursor-pointer'
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.3 }}>
										{/* Glow effect */}
										<div className='absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-500' />

										{/* Circular logo container */}
										<div className='relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg border-2 border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:border-primary/30 group-hover:border-primary/50'>
											{/* Logo content with higher z-index initially */}
											<div className='relative z-10 w-full h-full group-hover:z-0 transition-all duration-300'>
												{!imageErrors[index] ? (
													<div className='w-full h-full p-2 flex items-center justify-center'>
														<div className='w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-600/50 flex items-center justify-center'>
															<Image
																src={partner.logo || "/placeholder.svg"}
																alt={partner.name}
																width={80}
																height={80}
																className='w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110 rounded-full'
																unoptimized
																onError={() => handleImageError(index)}
															/>
														</div>
													</div>
												) : (
													<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600'>
														<div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center'>
															<span className='text-primary font-bold text-sm sm:text-base'>
																{partner.name.charAt(0)}
															</span>
														</div>
													</div>
												)}
											</div>

											{/* Hover overlay with partner info */}
											<div className='absolute inset-0 bg-primary/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 group-hover:z-20 transition-all duration-300 flex items-center justify-center'>
												<div className='text-center text-white p-2'>
													<div className='text-xs sm:text-sm font-bold leading-tight line-clamp-2'>
														{partner.name}
													</div>
													<div className='text-xs opacity-80 mt-1'>
														{partner.category}
													</div>
												</div>
											</div>
										</div>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Statistics */}
				<motion.div
					className='mt-16 sm:mt-20 text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8'>
						{[
							{ number: "16+", label: "Partner Organizations" },
							{ number: "4", label: "Industry Sectors" },
							{ number: "10+", label: "Banking Partners" },
							{ number: "100%", label: "Trusted Network" },
						].map((stat, index) => (
							<motion.div
								key={index}
								className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/30 dark:border-gray-700/30'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -2, scale: 1.02 }}>
								<div className='text-2xl sm:text-3xl font-bold text-primary mb-1'>
									{stat.number}
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-300 font-medium'>
									{stat.label}
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
