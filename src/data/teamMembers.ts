/** @format */

import { TeamData } from "@/types/team";

// Define proper return types
type MentorData = TeamData['mentors'];
type MemberData = TeamData['members'];

// Team member data - simulating data that would come from an API
export const teamData: TeamData = {
	mentors: {
		chhaya: {
			name: "Chan Chhaya",
			role: "Senior Mentor",
			image: "/team/mt_chhaya.JPG",
			bio: "Experienced full-stack developer with 8+ years in web development and mentoring.",
			experience: "8+ years",
			specialization: [
				"Full Stack Development",
				"React",
				"Node.js",
				"Mentoring",
			],
			social: {
				facebook: "https://facebook.com/chan.chhaya",
				github: "https://github.com/it-chhaya",
				telegram: "https://t.me/chan_chhaya",
			},
		},
		lyzia: {
			name: "Eung Lyzia",
			role: "Technical Mentor",
			image: "/team/mt_lyzia.JPG",
			bio: "Frontend specialist with expertise in modern JavaScript frameworks and UI/UX design.",
			experience: "6+ years",
			specialization: [
				"Frontend Development",
				"UI/UX Design",
				"JavaScript",
				"TypeScript",
			],
			social: {
				facebook: "https://facebook.com/ly.zia",
				github: "https://github.com/ly-zia",
				telegram: "https://t.me/ly_zia",
			},
		},
	},
	members: {
		sambath: {
			name: "Srun O.Sambath",
			role: "Group Leader",
			image: "/team/sambath.JPG",
			bio: "Project leader with strong organizational skills and full-stack development experience.",
			skills: [
				"Leadership",
				"Project Management",
				"Full Stack Development",
				"Team Coordination",
			],
			social: {
				facebook: "https://facebook.com/srunoudomsambath",
				github: "https://github.com/srunoudomsambath",
				telegram: "https://t.me/srunoudomsambath",
			},
		},
		narak: {
			name: "Leng Narak",
			role: "Head of UX/UI",
			image: "/team/narak.JPG",
			bio: "Creative designer focused on user experience and modern interface design.",
			skills: [
				"UI/UX Design",
				"Figma",
				"Adobe Creative Suite",
				"User Research",
				"Frontend Development",
			],
			social: {
				facebook: "https://facebook.com/lengnarak",
				github: "https://github.com/lengnarak",
				telegram: "https://t.me/lengnarak",
			},
		},
		vanda: {
			name: "Kong Sovannda",
			role: "Head of Frontend",
			image: "/team/vanda.JPG",
			bio: "Versatile developer with experience in both frontend and backend technologies.",
			skills: [
				"React",
				"Node.js",
				"MongoDB",
				"Express.js",
				"TypeScript",
				"AWS",
			],
			social: {
				facebook: "https://facebook.com/maovanda",
				github: "https://github.com/kungsovannda",
				telegram: "https://t.me/maovanda",
			},
		},
		dara: {
			name: "Kong Sisovandara",
			role: "Head of Backend",
			image: "/team/dara.JPG",
			bio: "Full stack developer with expertise in server architecture and database design.",
			skills: [
				"Node.js",
				"Express.js",
				"PostgreSQL",
				"MongoDB",
				"REST APIs",
				"GraphQL",
			],
			social: {
				facebook: "https://facebook.com/kmean.nakyljit",
				github: "https://github.com/SisovandaraKong",
				telegram: "https://t.me/sisovandaraKong",
			},
		},
		bora: {
			name: "Tong Bora",
			role: "Full Stack Developer",
			image: "/team/bora.JPG",
			bio: "Full stack developer passionate about creating responsive and interactive web applications.",
			skills: [
				"React",
				"Next.js",
				"Tailwind CSS",
				"JavaScript",
				"HTML5",
				"CSS3",
			],
			social: {
				facebook: "https://facebook.com/nhembora",
				github: "https://github.com/tongbora",
				telegram: "https://t.me/nhembora",
			},
		},
		menghouy: {
			name: "Teng Menghouy",
			role: "Full Stack Developer",
			image: "/team/menghouy.JPG",
			bio: "Full-stack developer with a focus on modern web technologies and clean code practices.",
			skills: [
				"React",
				"Node.js",
				"TypeScript",
				"Docker",
				"Git",
				"Agile Development",
			],
			social: {
				facebook: "https://facebook.com/keomenghouy",
				github: "https://github.com/TengMengHouy",
				telegram: "https://t.me/keomenghouy",
			},
		},
		meyling: {
			name: "Chhun Meyling",
			role: "Full Stack Developer",
			image: "/team/meyling.JPG",
			bio: "Dedicated full stack developer with a passion for building responsive web applications.",
			skills: [
				"Manual Testing",
				"Automated Testing",
				"Test Planning",
				"Bug Tracking",
				"Selenium",
			],
			social: {
				facebook: "https://facebook.com/eangmeyling",
				github: "https://github.com/ChhunMeyling",
				telegram: "https://t.me/eangmeyling",
			},
		},
		sreynuch: {
			name: "Phum Sreynoch",
			role: "Full Stack Developer",
			image: "/team/sreynuch.JPG",
			bio: "Creative full stack developer specializing in educational content and technical documentation.",
			skills: [
				"Content Writing",
				"Technical Documentation",
				"Video Production",
				"Social Media",
				"SEO",
			],
			social: {
				facebook: "https://facebook.com/chhumsreynuch",
				github: "https://github.com/noch-08",
				telegram: "https://t.me/chhumsreynuch",
			},
		},
	},
};

// Helper functions to simulate API calls
export const getMentors = (): Promise<MentorData> => {
	return new Promise((resolve) => {
		// Simulate API delay
		setTimeout(() => {
			resolve(teamData.mentors);
		}, 100);
	});
};

export const getMembers = (): Promise<MemberData> => {
	return new Promise((resolve) => {
		// Simulate API delay
		setTimeout(() => {
			resolve(teamData.members);
		}, 100);
	});
};

export const getAllTeamData = (): Promise<TeamData> => {
	return new Promise((resolve) => {
		// Simulate API delay
		setTimeout(() => {
			resolve(teamData);
		}, 100);
	});
};