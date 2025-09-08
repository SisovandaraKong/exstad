/** @format */
import { SiCircle } from "react-icons/si";

export default function StaticCard_RealProjects() {
	return (
		<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-full bg-white rounded-3xl shadow-lg p-4 sm:p-6 flex flex-col justify-between items-center min-w-0'>
			{/* Blue circular icon with curved lines */}
			<div className='py-3'>
				<SiCircle
					style={{ color: "#3b82f6", fontSize: "48px", fontWeight: "bold" }}
				/>
			</div>
			{/* Heading & Description */}
			<div className='flex flex-col start-0 gap-1 flex-1 w-full'>
				<h1 className='text-base sm:text-lg font-bold text-gray-900 text-start'>
					Real Projects
				</h1>
				<p className='text-gray-600 text-xs sm:text-sm leading-tight text-start w-full'>
					All ISTAD students must complete real-world projects to graduate.
				</p>
			</div>
		</div>
	);
}
