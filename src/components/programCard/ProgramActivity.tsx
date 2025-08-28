import { openingProgramType } from "@/types/openingProgramType";
import { programType } from "@/types/programs"
import Image from "next/image";



type Props = {
    program:programType;
};

const ProgramActivityTap: React.FC<Props> = ({ program}) =>{
    return(
        <>
        <div className="w-full bg-background grid p-[24px] gap-[40px]">
            {program.openingprogram.map((item)=>(
                <div key={item.id} className=""> 
                    <div>
                        {item.activities.map((section)=>(
                            <div key={section.id}>
                                <h1 className="font-bold text-[36px] text-foreground">{section.title}</h1>
                                <div>
                                {section.activityType.map((activity)=>(
                                    // console.log(object)
                                 <div key={activity.id}  className="flex flex-col gap-[24px] my-[24px] p-[24px] rounded-2xl border-l-1 border-transparent relative">
                                    <div className="absolute top-0 left-0 h-full w-0.5 rounded-l-2xl bg-gradient-to-b  from-[#328BE6] totransparent"></div>
                                    <h2 className="font-bold text-[20px] text-foreground">{activity.title}</h2>
                                    <p className="font-normal text-[16px] text-foreground">{activity.description}</p>
                                    <Image  
                                        unoptimized 
                                        height={500} 
                                        width={500}  
                                        src={activity.image} 
                                        alt={activity.title} 
                                        className="rounded-[24px] w-full h-[364px]" 
                                    />
                                    </div>

                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </>
    )
};

export default ProgramActivityTap;