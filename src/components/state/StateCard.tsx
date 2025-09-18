/** @format */

import { BsBank2 } from "react-icons/bs";
import { FaPlaneDeparture, FaSchool } from "react-icons/fa";
import { MdLocalPolice } from "react-icons/md";
import { GrResources, GrTechnology } from "react-icons/gr";
import { TbWorldCode } from "react-icons/tb";

export default function StateCard() {
	return (
		<section className='flex flex-col mt-8 sm:mt-12 md:mt-16 lg:mt-20 mx-auto text-center px-4 sm:px-6 lg:px-8'>
			<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 md:mb-6'>
				Our Outstanding Achievements
			</h2>
			<p className='text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-4xl mx-auto px-2 sm:px-4 md:px-8'>
				A showcase of the milestones we’ve reached, highlighting our growth,
				dedication, and impact in delivering excellence.
			</p>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 place-items-center w-full mx-auto max-w-7xl'>
				{/* Card 1 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<FaPlaneDeparture className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							2%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						Study Abroad
					</p>
				</div>

				{/* Card 2 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<MdLocalPolice className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							16%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						Officer
					</p>
				</div>

				{/* Card 3 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<BsBank2 className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							34%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						Bank & Finance
					</p>
				</div>

				{/* Card 4 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<GrTechnology className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							38%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						Technology Company
					</p>
				</div>

				{/* Card 5 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<FaSchool className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							7%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						ISTAD
					</p>
				</div>

				{/* Card 6 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<GrResources className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							2%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						Outsourcing
					</p>
				</div>

				{/* Card 7 */}
				<div className='flex flex-col justify-center items-center bg-whitesmoke p-4 sm:p-5 md:p-6 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[192px] w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200'>
					<div className='flex flex-row justify-center items-center mb-2 sm:mb-3 md:mb-4'>
						<TbWorldCode className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#d72e34]' />
						<p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-primary ml-2 sm:ml-3'>
							1%
						</p>
					</div>
					<p className='font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-5 sm:leading-6 text-center text-gray-700 dark:text-gray-300'>
						International Technology Company
					</p>
				</div>
			</div>
		</section>
	);
}
