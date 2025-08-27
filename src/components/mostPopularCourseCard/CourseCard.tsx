/** @format */

"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { CourseCardProps } from "@/types";

export function CourseCard({ course, className }: CourseCardProps) {
	return (
		<div
			className={`max-w-[384px] overflow-hidden px-6 pt-6 pb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[24px] shadow-sm ${
				className || ""
			}`}>
			<div className='relative aspect-video pb-3'>
				<Image
					src={course.image || "/placeholder.svg"}
					alt={course.imageAlt || course.title}
					fill
					className='object-cover rounded-[12px]'
					unoptimized
				/>
			</div>
			<div>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-3 pt-3'>
						<span className='text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400'>
							{course.category}
						</span>
						<h3 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight'>
							{course.title}
						</h3>
					</div>
					<p className='text-xs sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed'>
						{course.description}
					</p>
					<div className='flex items-center justify-between pt-3'>
						<a
							href={course.readMoreUrl}
							className='px-4 py-2 inline-flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium transition-colors rounded-full border border-blue-600/5'>
							Read more
							<ArrowRight className='h-4 w-4' />
						</a>
						<a
							href={course.joinCourseUrl}
							className='px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors'>
							Join Course
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
