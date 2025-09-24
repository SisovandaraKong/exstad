/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";
import { FaFacebook, FaGithub, FaTelegram } from "react-icons/fa";

// Team member data
const member = {
	sreyphea: {
		name: "Sreyphea",
		role: "CEO & Founder",
		image: "/image/sampleImage/3students.png",
		social: {
			facebook: "https://facebook.com/sreyphea",
			github: "https://github.com/sreyphea",
			telegram: "https://t.me/sreyphea",
		},
	},
	johndoe: {
		name: "John Doe",
		role: "CTO",
		image: "/image/sampleImage/graduate-cap.png",
		social: {
			facebook: "https://facebook.com/johndoe",
			github: "https://github.com/johndoe",
			telegram: "https://t.me/johndoe",
		},
	},
	sophea: {
		name: "Sophea",
		role: "Head of Education",
		image: "/image/sampleImage/image 23.png",
		social: {
			facebook: "https://facebook.com/sophea",
			github: "https://github.com/sophea",
			telegram: "https://t.me/sophea",
		},
	},
	ann: {
		name: "Ann",
		role: "Marketing Specialist",
		image: "/image/sampleImage/image 24.png",
		social: {
			facebook: "https://facebook.com/ann",
			github: "https://github.com/ann",
			telegram: "https://t.me/ann",
		},
	},
};

// Main About Us page component
export default function AboutUsPage() {
	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-32'>
				<div className='max-w-7xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6'>
							About{" "}
							<span className='text-blue-600 dark:text-blue-400'>exSTAD</span>
						</h1>
						<p className='text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-4xl mx-auto'>
							Empowering students through innovative education and
							transformative learning experiences
						</p>
					</motion.div>
				</div>
			</section>

			{/* Mission Section */}
			<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}>
							<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6'>
								Our Mission
							</h2>
							<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6'>
								At exSTAD, we believe that education is the foundation of
								personal and societal growth. Our mission is to provide
								accessible, high-quality educational programs that prepare
								students for success in an ever-evolving world.
							</p>
							<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300'>
								Through innovative teaching methods, comprehensive curricula,
								and dedicated support, we strive to unlock each student's
								potential and foster lifelong learning.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='relative'>
							<CometCard className='h-full'>
								<div className='bg-white dark:bg-gray-800 p-8 rounded-2xl'>
									<div className='relative w-full h-64 sm:h-80 mb-6'>
										<Image
											src='/image/sampleImage/sample-image.png'
											alt='Students learning'
											fill
											className='rounded-lg object-cover'
											unoptimized
										/>
									</div>
									<h3 className='text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
										Excellence in Education
									</h3>
									<p className='text-base leading-relaxed text-gray-600 dark:text-gray-300'>
										Committed to delivering world-class educational experiences
										that transform lives and communities.
									</p>
								</div>
							</CometCard>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-white dark:bg-gray-800'>
				<div className='max-w-7xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4'>
							Our Core Values
						</h2>
						<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
							The principles that guide everything we do
						</p>
					</motion.div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
						{[
							{
								title: "Innovation",
								description:
									"Embracing cutting-edge technology and modern teaching methodologies to enhance learning outcomes.",
							},
							{
								title: "Accessibility",
								description:
									"Making quality education available to all students, regardless of their background or circumstances.",
							},
							{
								title: "Excellence",
								description:
									"Maintaining the highest standards in curriculum design, instruction, and student support services.",
							},
						].map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}>
								<CometCard className='h-full'>
									<div className='bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 h-full rounded-2xl text-center'>
										<h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
											{value.title}
										</h3>
										<p className='text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300'>
											{value.description}
										</p>
									</div>
								</CometCard>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32 relative'>
				{/* Grid Background */}
				<div className='absolute inset-0 opacity-[0.08] dark:opacity-[0.12]'>
					<div
						className='w-full h-full'
						style={{
							backgroundImage: `
								linear-gradient(rgb(107, 114, 128, 0.3) 1px, transparent 1px),
								linear-gradient(90deg, rgb(107, 114, 128, 0.3) 1px, transparent 1px)
							`,
							backgroundSize: "40px 40px",
						}}
					/>
				</div>

				<div className='max-w-7xl mx-auto relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4'>
							Meet Our Team
						</h2>
						<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
							Dedicated professionals committed to your educational journey
						</p>
					</motion.div>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
						{Object.values(member).map((memberObj, idx) => (
							<motion.div
								key={memberObj.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.1 }}
								viewport={{ once: true }}>
								<CometCard className='h-full'>
									<div className='bg-card rounded-2xl h-full'>
										<div className='p-3'>
											<div className='relative w-full h-56 sm:h-64 md:h-72 aspect-[3/5] overflow-hidden rounded-lg'>
												<Image
													src={memberObj.image}
													alt={`Team Member ${memberObj.name}`}
													fill
													className='object-cover transition-transform duration-300 ease-in-out hover:scale-110'
													unoptimized
												/>
											</div>
										</div>
										<div className='p-4 sm:p-6 text-center'>
											<h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white'>
												{memberObj.name}
											</h3>
											<p className='text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3'>
												{memberObj.role}
											</p>
											<div className='flex justify-center space-x-4 mb-4'>
												<a
													href={memberObj.social.facebook}
													target='_blank'
													rel='noopener noreferrer'
													className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200'
													aria-label={`${memberObj.name} Facebook`}>
													<FaFacebook size={20} />
												</a>
												<a
													href={memberObj.social.github}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200'
													aria-label={`${memberObj.name} GitHub`}>
													<FaGithub size={20} />
												</a>
												<a
													href={memberObj.social.telegram}
													target='_blank'
													rel='noopener noreferrer'
													className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200'
													aria-label={`${memberObj.name} Telegram`}>
													<FaTelegram size={20} />
												</a>
											</div>
										</div>
									</div>
								</CometCard>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-blue-600 dark:bg-blue-700'>
				<div className='max-w-7xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6'>
							Ready to Start Your Journey?
						</h2>
						<p className='text-base sm:text-lg leading-relaxed text-blue-100 max-w-3xl mx-auto mb-8'>
							Join thousands of students who have transformed their lives
							through our programs
						</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors duration-200'>
							Get Started Today
						</motion.button>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
