/** @format */

/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
	{
		name: "Graduate Students",
		username: "",
		body: "After graduate, students have the real skills of IT Fields.",
		img: "https://www.vhv.rs/dpng/d/6-61727_college-student-icon-png-transparent-png.png",
	},
	{
		name: "Real Projects",
		username: "",
		body: "All ISTAD students must complete real-world projects to graduate.",
		img: "https://cdn-icons-png.flaticon.com/512/3158/3158428.png",
	},
	{
		name: "Job Offer",
		username: "",
		body: "At ISTAD, 92% of students secure internships before graduation.",
		img: "https://cdn-icons-png.flaticon.com/512/196/196754.png",
	},
	{
		name: "Industry Partnership",
		username: "",
		body: "Strong connections with leading tech companies for internships.",
		img: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	},
	{
		name: "Modern Curriculum",
		username: "",
		body: "Updated curriculum aligned with current industry demands.",
		img: "https://cdn-icons-png.flaticon.com/512/3003/3003984.png",
	},
	{
		name: "Expert Mentors",
		username: "",
		body: "Learn from experienced professionals in the tech industry.",
		img: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
	},
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-36",
				// Use consistent card background
				"bg-card border-border hover:bg-card/80 transition-colors duration-200"
			)}>
			<div className='flex flex-row items-center gap-2'>
				<Image
					unoptimized
					className='rounded-full'
					width='32'
					height='32'
					alt=''
					src={img}
				/>
				<div className='flex flex-col'>
					<figcaption className='text-sm font-medium text-foreground'>
						{name}
					</figcaption>
					<p className='text-xs font-medium text-muted-foreground'>
						{username}
					</p>
				</div>
			</div>
			<blockquote className='mt-2 text-sm text-muted-foreground'>
				{body}
			</blockquote>
		</figure>
	);
};

export function MarqueeVertical() {
	return (
		<div className='relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden'>
			<Marquee pauseOnHover vertical className='[--duration:20s]'>
				{firstRow.map((review) => (
					<ReviewCard key={review.name} {...review} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover vertical className='[--duration:20s]'>
				{secondRow.map((review) => (
					<ReviewCard key={review.name} {...review} />
				))}
			</Marquee>
			<div className='from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b'></div>
			<div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t'></div>
		</div>
	);
}
