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
import SwiperSlideComponent_PopularCourse from "@/components/swiper/swiperSlide";
import SwiperSlideComponent_RecommendedCourse from "@/components/swiper/SwiperSlide_RecommendCourse";
import { Welcoming_Card } from "@/components/welcomeCard/Weloming_Card";
import { Marquee3D } from "@/components/marquee3D/Marquee3D";
import AnimatedSpinner from "@/components/animation/animated_spinning";
import StateCard from "@/components/state/StateCard";
import { Vortex } from "@/components/ui/vortex";
import { WhyChooseEXSTAD_Card } from "@/components/whyexSTAD/WhyChooseEXSTAD";

export default function Home() {
	// const t = useTranslations();
	// 90;
	return (
		<motion.div
			className='min-h-screen flex flex-col bg-background'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}>
			<main className='min-h-screen w-full mx-auto'>
				<motion.div
					className='flex flex-col lg:flex-row w-full py-10 px-2 sm:px-4 md:px-8 lg:px-32 mx-auto'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					{/* Hero Section */}
					<motion.div
						className='w-full lg:w-1/2 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto min-h-[120px] sm:min-h-[180px] flex flex-col items-center justify-center mb-4 relative'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<motion.h1
							className='absolute inset-0 flex items-center justify-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-center px-2 z-20'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}>
							Quality education is a key to your future success
						</motion.h1>
						<motion.div
							className='w-full flex items-center justify-center relative z-10'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.8 }}>
							<AnimatedSpinner />
						</motion.div>
					</motion.div>

					{/* Marquee Section */}
					<motion.div
						className='w-full lg:w-1/2 flex items-center justify-center mx-auto'
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}>
						<Marquee3D />
					</motion.div>
				</motion.div>

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
					className='w-full pb-4 sm:pb-6 md:pb-8 lg:pb-12 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto flex flex-col md:flex-row gap-3 md:gap-6 justify-between items-stretch'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: false, margin: "-50px" }}>
					<motion.div
						className='h-full'
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: false }}
						whileHover={{ y: -5, transition: { duration: 0.2 } }}>
						<ShortCourseCard
							id='1'
							title='Short Courses'
							description='Compact learning programs focused on specific skills or topics.'
							cardBackground=''
						/>
					</motion.div>
					<motion.div
						className='h-full'
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
					<SwiperSlideComponent_PopularCourse />
				</motion.div>

				{/* Course Counting Section */}
				<motion.div
					className='w-full'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: false, margin: "-100px" }}>
					<StateCard />
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
					className='bg-background pb-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: false, margin: "-100px" }}>
					<motion.div
						className='text-center space-y-4 py-12'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						viewport={{ once: false }}>
						<motion.h2
							className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: false }}>
							What can we do for you?
						</motion.h2>
						<motion.p
							className='text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: false }}>
							Providing tailored solutions, expert support, and innovative
							services to meet your needs.
						</motion.p>
					</motion.div>
					<motion.div
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-8 lg:gap-x-12 lg:gap-y-12'
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
										style={{ color: "orange", fontSize: "2.5rem" }}
									/>
								}
								content={
									<p>
										Stay informed with the latest scholarship opportunities at
										ISTAD, tailored to support students in tech and innovation.
									</p>
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
									<p>
										Explore structured IT career roadmaps that guide you step by
										step toward achieving your professional goals.
									</p>
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
									<p>
										Gain practical skills through short courses designed to
										strengthen your knowledge and prepare you for real-world
										challenges.
									</p>
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
									<FaBoxOpen style={{ color: "green", fontSize: "2.5rem" }} />
								}
								content={
									<p>
										Access a wide range of curated resources, from study
										materials to hands-on projects, all in one place.
									</p>
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
									<GiTrophy style={{ color: "purple", fontSize: "2.5rem" }} />
								}
								content={
									<p>
										Get inspired by success stories of students who secured
										scholarships and built thriving careers in IT.
									</p>
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
								icon={<TbWorld style={{ color: "blue", fontSize: "2.5rem" }} />}
								content={
									<p>
										Connect with global opportunities in technology, education,
										and networking to expand your horizons beyond the classroom.
									</p>
								}
							/>
						</motion.div>
					</motion.div>
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
			</main>
		</motion.div>
	);
}
