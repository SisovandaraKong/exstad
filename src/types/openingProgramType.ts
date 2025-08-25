export type openingProgramType = {
    id: number;
    title: string;
    description: string;
    image: string;
    // level:string;
    // totalSlot:number;
    // scholarship:string;
    // link: string;
    // date: string;
    programOverview: programOverviewType[];
    learningOutcome: programLearningOutcomeType[];
}


export type programOverviewType = {
    id: number;
    title: string;
    description: string;
}

export type programLearningOutcomeType = {
    id:number;
    title:string;
    subtitle:string;
    description:string[];
}
