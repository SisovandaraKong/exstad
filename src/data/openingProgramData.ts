import { openingProgramType } from "@/types/openingProgramType";

export const openingProgramData: openingProgramType[] = [
    {
        id: 1,
        title: "Pre University Scholarship",
        image:"https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/481978395_646817804765390_8167577235669527897_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHkAnlA2G_TEMm_BloSevRW052IGJkuxMPTnYgYmS7Ew8mKsiFN1rbvveDC6wxTX5y0RoGt0DzLS5REvNroF2nm&_nc_ohc=i-QT3x0SBRsQ7kNvwGoCuar&_nc_oc=AdmhEQ3XuOE6x9oueFUrj3NM4LqjTyvOUnStbPJhS-oez8y9HrrhoHzew2hFtTvXd58&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=m0n_yhA4jtqkT3hXGvWSzA&oh=00_AfUmXkv_8eTXeDXeOYgpeZww45mYFYSWSoYAuh_nE0aENA&oe=68B237D0",
        qrimage:"https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
        description: "Get ready for university with our Pre University Scholarship program. This comprehensive course is designed to equip you with the essential skills and knowledge needed to excel in your higher education journey. From academic writing and research skills to time management and critical thinking, our expert instructors will guide you through a curriculum tailored to prepare you for the challenges of university life. Join us and take the first step towards a successful academic future.",
        activities: [
            {
                id:1,
                title:"Orientation Session",
                subtitle:"Welcome to the Program",
                description:"Join us for an engaging orientation session where you'll meet your instructors and fellow students, learn about the program structure, and get an overview of what to expect in the coming weeks.",
                image:"https://example.com/orientation.jpg"
            },
            {
                id:2,
                title:"Academic Skills Workshop",
                subtitle:"Building a Strong Foundation",
                description:"Participate in workshops focused on essential academic skills such as research techniques, academic writing, and effective study habits to prepare you for university-level coursework.",
                image:"https://example.com/academic_skills.jpg"
            },
            {
                id:3,
                title:"Time Management Seminar",
                subtitle:"Balancing Study and Life",
                description:"Learn strategies for effective time management to help you balance your studies with personal life, ensuring a productive and stress-free university experience.",
                image:"https://example.com/time_management.jpg"
            },
            {
                id:4,
                title:"Critical Thinking Exercises",
                subtitle:"Enhancing Analytical Skills",
                description:"Engage in activities designed to develop your critical thinking and problem-solving skills, which are crucial for success in higher education.",
                image:"https://example.com/critical_thinking.jpg"
            }
        ],
        timeline: [
            {
                id:1,
                title:"Application Deadline",
                date:"August 12, 2024"
            },
            {
                id:2,
                title:"Orientation Session",
                date:"August 20, 2024"
            },
            {
                id:3,
                title:"Academic Skills Workshop",
                date:"August 27, 2024"
            },
            {
                id:4,
                title:"Time Management Seminar",
                date:"September 3, 2024"
            },
            {
                id:5,
                title:"Critical Thinking Exercises",
                date:"September 10, 2024"
            },
            {
                id:6,
                title:"Program Completion",
                date:"September 17, 2024"
            }
        ]
    }
]