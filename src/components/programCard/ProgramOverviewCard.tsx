import type { programType } from "@/types/programs";
type Props = {
    program: programType;
};

const ProgramOverviewCard:React.FC<Props> = ({program}) => {
    return (
        <>
            <div className="">
                <div className="w-[887px] grid  p-[24px] gap-[40px]">
                    <img src={program.openingprogram.image} alt={program.title} className="rounded-[10px] h-[316px] w-full" />
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
                                <ul className="list-disc grid gap-[24px] list-inside text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-primary-hover p-[34px] rounded-[8px] ">
                                     {outcome.description.map((point, index) => (
                                         <li key={index}>{point}</li>
                                            ))}
                                </ul>
                            </div>  
                        ))}
                    </div>
                    <div>
                        {program.courseRequirement.map((requirement)=>(
                            <div key={requirement.id} className="grid gap-[24px]">
                                <h2 className="text-[20px] text-secondary-hover font-bold">{requirement.title}</h2>
                                <p>{requirement.description}</p>
                                <ul className="list-disc grid gap-[24px] list-inside text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-secondary-hover p-[34px] rounded-[8px]">
                                    {requirement.description.map((point, index) => (
                                         <li key={index}>{point}</li>
                                            ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div>
                        {program.faq.map((section) =>(
                            <div key={section.title} className="grid gap-[24px]">
                                <h2 className="text-[20px] text-[#800080] font-bold">{section.title}</h2>
                                <div className="text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-[#800080] p-[34px] rounded-[8px] ">
                                {section.faqs.map((item,index) =>(
                                    <div key={item.id} className="">
                                        <h3 className="font-bold text-[16px] text-foreground "><span>{index +1}.</span>{item.question}</h3>
                                        <p className="text-foreground text-[16px] font-normal mb-[24px]">{item.answer}</p>
                                    </div>
                                ))}
                                </div>
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