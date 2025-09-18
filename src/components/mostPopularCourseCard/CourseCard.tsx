/** @format */

"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { CourseCardProps } from "@/types";
import { Button } from "../ui/button";

export function CourseCard({ course, className }: CourseCardProps) {
	return (
		<div
			className={` w-full max-w-[320px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[400px] xl:max-w-[420px] overflow-hidden p-4 sm:p-5 md:p-6 bg-white dark:bg-input/30 border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 ${
				className || ""
			}`}>
			<div className='relative aspect-video mb-3 sm:mb-4 md:mb-5'>
				<Image
					src={course.image || "/placeholder.svg"}
					alt={course.imageAlt || course.title}
					fill
					className='object-cover rounded-xl sm:rounded-2xl'
					unoptimized
				/>
			</div>
			<div className='flex flex-col h-full'>
				<div className='flex flex-col gap-2 sm:gap-3 md:gap-4 flex-grow'>
					<div className='flex flex-col gap-2 sm:gap-3'>
						<span className='text-xs sm:text-sm md:text-base font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide'>
							{course.category}
						</span>
						<h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2 sm:line-clamp-1'>
							{course.title}
						</h3>
					</div>
					<p className='text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 flex-grow'>
						{course.description}
					</p>
					<div className='pt-2 sm:pt-3 md:pt-4 mt-auto'>
						<Button asChild className='w-full sm:w-auto'>
							<a
								onClick={() => {
									window.open(
										course.joinCourseUrl,
										"_blank",
										"noopener,noreferrer"
									);
								}}
								href={course.joinCourseUrl}
								className='inline-flex items-center justify-center rounded-2xl sm:rounded-3xl px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto'>
								<span>Enroll Now</span>
								<ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1' />
							</a>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
