/** @format */

import Link from "next/link";
import {  IoMdMail } from "react-icons/io";
import Image from "next/image";
import { FaFacebook, FaTelegram } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className='bg-white dark:bg-[#202124] px-4 sm:px-8 md:px-16 lg:px-32'>
			<div className='container mx-auto px-6 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Logo and Description */}
					<div className='space-y-4'>
						<div className='flex items-center space-x-2'>
							{/* Logo */}
							<Link href='/' className='block'>
								<Image
									src='/image/logo/exSTAD-Outline.PNG'
									alt='Logo'
									width={100}
									height={100}
								/>
							</Link>
						</div>
						<p className='text-sm text-text-color leading-relaxed'>
							exSTAD is created by ISTAD students streamlines enrollment and
							verifies student profiles.
						</p>
					</div>

					{/* Quick Line */}
					<div>
						<h3 className='font-semibold text-text-color mb-4'>QUICK LINE</h3>
						<ul className='space-y-3'>
							<li>
								<Link
									href='/explore-programs'
									className='text-base text-text-color'>
									Explore Programs
								</Link>
							</li>
							<li>
								<Link
									href='/available-programs'
									className='text-base text-text-color'>
									Available Programs
								</Link>
							</li>
							<li>
								<Link href='/scholar' className='text-base text-text-color'>
									Scholar
								</Link>
							</li>
							<li>
								<Link href='/roadmap' className='text-base text-text-color'>
									Roadmap
								</Link>
							</li>
						</ul>
					</div>

					{/* Support & Legal */}
					<div>
						<h3 className='font-semibold text-text-color mb-4'>
							SUPPORT & LEGAL
						</h3>
						<ul className='space-y-3'>
							<li>
								<Link href='/about-us' className='text-base text-text-color'>
									About Us
								</Link>
							</li>
							<li>
								<Link href='/faqs' className='text-base text-text-color'>
									FAQs
								</Link>
							</li>
							<li>
								<Link
									href='/policy-privacy'
									className='text-base text-text-color'>
									Policy Privacy
								</Link>
							</li>
							<li>
								<Link
									href='/terms-of-service'
									className='text-base text-text-color'>
									Term of Service
								</Link>
							</li>
						</ul>
					</div>

					{/* Our Sponsors */}
					<div>
						<h3 className='font-semibold text-text-color mb-4'>OUR SPONSORS</h3>
						<div className='flex items-center space-x-2'>
							{/* Logo */}
							<Link href='/' className='block'>
								<Image
									src='/image/logo/exSTAD-Outline.PNG'
									alt='Logo'
									width={100}
									height={100}
								/>
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-12 pt-8 border-t-[0.5px] border-[#253C95] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
					<div className='flex items-center space-x-4'>
						<p className='text-sm text-text-color'>© 2025 exSTAD, Inc.</p>
						<p className='text-sm text-text-color'>All rights reserved.</p>
						<Link href='/privacy-policy' className='text-sm text-text-color'>
							Privacy Policy
						</Link>
					</div>

					{/* Social Media Icons */}
					<div className='flex items-center space-x-4'>
						<Link
							href='#'
							className='flex items-center space-x-2 text-text-color'>
							<FaTelegram className='w-5 h-5 text-icon-bg' />
							<span className='text-sm'>Telegram</span>
						</Link>
						<Link
							href='#'
							className='flex items-center space-x-2 text-text-color'>
							<IoMdMail className='w-5 h-5 text-icon-bg' />
							<span className='text-sm'>Email</span>
						</Link>
						<Link
							href='#'
							className='flex items-center space-x-1 text-text-color'>
							<FaFacebook className='w-5 h-5 text-icon-bg' />
							<span className='text-sm'>Facebook</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
