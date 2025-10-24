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

export const popularCourses = [
	{
		id: "1",
		title: "Pre University Course",
		description: "Be ready for your journey at the university.",
		imageUrl:
			"https://png.pngtree.com/png-vector/20241119/ourmid/pngtree-portrait-of-a-young-male-student-with-books-and-backpack-representing-png-image_14499889.png",
		bgColor: "#ffffff",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "2",
		title: "Foundation Course",
		description: "Grow your skill, starting with the foundation.",
		imageUrl: "https://pngimg.com/uploads/student/student_PNG164.png",
		bgColor: "linear-gradient(135deg, #E5F2FF 0%, #ffffff 100%)",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "3",
		title: "Full Stack Course",
		description: "Become a full stack developer with us.",
		imageUrl:
			"https://static.vecteezy.com/system/resources/thumbnails/051/688/995/small_2x/smiling-young-male-university-student-standing-isolate-on-transparency-background-png.png",
		bgColor: "linear-gradient(135deg, #FFE5B4 0%, #FFD6D6 100%)",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "4",
		title: "ITP Course",
		description: "Go further, dive deeply with the huge of IT",
		imageUrl:
			"https://copierleasenewjersey.com/wp-content/uploads/2022/08/ccts-guy-copier.png",
		bgColor: "#FDF0E8",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
	{
		id: "5",
		title: "ITE Course",
		description: "Come to become an exporter of IT field. ",
		imageUrl:
			"https://static.vecteezy.com/system/resources/previews/051/966/255/non_2x/a-man-in-glasses-holding-a-laptop-free-png.png",
		bgColor: "#FEFEF2",
		leftText: "Learn More",
		rightText: "Explore Scholarship",
	},
];
