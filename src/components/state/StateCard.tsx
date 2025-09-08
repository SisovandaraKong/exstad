/** @format */

export function StateCard() {
	return (
		<div className=''>
			<div className='bg-white dark:bg-[#202124] mx-auto max-w-auto px-4 py-[60px] sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-2xl lg:max-w-none'>
					<div className='text-center space-y-4'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
							Trusted by creators worldwide
						</h2>
						<p className='text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300'>
							We can help you grow your audience and your business, no matter
							the size.
						</p>
					</div>
					<dl className='mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 overflow-hidden rounded-2xl text-center'>
						<div className='flex flex-col bg-white dark:bg-[#171717] p-6 sm:p-8'>
							<dt className='text-xs sm:text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300'>
								words written in 2023
							</dt>
							<dd className='order-first text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
								1.8k
							</dd>
						</div>
						<div className='flex flex-col bg-white dark:bg-[#171717] p-6 sm:p-8'>
							<dt className='text-xs sm:text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300'>
								episodes uploaded
							</dt>
							<dd className='order-first text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
								10k
							</dd>
						</div>
						<div className='flex flex-col bg-white dark:bg-[#171717] p-6 sm:p-8'>
							<dt className='text-xs sm:text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300'>
								hours of media
							</dt>
							<dd className='order-first text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
								6.6k
							</dd>
						</div>
						<div className='flex flex-col bg-white dark:bg-[#171717] p-6 sm:p-8'>
							<dt className='text-xs sm:text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300'>
								answers
							</dt>
							<dd className='order-first text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
								2.1k
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}
