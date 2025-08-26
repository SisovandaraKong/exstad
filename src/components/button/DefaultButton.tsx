/** @format */

import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Default() {
	return (
		<button className='flex items-center font-description-5 font-semibold text-primary px-4 py-1 border border-primary hover:bg-accent-hover rounded-full transition-colors'>
			<span className='ml-2'>Read More</span>
			<FaArrowRightLong className='h-4 w-4' />
		</button>
	);
}
