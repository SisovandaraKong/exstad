/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import component-specific styles (make sure this file exists)
import styles from "./SwiperSlideComponent.module.css";

import { CourseCard } from "../mostPopularCourseCard/CourseCard";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { RecommendationCourseCard } from "../recommendationCourseCard/Recommendation_CourseCard";
import { px } from "motion/react";

// --- Mock Data ---
// In a real Next.js app, this data would likely come from getStaticProps,
// getServerSideProps, or a client-side API call.
const popularCourses = [
	{
		id: "1",
		title: "Pre University Course",
		description: "Be ready for your journey at the university.",
		imageUrl:
			"https://png.pngtree.com/png-vector/20241119/ourmid/pngtree-portrait-of-a-young-male-student-with-books-and-backpack-representing-png-image_14499889.png",
		bgColor: "#ffffff",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "2",
		title: "Foundation Course",
		description: "Grow your skill, starting with the foundation.",
		imageUrl: "https://pngimg.com/uploads/student/student_PNG164.png",
		bgColor: "linear-gradient(135deg, #E5F2FF 0%, #ffffff 100%)",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "3",
		title: "Full Stack Course",
		description: "Become a full stack developer with us.",
		imageUrl:
			"https://static.vecteezy.com/system/resources/thumbnails/051/688/995/small_2x/smiling-young-male-university-student-standing-isolate-on-transparency-background-png.png",
		bgColor: "linear-gradient(135deg, #FFE5B4 0%, #FFD6D6 100%)",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "4",
		title: "ITP Course",
		description: "Go further, dive deeply with the huge of IT",
		imageUrl:
			"https://copierleasenewjersey.com/wp-content/uploads/2022/08/ccts-guy-copier.png",
		bgColor: "#FDF0E8",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "5",
		title: "ITE Course",
		description: "Come to become an exporter of IT field. ",
		imageUrl:
			"https://static.vecteezy.com/system/resources/previews/051/966/255/non_2x/a-man-in-glasses-holding-a-laptop-free-png.png",
		bgColor: "#FEFEF2",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
];

const SwiperSlideComponent_RecommendedCourse = () => {
	// Correctly typed ref for Swiper instance
	const swiperRef = useRef<SwiperType | null>(null);

	return (
		<div className='w-full flex flex-col items-center sm:gap-5 lg:gap-10'>
			{/* Title and Navigation Section */}
			<div className='w-full flex flex-col sm:flex-row items-center justify-between gap-4'>
				<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center sm:text-left'>
					Recommendation course for you{" "}
				</h2>

				{/* Custom Navigation */}
				<div className='flex gap-4 sm:gap-6 '>
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						aria-label='Previous Slide'
						className='text-[#253C95] hover:opacity-80 transition-opacity rounded-3xl p-2'>
						<FaCircleArrowLeft className='w-8 h-8 sm:w-10 sm:h-10' />
					</button>
					<button
						onClick={() => swiperRef.current?.slideNext()}
						aria-label='Next Slide'
						className='text-[#253C95] hover:opacity-80 transition-opacity rounded-3xl p-2'>
						<FaCircleArrowRight className='w-8 h-8 sm:w-10 sm:h-10' />
					</button>
				</div>
			</div>

			{/* Swiper Component */}
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Navigation]}
				loop={true}
				spaceBetween={24}
				slidesPerView={1}
				breakpoints={{
					// sm: 2 slides
					640: {
						slidesPerView: 2,
						spaceBetween: 24,
					},
					// lg: 3 slides
					1024: {
						slidesPerView: 3,
						spaceBetween: 32,
					},
				}}
				// Apply the CSS Module class here
				className={`w-full h-auto ${styles.swiperContainer}`}>
				{popularCourses.map((recommendation) => (
					<SwiperSlide
						key={recommendation.id}
						className='self-stretch h-full p-2'>
						<RecommendationCourseCard recommendation={recommendation} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
export default SwiperSlideComponent_RecommendedCourse;
