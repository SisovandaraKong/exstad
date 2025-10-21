/** @format */

import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
import {
	FaFacebook,
	FaTelegram,
	FaMapMarkerAlt,
	FaPhone,
	FaPhoneVolume,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";

export default function Footer() {
	return (
		<footer className='bg-primary  px-4 sm:px-8 md:px-16 lg:px-32'>
			<div className='container mx-auto px-6 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
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
						<p className='text-sm text-white leading-relaxed'>
							<span className='font-semibold'>exSTAD</span> is an experimental
							technology learning space for Cambodian students, especially those
							who want to explore ISTAD&apos;s scholarship program.
						</p>
					</div>

					{/* Quick Line */}
					<div>
						<h3 className='font-bold text-white mb-4'>EXPLORE</h3>
						<ul className='space-y-3'>
							<li>
								<Link href='/explore-programs' className='text-base text-white'>
									Bachelor Degree
								</Link>
							</li>
							<li>
								<Link
									href='/available-programs'
									className='text-base text-white'>
									Short Courses
								</Link>
							</li>
							<li>
								<Link href='/scholar' className='text-base text-white'>
									Scholarship
								</Link>
							</li>
							<li>
								<Link href='/roadmap' className='text-base text-white'>
									News & Events
								</Link>
							</li>
						</ul>
					</div>

					{/* Support & Legal */}
					<div>
						<h3 className='font-semibold text-white mb-4'>SUPPORT & LEGAL</h3>
						<ul className='space-y-3'>
							<li>
								<Link href='/about-us' className='text-base text-white'>
									About Us
								</Link>
							</li>
							<li>
								<Link href='/faqs' className='text-base text-white'>
									FAQs
								</Link>
							</li>
							<li>
								<Link href='/policy-privacy' className='text-base text-white'>
									Policy Privacy
								</Link>
							</li>
							<li>
								<Link href='/terms-of-service' className='text-base text-white'>
									Term of Service
								</Link>
							</li>
						</ul>
					</div>

					{/* Address Section */}
					<div>
						<h3 className='font-semibold text-white mb-4'>ADDRESS & CONTACT</h3>
						<div className='space-y-4'>
							<div className='flex items-start space-x-3'>
								<FaMapMarkerAlt className='w-5 h-5 text-white mt-1 flex-shrink-0' />
								<div>
									<p className='text-sm text-white leading-relaxed'>
										#40, St 273, Sangkat Boeung Kak II,{" "}
									</p>
									<p className='text-sm text-white leading-relaxed'>
										Khan Toul Kork, Phnom Penh, Cambodia{" "}
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-3'>
								<MdPhoneIphone className='w-6 h-6 text-white flex-shrink-0' />
								<p className='text-sm text-white'>(+855) 95-990-910</p>
							</div>
							<div className='flex items-center space-x-3'>
								<MdPhoneIphone className='w-6 h-6 text-white flex-shrink-0' />
								<p className='text-sm text-white'>(+855) 93-990-910</p>
							</div>
							<div className='flex items-center space-x-3'>
								<IoMdMail className='w-5 h-5 text-white flex-shrink-0' />
								<p className='text-sm text-white'>info.istad@gmail.com</p>
							</div>
						</div>
					</div>

					{/* Our Sponsors */}
					<div>
						<h3 className='font-semibold text-white mb-4'>OUR SPONSORS</h3>
						<div className='flex items-center space-x-2'>
							{/* Logo */}
							<Link href='/' className='block'>
								<Image
									src='/istad-image/istad-logo-white.png'
									alt='Logo'
									width={200}
									height={200}
								/>
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-12 pt-8 border-t-[0.5px] border-white flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
					<div className='flex items-center space-x-4'>
						<p className='text-sm text-white'>© 2025 exSTAD, Inc.</p>
						<p className='text-sm text-white'>All rights reserved.</p>
						<Link href='/privacy-policy' className='text-sm text-white'>
							Privacy Policy
						</Link>
					</div>

					{/* Social Media Icons */}
					<div className='flex items-center space-x-4'>
						<Link href='#' className='flex items-center space-x-2 text-white'>
							<FaTelegram className='w-5 h-5 text-white' />
							<span className='text-sm'>Telegram</span>
						</Link>
						<Link href='#' className='flex items-center space-x-2 text-white'>
							<IoMdMail className='w-5 h-5 text-white' />
							<span className='text-sm'>Email</span>
						</Link>
						<Link href='#' className='flex items-center space-x-1 text-white'>
							<FaFacebook className='w-5 h-5 text-white' />
							<span className='text-sm'>Facebook</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
