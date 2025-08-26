export type openingProgramType = {
    id: number;
    title: string;
    description: string;
    image: string;
    qrimage: string;
    activities: activityType[];
    timeline: timelineType[];

}

export type activityType = {
    id:number;
    title:string;
    subtitle:string;
    description:string;
    image:string;
}

export type timelineType = {
    id:number;
    title:string;
    date:string;
}
export type curriculumType = {
    id:number;
    order:number;
    title:string;
    answer:string[];
}



// export type RoadmapType = {

// }