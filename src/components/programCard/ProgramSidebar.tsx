import type { openingProgramType } from "@/types/openingProgramType";
import type { programType } from "@/types/programs";

type Props = {
    program: programType;
};



const ProgramOverviewSidebar:React.FC<Props> = ({program}) =>{
    return(
        <>
            <div>
                <div className="bg-background gap-[40px] w-[369px] sticky top-20 p-[24px]  text-center flex flex-col ">
                    
                    <div><h1 className="font-bold text-[22px] text-primary ">{program.title}</h1>
                    <p className="font-medium text-[16px] text-foreground ">Be ready for your journey at the university</p>
                        </div>
                    <div className="flex flex-col items-center gap-[10px]">
                    <img src={program.openingprogram.qrimage} alt={program.title} className=" w-[143px] h-[142px]" />
                    <p className="text-[11px]">scan with your phone to access the mobile enrollment form</p>
                    </div>
                    <div className="flex flex-col w-full gap-[10px]">
                        <div className="flex flex-row justify-between">
                            <p className="font-normal text-[14px] text-foreground">Duration</p>
                            <p className="font-bold text-[14px] text-foreground">{program.duration}</p>
                        </div>
                         <div className="flex flex-row justify-between gap-auto ">
                            <p className="font-normal text-[14px] text-foreground">Level</p>
                            <p className="font-bold text-[14px] text-foreground">{program.level}</p>
                        </div>
                         <div className="flex flex-row justify-between gap-auto ">
                            <p className="font-normal text-[14px] text-foreground">Number</p>
                            <p className="font-bold text-[14px] text-foreground">{program.totalslot}</p>
                        </div>
                         <div className="flex flex-row justify-between gap-auto ">
                            <p className="font-normal text-[14px] text-foreground">scholarship</p>
                            <p className="font-bold text-[14px] text-foreground">{program.scholarship}</p>
                        </div>
                        <div className="flex flex-row justify-between gap-auto ">
                            <p className="font-normal text-[14px] text-foreground">Cost</p>
                            <p className="font-bold text-[14px] text-foreground">{program.discount}</p>
                        </div>

                    </div>
                    <button className="bg-white border border-foreground text-foreground px-[24px] py-[10px] rounded-[24px] text-center font-medium text-[16px] ">Join Telegram Group</button>
                    <button className="bg-primary text-white px-[24px] py-[10px] rounded-[24px] text-center font-medium text-[16px] ">Enroll Now</button>
                    {/* <p>{sidebar}</p> */}

                </div>
            </div>
        </>
    )
}
export default ProgramOverviewSidebar;