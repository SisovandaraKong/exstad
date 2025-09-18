/** @format */

import Image from "next/image";

const partners = [
	{
		name: "Ministry of Education, Youth and Sport",
		logo: "https://www.foodi-project.eu/wp-content/uploads/2019/01/P9.png",
	},
	{
		name: "ISTAD",
		logo: "https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a",
	},
	{
		name: "Chungbuk National University",
		logo: "https://nturanking.csti.tw/static/NTURankingData/img/UnivImage/KRU000023.png",
	},
	{
		name: "Ministry of Post and Telecommunications of Cambodia",
		logo: "https://www.trc.gov.kh/_astro/MPTC.CJZrFdlr_Z1xXAUI.webp",
	},
	{
		name: "ACLEDA Bank",
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7I2cke0hUAEafJhGKmrMCymfxU_vOT4GKG0UysGYWHVfoxzZ4QYARYh2jeQ_e5CyFjOw&usqp=CAU",
	},
	{
		name: "ABA Bank",
		logo: "https://play-lh.googleusercontent.com/WU6sZMD1UspzwqYnlACtmN60rckp8hoINSgsR21mKLJBbsHPwXtzwvOocpjC7FcO1g",
	},
	{
		name: "APD Bank",
		logo: "https://cdn.prod.website-files.com/66a88ddcf31fb0b71b89d1fd/66d90c5a1ac7788d194ac247_64954108a868226f441e01f1_Frame%2048099033.png",
	},
	{
		name: "Smart",
		logo: "https://cdn.bitrefill.com/primg/w360h216/smart-cambodia.webp",
	},
	{
		name: "Wing Bank",
		logo: "https://play-lh.googleusercontent.com/-deHHbwBUh2I4dzTjq9n4ggBGPqJwKzj9pwvPqyaR-hPxzKN9QVJOBsZP_ShlCDmX60",
	},
	{
		name: "Woori Bank",
		logo: "https://play-lh.googleusercontent.com/9EjpLk2v3rb1QThCBb8Ep03I7U9aVByTzrc_G77JtKd4O98uA-H4t-c-Ep9sgB1_5g",
	},
	{
		name: "KB Prasac Bank",
		logo: "https://play-lh.googleusercontent.com/rbNyQIKGPrK5nNmJHdkwKG0uZ9rk4qDMJ52JPLV32ui38hysDrUJl2wJhqyIxUAgOu6_",
	},
	{
		name: "Hattha Bank",
		logo: "https://eu-images.contentstack.com/v3/assets/blt7dacf616844cf077/blt25a971650c2ea2ee/67996d0f3b81de5614a817a4/Logo-on-blue-background.jpg?width=1280&auto=webp&quality=80&format=jpg&disable=upscale",
	},
	{
		name: "MayBank",
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nNOyLeCnSbIBbNDFQ9MTozu-HAJaWEuG_g&s",
	},
	{
		name: "J Trust Bank",
		logo: "https://webassets.jtrustroyal.com/about-us/JTRUST_Logo.jpg",
	},
	{
		name: "FTB Bank",
		logo: "https://play-lh.googleusercontent.com/dBXpI2QOfWndhjQKboqdt6sOdSeeGk_pxeXqVC8hHD-xCDQIKoD_MLHhVH51gb25F1rY",
	},
	{
		name: "Bankong Open API",
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwG-Zx92YNnU6BuabALnRRwBqX_5USd3AJJw&s",
	},
];

export function PartnersSection() {
	return (
		<section className='bg-background'>
			<div className='w-full mx-auto text-center'>
				<h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>
					Our Value Partners
				</h2>
				<p className='text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300 mb-8 px-4 sm:px-8 md:px-16 lg:px-32'>
					We collaborate with valued partners from various sectors across
					Cambodia, including ministries, industries, and the education field.
				</p>

				<div className='relative hide-scroll-bar overflow-x-auto'>
					<div className='flex animate-scroll'>
						{partners.map((partner, index) => (
							<div key={index} className='flex-shrink-0 mx-4'>
								<div className='w-20 h-20 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100'>
									<Image
										src={partner.logo || "/placeholder.svg"}
										alt={partner.name}
										width={80}
										height={80}
										className='w-full h-full object-cover'
										unoptimized
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
