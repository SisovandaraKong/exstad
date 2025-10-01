/** @format */

"use client";
import ScholarshipCard from "@/components/scholarship_mainCard/ScholarshipCard";
import ShortCourseCard from "@/components/shortCourse_mainCard/ShortCourseCard";
import AnimatedSpinner from "@/components/animation/animated_spinning";
import { StateCard } from "@/components/state/StateCard";
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
import { Marquee3D } from "@/components/marquee3D/Marquee3D";

export default function Home() {
	// const t = useTranslations();
	// 90;
	return (
		<div className='min-h-screen flex flex-col bg-background'>
			<main className='min-h-screen w-full mx-auto'>
				{/* <div className='py-[250px]'>
					<MorphingText
						texts={["Quality education is a", "key to your future success"]}
					/>
				</div> */}

				<div className='flex flex-col lg:flex-row w-full py-10 px-2 sm:px-4 md:px-8 lg:px-32 mx-auto'>
					{/*  */}
					{/* <div className='relative h-[500px] w-1/2 overflow-hidden'>
						<RetroGrid />
						<span className='bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-3xl'>
							{" "}
							Quality education is a key to your future success
						</span>
					</div> */}

					{/* Hero Section Version 2 */}
					<div className='w-full lg:w-1/2 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto min-h-[120px] sm:min-h-[180px] flex flex-col items-center justify-center mb-4 relative'>
						<h1 className='absolute inset-0 flex items-center justify-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-center px-2 z-20'>
							Quality education is a key to your future success
						</h1>
						<div className='w-full flex items-center justify-center relative z-10'>
							<AnimatedSpinner />
						</div>
					</div>

					{/* Marquee Section */}
					<div className='w-full lg:w-1/2 flex items-center justify-center mx-auto'>
						<Marquee3D />
					</div>
				</div>

				{/* Scroll Velocity Section */}
				{/* <div className='py-[20px]'>
					<ScrollVelocityContainer className='text-4xl md:text-7xl font-bold'>
						<ScrollVelocityRow
							baseVelocity={10}
							direction={1}
							style={{
								color: "black",
								backgroundColor: "#ff134a",
								padding: "10px",
								rotate: " -2deg",
								zIndex: 10,
							}}>
							Welcome to exSTAD
						</ScrollVelocityRow>
						<ScrollVelocityRow
							baseVelocity={20}
							direction={-1}
							style={{
								color: "#253C95",
								fontSize: "2.5rem",
								padding: "10px",
								rotate: " 1deg",
								backgroundColor: "#e0e7ff",
							}}>
							Your gateway to quality education
						</ScrollVelocityRow>
					</ScrollVelocityContainer>
				</div> */}

				{/* Welcoming Section */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<Welcoming_Card />
				</div>

				{/* Short Courses and Scholarships Section */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-stretch'>
					<div className='max-w-[580px] h-full'>
						<ShortCourseCard
							id='1'
							title='Short Courses'
							description='Compact learning programs focused on specific skills or topics.'
							cardBackground=''
						/>
					</div>
					<div className='max-w-[580px] h-full'>
						<ScholarshipCard
							id='2'
							title='Scholarship Occupies'
							description='Financial support awarded to help students pursue their education.'
							cardBackground=''
						/>
					</div>
				</div>

	

				{/* Course Counting Section */}
				<div className='w-full'>
					<StateCard />
				</div>

				{/* Recommendation Course Section */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<SwiperSlideComponent_RecommendedCourse />
				</div>

				{/* Why Choose EXSTAD Section */}
				{/* <div className=''>
					<WhyChooseEXSTAD_Card />
				</div> */}

				{/* Offerring Section */}
				<div className='bg-background py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<div className='text-center space-y-4 py-6'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
							What can we do for you?
						</h2>
						<p className='text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300'>
							Providing tailored solutions, expert support, and innovative
							services to meet your needs.
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-8 lg:gap-x-12 lg:gap-y-12'>
						<OfferCard
							icon={
								<HiMiniComputerDesktop
									style={{ color: "orange", fontSize: "2.5rem" }}
								/>
							}
							content={
								<p>
									Custom web applications tailored to your business needs. We
									use cutting-edge technologies to deliver fast, responsive, and
									scalable solutions.
								</p>
							}
						/>
						<OfferCard
							icon={
								<BiCurrentLocation
									style={{ color: "#F73030", fontSize: "2.5rem" }}
								/>
							}
							content={
								<p>
									Opportunities for Tech-Driven Students – Specially built for
									Cambodian students who want to grow their skills in IT and
									innovation.
								</p>
							}
						/>
						<OfferCard
							icon={
								<FaGraduationCap
									style={{ color: "#EAB309", fontSize: "2.5rem" }}
								/>
							}
							content={
								<p>
									Scholarships available for deserving students. Apply now to
									secure your future in the tech industry.
								</p>
							}
						/>
						<OfferCard
							icon={
								<FaBoxOpen style={{ color: "green", fontSize: "2.5rem" }} />
							}
							content={
								<p>
									Showcasing ISTAD’s Products – From apps to platforms, students
									can explore ISTAD’s actual creations.
								</p>
							}
						/>
						<OfferCard
							icon={
								<GiTrophy style={{ color: "purple", fontSize: "2.5rem" }} />
							}
							content={
								<p>
									Celebrating Achievements – Displaying ISTAD’s awards,
									successful projects, and notable milestones.
								</p>
							}
						/>
						<OfferCard
							icon={<TbWorld style={{ color: "blue", fontSize: "2.5rem" }} />}
							content={
								<p>
									Unified Learning Platform – One digital space where all
									resources, opportunities, and success stories come together.
								</p>
							}
						/>
					</div>
				</div>

				{/* Partnership Section */}
				<div className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<PartnersSection />
				</div>
			</main>
		</div>
	);
}

{
	/* Hero Section Version 1 */
}
{
	/* <div className='flex flex-col lg:flex-row w-full py-10 px-2 sm:px-4 md:px-8 lg:px-32 mx-auto'>
					<div className='w-full lg:w-1/2 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto min-h-[120px] sm:min-h-[180px] flex flex-col items-center justify-center mb-4 relative'>
						<h1 className='absolute inset-0 flex items-center justify-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-center px-2 z-20'>
							Quality education is a key to your future success
						</h1>
						<div className='w-full flex items-center justify-center relative z-10'>
							<AnimatedSpinner />
						</div>
					</div>

					<div className='w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto p-2 sm:p-4 md:p-6 items-start'>
						<div className=' lg:space-y-6 space-y-6 flex flex-col items-end'>
							<div>
								<StatisticsCard_10000 />
							</div>
							<div>
								<StaticCard_Internship />
							</div>
						</div>
						<div className='lg:space-y-6 space-y-6 lg:mt-12'>
							<div>
								<StaticCard_RealProjects />
							</div>
							<div>
								<StaticCard_NewCourses />
							</div>
						</div>
					</div>
				</div> */
}
