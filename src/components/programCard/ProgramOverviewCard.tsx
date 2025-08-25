
import type { openingProgramType } from "@/types/openingProgramType";
import { title } from "process";
type Props = {
    program: openingProgramType;
};

const ProgramOverviewCard:React.FC<Props> = ({program}) => {
    return (
        <>
            <div className="">
                <div className="w-[887px] grid  p-[24px] gap-[40px]">
                    <img src={program.image} alt={program.title} className="rounded-[10px] h-[316px] w-full" />
                    <h1 className="text-foreground text-[32px] font-bold">{program.title}</h1>

                    <div className="grid  gap-[24px]">
                        {program.programOverview.map((item) =>(
                            <div key={item.id} className="grid gap-[24px]">
                                <h2 className="text-[20px] text-yellow-400 font-bold "><i className="fa-solid fa-bullseye"></i>{item.title}</h2>
                                <p className="text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-amber-400 p-[34px] rounded-[8px] ">{item.description}</p>
                            </div>  
                        ))}
                    </div>
                    <div>
                        {program.learningOutcome.map((outcome) =>(
                            <div key={outcome.id} className="grid gap-[24px]">
                                <h2 className="text-[20px] text-primary-hover font-bold "><i className="fa-solid fa-bullseye"></i>{outcome.title}</h2>
                                <p className="mb-[10px]">{outcome.subtitle}</p>
                                <ul className="list-disc list-inside text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-primary-hover p-[34px] rounded-[8px] ">
                                     {outcome.description.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
                                </ul>
                            </div>  
                        ))}
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default ProgramOverviewCard;