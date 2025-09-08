/** @format */

export function StaticCard_NewCourses() {
	const courses = [
		"Graphics Design",
		"Web Design",
		"UI/UX Design",
		"Web development",
	];

	return (
		<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-full bg-gray-800 rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-lg min-w-0'>
			<h2 className='text-white text-base sm:text-lg font-bold mb-2'>
				New Courses
			</h2>
			<div className='flex flex-col gap-2 flex-1 justify-center'>
				{courses.map((course, index) => (
					<div key={index} className='flex items-center gap-2'>
						<div className='w-6 h-1 bg-gradient-to-r from-[#FF0000] to-[#7777FF] rounded-full flex-shrink-0'></div>
						<span className='text-white text-xs sm:text-sm'>{course}</span>
					</div>
				))}
			</div>
		</div>
	);
}
