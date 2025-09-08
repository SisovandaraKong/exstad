/** @format */

export function StaticCard_Internship() {
	const percentage = 92;
	const circumference = 2 * Math.PI * 45; // radius of 45
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between items-center min-w-0'>
			{/* Circular Progress */}
			<div className='relative w-20 h-20 flex-shrink-0'>
				<svg className='w-20 h-20 transform -rotate-90' viewBox='0 0 100 100'>
					{/* Background circle */}
					<circle
						cx='50'
						cy='50'
						r='45'
						stroke='#e5e7eb'
						strokeWidth='8'
						fill='none'
					/>
					{/* Progress circle */}
					<circle
						cx='50'
						cy='50'
						r='45'
						stroke='url(#gradient)'
						strokeWidth='8'
						fill='none'
						strokeLinecap='round'
						strokeDasharray={strokeDasharray}
						strokeDashoffset={strokeDashoffset}
						className='transition-all duration-300 ease-in-out'
					/>
					{/* Gradient definition */}
					<defs>
						<linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
							<stop offset='0%' stopColor='#f59e0b' />
							<stop offset='100%' stopColor='#fbbf24' />
						</linearGradient>
					</defs>
				</svg>
				{/* Percentage text */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<span className='text-xl font-bold text-gray-800'>{percentage}%</span>
				</div>
			</div>
			{/* Content */}
			<div className='text-center flex flex-col items-center justify-center gap-1 flex-1 w-full'>
				<h2 className='text-base sm:text-lg font-bold text-gray-800'>
					Intership
				</h2>
				<p className='text-gray-600 text-xs sm:text-sm leading-tight w-full'>
					At ISTAD, 92% of students secure internships before graduation.
				</p>
			</div>
		</div>
	);
}
