/** @format */

"use client";
import { motion } from "framer-motion";
import ScholarshipCard from "@/components/scholarship_mainCard/ScholarshipCard";
import ShortCourseCard from "@/components/shortCourse_mainCard/ShortCourseCard";
import { OfferCard } from "@/components/offering/OfferCard";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BiCurrentLocation } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { PartnersSection } from "@/components/partnership/PartnershipSection";
import SwiperSlideComponent_RecommendedCourse from "@/components/swiper/SwiperSlide_RecommendCourse";
import { Welcoming_Card } from "@/components/welcomeCard/Weloming_Card";
import { WhyChooseISTAD_Card } from "@/components/whyexSTAD/WhyChooseEXSTAD";
import { WaveBackground } from "@/components/ui/wave-background";
import SwiperSlideComponent_PopularCourse from "@/components/swiper/swiperSlide";
import { useGetAllMasterProgramsQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import ModernHeroSection from "@/components/hero/ModernHeroSection";

export default function Home() {
	const { data: allPrograms = [] } = useGetAllMasterProgramsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	const programs = allPrograms.filter((p) => p.visibility === "PUBLIC");

	const { data: allOpeningProgram = [] } = useGetAllOpeningProgramsQuery(
		undefined,
		{ refetchOnMountOrArgChange: true }
	);
	const openingPrograms = allOpeningProgram.filter((p) => p.status === "OPEN");

	const visiblePrograms = programs.filter((p) =>
		openingPrograms.some((o) => o.programName === p.title)
	);
	// const t = useTranslations();
	// 90;
	return (
		<motion.div
			className='flex flex-col bg-background'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}>
			{/* Modern Hero Section */}
			<ModernHeroSection />

			<div className='w-full mx-auto'>
				{/* Welcoming Section */}
				<motion.div
					className='w-full py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-100px" }}>
					<Welcoming_Card />
				</motion.div>

				{/* Short Courses and Scholarships Section */}
				<motion.div
					className='w-full pb-4 sm:pb-6 md:pb-8 lg:pb-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: false, margin: "-50px" }}>
					<motion.div
						className='h-full w-full'
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: false }}
						whileHover={{ y: -5, transition: { duration: 0.2 } }}>
						<ShortCourseCard />
					</motion.div>
					<motion.div
						className='h-full w-full'
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: false }}
						whileHover={{ y: -5, transition: { duration: 0.2 } }}>
						<ScholarshipCard
							id='2'
							title='Scholarship Occupies'
							description='Financial support awarded to help students pursue their education.'
							cardBackground=''
						/>
					</motion.div>
				</motion.div>

				{/* Popular Course Section */}
				<motion.div
					className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-50px" }}>
					<SwiperSlideComponent_PopularCourse
						programs={visiblePrograms}
						openingPrograms={openingPrograms}
					/>
				</motion.div>

				{/* Statistics Section */}
				<motion.div
					className='bg-background py-24 sm:py-32'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-100px" }}>
					<div className='mx-auto max-w-7xl px-6 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:max-w-none'>
							<motion.div
								className='text-center space-y-4'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}>
								<h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>
									Outstanding Career Achievement
								</h2>
								<p className='text-lg leading-8 text-muted-foreground'>
									Discover where our graduates excel in their professional
									journey across diverse industries.
								</p>
							</motion.div>
							<motion.dl
								className='mt-16 py-8 grid grid-cols-1 gap-4 sm:gap-6 md:gap-4 lg:gap-6 rounded-2xl text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								viewport={{ once: true }}>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										International Tech Company
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										1%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										Study Abroad
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										2%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										Outsourcing
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										2%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										Startup Company
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										5%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										ISTAD
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										7%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										Officer
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										16%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										Bank & Finance
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										34%
									</dd>
								</motion.div>
								<motion.div
									className='flex flex-col bg-card border border-border p-6 sm:p-8 shadow-sm rounded-lg'
									whileHover={{
										scale: 1.05,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(255, 255, 255, 0.02)",
									}}
									transition={{ duration: 0.2 }}>
									<dt className='text-sm font-semibold leading-6 text-muted-foreground'>
										Technology Company
									</dt>
									<dd className='order-first text-3xl font-bold tracking-tight text-primary'>
										38%
									</dd>
								</motion.div>
							</motion.dl>
						</div>
					</div>
				</motion.div>

				{/* Recommendation Course Section */}
				<motion.div
					className='w-full pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-50px" }}>
					<SwiperSlideComponent_RecommendedCourse />
				</motion.div>

				{/* Offerring Section */}
				<motion.div
					className='relative bg-background pb-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto overflow-hidden'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: false, margin: "-100px" }}>
					{/* Soft Edge Blur Effects */}
					<div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background via-background/50 to-transparent z-20 pointer-events-none'></div>
					<div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/50 to-transparent z-20 pointer-events-none'></div>

					{/* Wave Background */}
					<WaveBackground className='opacity-60 dark:opacity-40' />

					<motion.div
						className='relative z-10 text-center space-y-4 py-12'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						viewport={{ once: false }}>
						<motion.h2
							className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: false }}>
							What can we do for you?
						</motion.h2>
						<motion.p
							className='text-base sm:text-lg leading-8 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: false }}>
							Providing tailored solutions, expert support, and innovative
							services to meet your needs.
						</motion.p>
					</motion.div>
					<motion.div
						className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-8 lg:gap-x-12 lg:gap-y-12'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: false }}>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: false }}
							whileHover={{
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}>
							<OfferCard
								icon={
									<HiMiniComputerDesktop
										style={{ color: "#F97316", fontSize: "2.5rem" }}
									/>
								}
								content={
									<div>
										<h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
											Scholarship Updates
										</h3>
										<p>
											Stay informed with the latest scholarship opportunities
											tailored for tech and innovation students.
										</p>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: false }}
							whileHover={{
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}>
							<OfferCard
								icon={
									<BiCurrentLocation
										style={{ color: "#F73030", fontSize: "2.5rem" }}
									/>
								}
								content={
									<div>
										<h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
											Career Roadmaps
										</h3>
										<p>
											Explore structured IT career paths that guide you
											step-by-step toward your professional goals.
										</p>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: false }}
							whileHover={{
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}>
							<OfferCard
								icon={
									<FaGraduationCap
										style={{ color: "#EAB309", fontSize: "2.5rem" }}
									/>
								}
								content={
									<div>
										<h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
											Skill Development
										</h3>
										<p>
											Gain practical skills through short courses designed to
											prepare you for real-world challenges.
										</p>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: false }}
							whileHover={{
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}>
							<OfferCard
								icon={
									<FaBoxOpen style={{ color: "#10B981", fontSize: "2.5rem" }} />
								}
								content={
									<div>
										<h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
											Learning Resources
										</h3>
										<p>
											Access curated study materials, hands-on projects, and
											learning tools all in one place.
										</p>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							viewport={{ once: false }}
							whileHover={{
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}>
							<OfferCard
								icon={
									<GiTrophy style={{ color: "#8B5CF6", fontSize: "2.5rem" }} />
								}
								content={
									<div>
										<h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
											Success Stories
										</h3>
										<p>
											Get inspired by students who secured scholarships and
											built thriving IT careers.
										</p>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							viewport={{ once: false }}
							whileHover={{
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}>
							<OfferCard
								icon={
									<TbWorld style={{ color: "#3B82F6", fontSize: "2.5rem" }} />
								}
								content={
									<div>
										<h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
											Global Opportunities
										</h3>
										<p>
											Connect with worldwide opportunities in technology and
											education to expand your horizons.
										</p>
									</div>
								}
							/>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Why Choose ISTAD Section */}
				<motion.div
					className='py-4 sm:py-6 md:py-8 lg:py-10 bg-background'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-50px" }}>
					<WhyChooseISTAD_Card />
				</motion.div>

				{/* Partnership Section */}
				<motion.div
					className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-50px" }}>
					<PartnersSection />
				</motion.div>
			</div>
		</motion.div>
	);
}
