/** @format */

import { Button } from "../ui/button";

type MainCardProps = {
	title: string;
	description: string;
};

export default function MainCard({ title, description }: MainCardProps) {
	return (
		<div className='min-h-screen bg-background p-8 flex items-center justify-center'>
			<div
				className='bg-gray-900 rounded-3xl max-w-[580px] w-full relative'
				style={{ height: "500px" }}>
				<div className='absolute w-[70%] pt-12 pl-12'>
					<h2 className='text-white text-2xl font-semibold mb-2'>{title}</h2>
					<p className='text-gray-300 text-[16px] mb-6 leading-relaxed'>
						{description}
					</p>
					<Button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium'>
						Up Your Skill
					</Button>
				</div>
				<div className='absolute bottom-0 right-0'>
					<img
						src='./image/sampleImage/image 23.png'
						alt='Student with backpack holding books'
						className='w-auto h-[460px] rounded-br-3xl shadow-lg'
					/>
				</div>
			</div>
		</div>
	);
}
