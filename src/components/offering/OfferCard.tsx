/** @format */
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { ReactNode } from "react";

type OfferCardProps = {
	icon: ReactNode;
	content: ReactNode;
};

export function OfferCard({ icon, content }: OfferCardProps) {
	return (
		<div className=''>
			<div className='w-full max-w-[380px] h-[260px] bg-white dark:bg-[#202124] rounded-xl  py-6 sm:py-8 px-4 sm:px-6 flex flex-col items-center justify-center gap-4 sm:gap-[20px] transform transition-all duration-300 hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.10)] animate-fade-in'>
				<div className='text-[2rem] sm:text-[2.5rem] lg:text-[3rem] flex items-center justify-center'>
					{icon}
				</div>
				<div className='text-text-color dark:text-gray-300 text-center'>
					{content}
				</div>
			</div>
		</div>
	);
}
