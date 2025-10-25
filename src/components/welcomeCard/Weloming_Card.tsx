/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";

export function Welcoming_Card() {
	const features = [
		{ icon: Users, text: "5000+ Students" },
		{ icon: Award, text: "95% Success Rate" },
		{ icon: BookOpen, text: "Industry-Ready Curriculum" },
	];

	return (
		<div className='relative overflow-hidden'>
			{/* Background with grid pattern */}
			<div className='absolute inset-0 opacity-[0.08] dark:opacity-[0.12]'>
				<div
					className='w-full h-full'
					style={{
						backgroundImage: `
							linear-gradient(hsl(var(--primary)/0.4) 1px, transparent 1px),
							linear-gradient(90deg, hsl(var(--primary)/0.4) 1px, transparent 1px)
						`,
						backgroundSize: "30px 30px",
					}}
				/>
			</div>

			{/* Main content */}
			<div className='relative bg-card border border-border/50 backdrop-blur-sm mx-auto max-w-full p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center shadow-lg'>
				{/* Left/Top: Text Section */}
				<motion.div
					className='flex-1 space-y-6'
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: true }}>
					{/* Header */}
					<div className='space-y-4'>
						<motion.div
							className='inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-4 py-2'
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}>
							<div className='w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse' />
							<span className='text-sm font-medium text-foreground/80'>
								Welcome to the Future
							</span>
						</motion.div>

						<h2 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight'>
							Welcome to{" "}
							<span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
								exSTAD
							</span>
						</h2>
					</div>

					{/* Description */}
					<p className='text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed'>
						exSTAD is an experimental technology learning space for Cambodian
						students, especially those who want to explore ISTAD&apos;s
						scholarship program, products, and achievements in a unified digital
						platform.
					</p>

					{/* Features */}
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						{features.map((feature, index) => (
							<motion.div
								key={feature.text}
								className='flex items-center gap-3 p-3 rounded- bg-background/50 border border-border/30'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
								viewport={{ once: true }}>
								<feature.icon className='h-5 w-5 text-primary flex-shrink-0' />
								<span className='text-sm font-medium text-foreground'>
									{feature.text}
								</span>
							</motion.div>
						))}
					</div>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						viewport={{ once: true }}>
						<Link href='/explore-course'>
							<Button
								size='lg'
								className='bg-primary cursor-pointer text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group'>
								Up Your Skill
								<ArrowRight className='ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform' />
							</Button>
						</Link>
					</motion.div>
				</motion.div>

				{/* Right/Bottom: Image Section */}
				<motion.div
					className='flex items-center justify-center md:justify-end flex-shrink-0 w-full md:w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					viewport={{ once: true }}>
					<div className='relative'>
						{/* Glow effect behind image */}
						<div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl scale-110' />

						{/* Image */}
						<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-border/30'>
							<Image
								src='./image/sampleImage/3students.png'
								alt='Learn More'
								width={700}
								height={700}
								className='object-contain w-full h-auto rounded-xl max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]'
								unoptimized
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
