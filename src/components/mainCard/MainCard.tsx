/** @format */

import { Button } from "../ui/button";

export default function MainCard() {
	return (
		<div className='min-h-screen bg-background p-8 flex items-center justify-center'>
			<div
				className='bg-gray-900 rounded-2xl max-w-[580px] w-full relative'
				style={{ height: "500px" }}>
				<div className='absolute top-0 left-0 pt-6 pl-6'>
					<h2 className='text-white text-2xl font-semibold mb-2'>
						Short Courses
					</h2>
					<p className='text-gray-300 text-sm mb-6 leading-relaxed'>
						Compact learning programs focused on specific skills or topics.
					</p>
					<Button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium'>
						Up Your Skill
					</Button>
				</div>
				<div className='absolute bottom-0 right-0 pr-6 pb-6'>
					<img
						src='https://static.vecteezy.com/system/resources/thumbnails/024/724/633/small/a-happy-smiling-young-college-student-with-a-book-in-hand-isolated-on-a-transparent-background-generative-ai-free-png.png'
						alt='Student with backpack holding books'
						className='w-64 h-80 object-cover object-bottom rounded-lg shadow-lg'
					/>
				</div>
			</div>
		</div>
	);
}
