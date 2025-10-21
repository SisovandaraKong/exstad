/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";
import {
	FaFacebook,
	FaGithub,
	FaHandPointRight,
	FaStarOfLife,
	FaTelegram,
} from "react-icons/fa";
import MentorCard from "@/components/ui/mentorCard";
import { BackgroundBeams } from "@/components/ui/background-beam";
import { teamData } from "@/data/teamMembers";
import { HiChip } from "react-icons/hi";
import { StarburstIcon } from "@/components/ui/starburst-ui";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import ContactForm from "@/components/contact/ContactForm";

export default function AboutUsPage() {
	const router = useRouter();

	// Extract mentor and member data from imported teamData
	const mentor = teamData.mentors;
	const member = teamData.members;
	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-32 overflow-hidden'>
				<BackgroundBeams />
				<div className='max-w-7xl mx-auto relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center'>
						{/* Title with Gradient Text */}
						<AnimatedGradientText
							speed={1}
							colorFrom='#7777ff'
							colorTo='#ff0000'
							className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide hover:scale-105 transition-transform duration-300 uppercase'>
							Welcome to EXSTAD
						</AnimatedGradientText>
						{/* Text with Side Lines */}
						<div className='flex items-center justify-center gap-2 sm:gap-4 mt-6 mb-4 px-4'>
							<div className='flex-1 h-px bg-gradient-to-r from-transparent via-[#7777ff] to-[#ff0000] max-w-24 sm:max-w-32 md:max-w-48'></div>
							<span className='text-sm sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed bg-gradient-to-r from-[#7777ff] to-[#ff0000] bg-clip-text text-transparent text-center px-2'>
								Your gateway to innovative education
							</span>
							<div className='flex-1 h-px bg-gradient-to-r from-[#ff0000] via-[#7777ff] to-transparent max-w-24 sm:max-w-32 md:max-w-48'></div>
						</div>
						{/* Display the icon at different sizes */}
						<div className='flex justify-center items-center my-6'>
							<StarburstIcon
								size={40}
								className='sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'
							/>
						</div>
						<p className='text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4'>
							<span className='font-bold bg-gradient-to-r from-[#7777ff] to-[#ff0000] bg-clip-text text-transparent'>
								exSTAD
							</span>{" "}
							is an experimental technology learning space for Cambodian
							students, especially those who want to explore ISTAD&apos;s
							scholarship program, products, and achievements in a unified
							digital platform.
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
							<h1 className=' text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900 dark:text-white mb-6'>
								OUR MISSION
							</h1>
							<h3 className='text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4'>
								Our exSTAD is committed to:
							</h3>
							<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 flex items-center gap-3'>
								<FaHandPointRight className='text-primary flex-shrink-0' />
								Provide the latest methodology with high-quality training and
								mentoring
							</p>
							<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 flex items-center gap-3'>
								<FaHandPointRight className='text-primary flex-shrink-0' />
								Build up the capacity and career of IT experts in Cambodia
							</p>
							<p className='text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 flex items-center gap-3'>
								<FaHandPointRight className='text-primary flex-shrink-0' />
								Consult and connect ISTAD trainees to top IT careers
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='relative flex justify-center'>
							<div className='relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
								<Image
									src='/istad-image/istad-icon.PNG'
									alt='ISTAD Logo'
									fill
									className='object-cover'
									unoptimized
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* <section>
				<Card />
			</section> */}

			{/* Vision Section */}
			<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-[0.03] dark:opacity-[0.08]'>
					<div
						className='w-full h-full'
						style={{
							backgroundImage: `
								radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
								radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)
							`,
						}}
					/>
				</div>

				<div className='max-w-7xl mx-auto relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center mb-16'>
						{/* Logo and Title with Gradient Line */}
						<div className='flex items-center justify-center gap-4 sm:gap-6 mb-6'>
							{/* exSTAD Logo */}
							<div className='relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20'>
								<Image
									src='/image/logo/exSTAD-01.png'
									alt='exSTAD Logo'
									fill
									className='rounded-lg object-cover'
									unoptimized
								/>
							</div>

							{/* Gradient Line */}
							<div className='w-0.5 h-8 sm:h-12 md:h-15 bg-gradient-to-b from-[#7777ff] to-[#ff0000] rounded-full'></div>

							{/* Our Vision Title */}
							<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide text-gray-900 dark:text-white'>
								VISION
							</h2>
						</div>
					</motion.div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center'>
						{/* Vision Content */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='space-y-8'>
							<div className='relative'>
								<div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-700 to-red-600 rounded-full'></div>
								<div className='pl-8'>
									<h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
										Advanced IT Institute in Cambodia
									</h3>
								</div>
							</div>

							{/* Vision Points */}
							<div className='space-y-6'>
								{[
									{
										title: "Innovation Hub",
										description:
											"Creating the next generation of tech innovators and entrepreneurs",
									},
									{
										title: "Global Impact",
										description:
											"Connecting Cambodian talent with worldwide opportunities",
									},
									{
										title: "Excellence Standard",
										description:
											"Consult and connect ISTAD trainees to top IT careers",
									},
								].map((point, index) => (
									<motion.div
										key={point.title}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.2 }}
										viewport={{ once: true }}
										className='flex items-start space-x-4 group'>
										<FaStarOfLife className='text-red-500 flex-shrink-0' />
										<div>
											<h4 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2'>
												{point.title}
											</h4>
											<p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>
												{point.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Vision Visual */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='relative'>
							<CometCard className='h-full'>
								<div className='bg-white dark:bg-gray-800 p-8 rounded-3xl h-full relative overflow-hidden'>
									{/* Decorative Elements */}
									<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full -translate-y-16 translate-x-16'></div>
									<div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-blue-600/20 rounded-full translate-y-12 -translate-x-12'></div>

									<div className='relative z-10'>
										<div className='text-center mb-8'>
											<div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4'>
												<svg
													className='w-8 h-8 text-white'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M13 10V3L4 14h7v7l9-11h-7z'
													/>
												</svg>
											</div>
											<h3 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2'>
												Future-Ready Education
											</h3>
										</div>

										<div className='space-y-4'>
											{[
												{ label: "Technology Integration", value: "100%" },
												{ label: "Industry Partnerships", value: "95%" },
												{ label: "Graduate Success Rate", value: "98%" },
												{ label: "Global Recognition", value: "90%" },
											].map((stat, index) => (
												<motion.div
													key={stat.label}
													initial={{ opacity: 0, x: 20 }}
													whileInView={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.6, delay: index * 0.1 }}
													viewport={{ once: true }}
													className='flex items-center justify-between'>
													<span className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>
														{stat.label}
													</span>
													<div className='flex items-center space-x-2'>
														<div className='w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
															<motion.div
																initial={{ width: 0 }}
																whileInView={{ width: stat.value }}
																transition={{
																	duration: 1,
																	delay: index * 0.2 + 0.5,
																}}
																viewport={{ once: true }}
																className='h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'
															/>
														</div>
														<span className='text-sm font-semibold text-gray-900 dark:text-white'>
															{stat.value}
														</span>
													</div>
												</motion.div>
											))}
										</div>
									</div>
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
									"Provide the latest methodology with high-quality training and mentoring",
							},
							{
								title: "Accessibility",
								description:
									"Build up the capacity and career of IT experts in Cambodia",
							},
							{
								title: "Excellence",
								description:
									"Consult and connect ISTAD trainees to top IT careers",
							},
						].map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}>
								<CometCard className='h-full'>
									<div className='bg-[#eef2ff] dark:bg-[#21253c] p-6 sm:p-8 h-full rounded-2xl text-center'>
										<div className='mb-6'>
											<HiChip className='text-5xl sm:text-6xl mx-auto text-blue-600 dark:text-blue-400' />
										</div>
										<p className='text-gray-900 dark:text-white font-semibold text-sm sm:text-base leading-relaxed'>
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

				<div className='max-w-7xl mx-auto relative z-10'>
					{/* Mentors */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='w-full max-w-7xl mx-auto px-6 py-12 rounded-full'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide uppercase text-center text-primary dark:text-hover mb-4'>
							Our Mentors
						</h2>
						<p className='text-base sm:text-lg text-center tracking-wide leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
							Great accomplishments are born from great guidance — and we owe
							ours to a remarkable mentors.
						</p>

						<div className='flex justify-center items-center'>
							<div className='grid grid-cols-2 gap-2 sm:gap-6 md:gap-8 lg:gap-12 justify-items-center rounded-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none mx-auto'>
								{Object.values(mentor).map((m, idx) => (
									<motion.div
										key={m.name}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: idx * 0.2 }}
										viewport={{ once: true }}>
										<MentorCard
											image={m.image}
											name={m.name}
											role={m.role}
											social={m.social}
										/>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide uppercase text-center text-primary dark:text-hover mb-4'>
							Our Team Members
						</h2>
						<p className='text-base sm:text-lg text-center tracking-wide leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
							No achievement is possible without teamwork — and ours thrives
							because of remarkable teammates.
						</p>
					</motion.div>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8'>
						{Object.values(member).map((memberObj, idx) => (
							<motion.div
								key={memberObj.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.1 }}
								viewport={{ once: true }}>
								<CometCard className='h-full'>
									<div className='bg-card rounded-2xl h-full'>
										<div className='p-2 sm:p-3'>
											<div className='relative w-full aspect-square overflow-hidden rounded-lg group shadow-lg hover:shadow-xl transition-all duration-300'>
												<Image
													src={memberObj.image}
													alt={`Team Member ${memberObj.name}`}
													fill
													sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
													className='object-cover group-hover:scale-105 transition-transform duration-300'
												/>
											</div>
										</div>
										<div className='p-3 sm:p-4 md:p-5 lg:p-6 text-center'>
											<h2 className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white line-clamp-2'>
												{memberObj.name}
											</h2>
											<p className='text-xs sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-1'>
												{memberObj.role}
											</p>
											<div className='flex justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-4'>
												<a
													href={memberObj.social.facebook}
													target='_blank'
													rel='noopener noreferrer'
													className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200'
													aria-label={`${memberObj.name} Facebook`}>
													<FaFacebook className='w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
												</a>
												<a
													href={memberObj.social.github}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200'
													aria-label={`${memberObj.name} GitHub`}>
													<FaGithub className='w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
												</a>
												<a
													href={memberObj.social.telegram}
													target='_blank'
													rel='noopener noreferrer'
													className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200'
													aria-label={`${memberObj.name} Telegram`}>
													<FaTelegram className='w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5' />
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
			{/* <MorphTo /> */}

			{/* CTA Section */}
			<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-primary'>
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
							onClick={() => router.push("/explor-program")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors duration-200'>
							Explore program
						</motion.button>
					</motion.div>
				</div>
			</section>

			{/* Contact Form Section */}
			<ContactForm />
		</div>
	);
}
