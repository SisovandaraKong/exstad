/** @format */

import {
	SiNextdotjs,
	SiSpring,
	SiCplusplus,
	SiHtml5,
	SiCss3,
	SiFigma,
	SiDocker,
	SiJavascript,
	SiReact,
	SiTailwindcss,
} from "react-icons/si";
import { Button } from "../ui/button";
import { OrbitingCircles } from "../magicui/orbiting-circles";

const ShortCourseCard = () => {
	return (
		<div className='w-full h-full'>
			<div className='flex flex-col w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white border border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
				{/* ABOVE SECTION: Title + Description + Button */}
				<div className='flex flex-col justify-start pb-4 sm:pb-6 md:pb-8'>
					<h5 className='mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
						Short Courses
					</h5>
					<p className='mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg font-normal text-gray-700 dark:text-gray-400'>
						Compact learning programs focused on specific skills or topics.
					</p>
					<Button className='bg-primary hover:bg-primary-hover text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium w-fit mt-2'>
						Up Your Skill
					</Button>
				</div>

				{/* BELOW SECTION: Orbit Circle (Bottom-Right) */}
				<div className='relative flex-1 min-h-[140px] sm:min-h-[200px] md:min-h-[240px]'>
					<div
						className='absolute flex items-center justify-center'
						style={{
							width: "clamp(200px, 25vw, 400px)",
							height: "clamp(200px, 25vw, 400px)",
							bottom: "clamp(-120px, -15vw, -150px)",
							right: "clamp(-100px, -12vw, -150px)",
						}}>
						{/* Single orbit circle border */}
						<div
							className='absolute rounded-full border-2 border-gray-300/50 dark:border-gray-600/50'
							style={{
								width: "clamp(140px, 18vw, 290px)",
								height: "clamp(140px, 18vw, 290px)",
							}}
						/>

						{/* Single Orbit - All Technologies */}
						<OrbitingCircles
							className='pointer-events-none'
							radius={70}
							duration={25}
							iconSize={20}
							path={false}>
							{/* Core Technologies (from former inner orbit) */}
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiNextdotjs
									className='text-black'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiSpring
									className='text-green-600'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiCplusplus
									className='text-blue-600'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiHtml5
									className='text-orange-600'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiCss3
									className='text-blue-500'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							{/* Extended Technologies (from former outer orbit) */}
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiJavascript
									className='text-yellow-500'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiReact
									className='text-cyan-500'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiTailwindcss
									className='text-teal-500'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiFigma
									className='text-purple-500'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
							<div
								className='flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200'
								style={{
									width: "clamp(30px, 3.5vw, 42px)",
									height: "clamp(30px, 3.5vw, 42px)",
									borderRadius: "50%",
									aspectRatio: "1/1",
								}}>
								<SiDocker
									className='text-blue-600'
									style={{
										width: "clamp(18px, 2.2vw, 26px)",
										height: "clamp(18px, 2.2vw, 26px)",
									}}
								/>
							</div>
						</OrbitingCircles>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShortCourseCard;
