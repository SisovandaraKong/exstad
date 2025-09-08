/** @format */

export function StatisticsCard_10000() {
	return (
		<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-full bg-gray-800 rounded-3xl p-4 sm:p-6 flex flex-col justify-between items-start relative overflow-hidden min-w-0'>
			{/* Orange icon in top left */}
			<div className='absolute top-3 left-3'>
				<svg width='32' height='32' viewBox='0 0 32 32' className='block'>
					{/* Back outlined double circles */}
					<circle
						cx='16'
						cy='16'
						r='14'
						fill='none'
						stroke='#f59e0b'
						strokeWidth='2'
					/>
					<circle
						cx='16'
						cy='16'
						r='10'
						fill='none'
						stroke='#f59e0b'
						strokeWidth='2'
					/>
					{/* Front solid circle */}
					<circle cx='16' cy='16' r='7' fill='#f59e0b' stroke='none' />
				</svg>
			</div>

			{/* Main statistic */}
			<div className='flex flex-col items-start justify-center flex-1 pt-6 w-full gap-2'>
				<h1 className='text-white text-2xl pt-5 sm:text-3xl font-bold leading-none text-left w-full'>
					100000+
				</h1>
				<p className='text-white text-xs sm:text-sm leading-tight text-left mt-2 w-full'>
					Student Finished Coursece
					<br />
					Every Year
				</p>
			</div>

			{/* Chart area */}
			<div
				className='w-full flex-shrink-0 flex flex-col items-start justify-end gap-2'
				style={{ height: "56px" }}>
				<svg
					className='w-full h-6'
					viewBox='0 0 213 24'
					preserveAspectRatio='none'>
					<path
						d='M0,21 Q30,10 53,18 Q76,26 106,12 Q136,0 150,12 Q170,24 190,10 Q200,5 213,9'
						stroke='#f59e0b'
						strokeWidth='2'
						fill='none'
						strokeLinecap='round'
					/>
					<circle cx='213' cy='9' r='3' fill='#f59e0b' />
					<path
						d='M213,9 Q220,7 227,5'
						stroke='#6b7280'
						strokeWidth='2'
						fill='none'
						strokeLinecap='round'
					/>
				</svg>
				<div className='w-full py- flex justify-start text-white text-[10px] px-1 gap-2'>
					<span>40,000</span>
					<span>60,000</span>
					<span>1,00,000</span>
				</div>
			</div>
		</div>
	);
}
