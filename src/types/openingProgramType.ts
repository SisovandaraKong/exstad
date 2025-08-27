export type openingProgramType = {
    id: number;
    title: string;
    description: string;
    image: string;
    qrimage: string;
    activities: ActivityDataType[];
    timeline: timelineType[];

}

export type ActivityType = {
    id:number;
    title:string;
    description:string;
    image:string;
}
export type ActivityDataType = {
    id:number;
    title:string;
    activityType:ActivityType[];
}

export type timelineType = {
    id:number;
    title:string;
    date:string;
}



// export type RoadmapType = {

// }