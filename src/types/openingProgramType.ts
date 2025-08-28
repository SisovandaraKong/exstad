export type openingProgramType = {
    id: number;
    title: string;
    description: string;
    image: string;
    qrimage: string;
    activities: activityType[];
    timeline: timeline[];

}

export type activityType = {
    id:number;
    title:string;
    subtitle:string;
    description:string;
    image:string;
}

export type timeline = {
  id: number
  date: string;
  title: string;
};


// export type RoadmapType = {

// }