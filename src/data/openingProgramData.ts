import { openingProgramType } from "@/types/openingProgramType";

export const openingProgramData: openingProgramType[] = [
    {
        id: 1,
        title: "Pre University Scholarship",
        image:"https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/481978395_646817804765390_8167577235669527897_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHkAnlA2G_TEMm_BloSevRW052IGJkuxMPTnYgYmS7Ew8mKsiFN1rbvveDC6wxTX5y0RoGt0DzLS5REvNroF2nm&_nc_ohc=i-QT3x0SBRsQ7kNvwGoCuar&_nc_oc=AdmhEQ3XuOE6x9oueFUrj3NM4LqjTyvOUnStbPJhS-oez8y9HrrhoHzew2hFtTvXd58&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=m0n_yhA4jtqkT3hXGvWSzA&oh=00_AfUmXkv_8eTXeDXeOYgpeZww45mYFYSWSoYAuh_nE0aENA&oe=68B237D0",
        description: "Get ready for university with our Pre University Scholarship program. This comprehensive course is designed to equip you with the essential skills and knowledge needed to excel in your higher education journey. From academic writing and research skills to time management and critical thinking, our expert instructors will guide you through a curriculum tailored to prepare you for the challenges of university life. Join us and take the first step towards a successful academic future.",
        programOverview:[
            {
                id:1,
                title:"Program Overview",
                description:"Are you ready to kickstart your journey in web development? In this ISTAD Pre-University course, you will build a complete Realtime Messaging System project from scratch using Laravel 10 and Pusher. This beginner-friendly, project-based program is designed to give you practical coding experience and a solid foundation for future university studies or tech careers."
            }
        ],
        learningOutcome:[
            {
                id:1,
                title:"Learning Outcomes",
                subtitle:"Upon completing the course, learners will understand the concept of the programming process.",
                 description: [
                    "Build responsive layouts with HTML, CSS, and Tailwind",
                    "Create interactive UIs using React",
                    "Understand state management and component lifecycle",
                    ],
            }
        ]
    }
]