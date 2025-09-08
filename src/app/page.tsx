/** @format */

"use client";
import { useTranslations } from "next-intl";
import { CourseCard } from "../components/mostPopularCourseCard/CourseCard";
import ScholarshipCard from "@/components/scholarship_mainCard/ScholarshipCard";
import ShortCourseCard from "@/components/shortCourse_mainCard/ShortCourseCard";
import AnimatedSpinner from "@/components/animation/animated_spinning";
import { StateCard } from "@/components/state/StateCard";
import { Ripple } from "@/components/magicui/ripple";
import { OfferCard } from "@/components/offering/OfferCard";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BiCurrentLocation } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { PartnersSection } from "@/components/partnership/PartnershipSection";
import Footer from "@/components/footer/Footer";
import { MorphingText } from "@/components/magicui/morphing-text";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StatisticsCard_10000 } from "@/components/staticCard/StaticCard_10000";
import { StaticCard_Internship } from "@/components/staticCard/StaticCard_Internship";
import StaticCard_RealProjects from "@/components/staticCard/StaticCard_RealProjects";
import { StaticCard_NewCourses } from "@/components/staticCard/StaticCard_NewCourses";
import SwiperSlideComponent_PopularCourse from "@/components/swiper/swiperSlide";
import SwiperSlideComponent_RecommendedCourse from "@/components/swiper/SwiperSlide_RecommendCourse";
import { WhyChooseEXSTAD_Card } from "@/components/whyexSTAD/WhyChooseEXSTAD";
import { Welcoming_Card } from "@/components/welcomeCard/Weloming_Card";

export default function Home() {
	const t = useTranslations();
	90;
	return (
		<div className='min-h-screen flex flex-col bg-background'>
			<main className='min-h-screen w-full mx-auto'>
				{/* <div className='py-[250px]'>
					<MorphingText
						texts={["Quality education is a", "key to your future success"]}
					/>
				</div> */}

				{/* Hero Section */}

				<div className='flex  justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					{/* Animated Section */}
					<div className='relative w-[50%] mx-auto min-h-[180px] flex start-0'>
						<h1 className='absolute inset-0 flex items-center justify-center font-bold text-3xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-[#FF0000] to-[#7777FF] bg-clip-text text-transparent text-center px-2 z-10'>
							Quality education is a key to your future success
						</h1>
						<div className='w-full flex items-center justify-center'>
							<AnimatedSpinner variant='rotate' />
						</div>
					</div>
					{/* Statistics Cards */}
					<div className='w-[50%] justify-center items-center grid grid-cols-1 sm:grid-cols-2 gap-5'>
						<div className=''>
							<StatisticsCard_10000 />
						</div>
						<div className=''>
							<StaticCard_Internship />
						</div>
						<div className=''>
							<StaticCard_RealProjects />
						</div>
						<div className=''>
							<StaticCard_NewCourses />
						</div>
					</div>
				</div>

				{/* Learn More Section */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<Welcoming_Card />
				</div>

				{/* MainCard Section */}
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

				{/* Popular Course Section */}
				<div className='w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32 mx-auto'>
					<SwiperSlideComponent_PopularCourse />
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
				<div className=''>
					<WhyChooseEXSTAD_Card />
				</div>

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
			<Footer />
		</div>
	);
}
