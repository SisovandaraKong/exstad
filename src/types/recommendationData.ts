/** @format */

export interface Recommendation {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	leftText?: string;
	rightText?: string;
	bgColor: string;
}

export const recommendationData: Recommendation[] = [
	{
		id: "1",
		title: "Scholarship Opportunities",
		description:
			"Discover a variety of scholarships to support your educational journey. We offer financial aid for a wide range of courses and qualifications.",
		imageUrl: "/images/scholarship.png", // Replace with your actual image path
		leftText: "Learn More",
		rightText: "Explore Scholarship",
		bgColor: "#F0F4FF", // Light Blue
	},
	{
		id: "2",
		title: "Join Our IT and Design Courses",
		description:
			"Advance your skills with our expert-led courses in IT and design. From coding bootcamps to UI/UX workshops, we have something for everyone.",
		imageUrl: "/images/it-design.png", // Replace with your actual image path
		leftText: "View Courses",
		rightText: "See Details",
		bgColor: "#FFFBE6", // Light Yellow
	},
];
