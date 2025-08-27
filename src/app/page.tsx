/** @format */

"use client";
import { useTranslations } from "next-intl";
import { CourseCard } from "../components/mostPopularCourseCard/CourseCard";
import MainCard from "@/components/mainCard/MainCard";

export default function Home() {
	const t = useTranslations();
	return (
		<main className='min-h-screen bg-background p-8'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-bold text-center mb-8'>Course Cards</h1>
				<div className='flex flex-wrap justify-center gap-6'>
					<CourseCard
						course={{
							id: "1",
							title: "Example Course",
							description:
								"Use Figma to get a job in UI Design, User Interface, User Experience design.",
							category: "Design",
							image:
								"https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80",
						}}
					/>
					<CourseCard
						course={{
							id: "2",
							title: "React Mastery",
							description:
								"Master React and build scalable web applications with hooks, context, and more.",
							category: "Web Development",
							image:
								"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
						}}
					/>
				</div>
			</div>
			{/* Add more sections or components as needed */}
			<div>
				<h1 className='text-3xl font-bold text-center my-8'>Main Card</h1>
				<MainCard
					title='Short Courses'
					description='Compact learning programs focused on specific skills or topics.'
				/>
			</div>
			<div className='bg-background px-32 rounded-3xl border'>
				<div>
					<h1>Hello</h1>
				</div>
			</div>
		</main>
	);
}
