import type { openingProgramType } from "@/types/openingProgramType";
import type { programType } from "@/types/programs";
import { PiNotePencilBold } from "react-icons/pi";
import { MdOutlineAccessTime } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlinePaid } from "react-icons/md";
import { FaTelegram } from "react-icons/fa6";
type Props = {
    program: programType;
};



const ProgramOverviewSidebar: React.FC<Props> = ({ program }) => {
    const latestGeneration = program.openingprogram[program.openingprogram.length - 1];
  return (
    <div>
      <div className="bg-background gap-[24px] sticky top-20 p-[24px] rounded-[24px] text-center flex flex-col">
        {/* Title */}
        <div>
          <h1 className="font-bold text-[22px] text-primary">{program.title}</h1>
          <p className="font-medium text-[16px] text-foreground">
            Be ready for your journey at the university
          </p>
        </div>

        {/* QR Codes */}
        <div className="flex flex-col items-center gap-[10px]">
  <img
    src={latestGeneration.qrimage}
    alt={latestGeneration.title}
    className="w-[143px] h-[142px]"
  />
  <p className="text-[11px]">
    Scan with your phone to access the mobile enrollment form
  </p>
</div>


        {/* Info boxes */}
        <div className="flex flex-col w-full gap-[10px]">
          <div className="flex flex-row justify-between">
            <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
              <MdOutlineAccessTime /> Duration
            </p>
            <p className="font-bold text-[14px] text-foreground">{program.duration}</p>
          </div>

          <div className="flex flex-row justify-between gap-auto">
            <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
              <VscGraph /> Level
            </p>
            <p className="font-bold text-[14px] text-foreground">{program.level}</p>
          </div>

          <div className="flex flex-row justify-between gap-auto">
            <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
              <BsPeople /> Number
            </p>
            <p className="font-bold text-[14px] text-foreground">{program.totalslot}</p>
          </div>

          <div className="flex flex-row justify-between gap-auto">
            <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
              <MdOutlineSchool /> Scholarship
            </p>
            <p className="font-bold text-[14px] text-foreground">{program.scholarship}%</p>
          </div>

          <div className="flex flex-row justify-between gap-auto">
            <p className="font-normal flex items-center gap-2 text-[14px] text-foreground">
              <MdOutlinePaid /> Cost
            </p>
            <div className="flex gap-2">
              <p className="font-bold text-[14px] text-foreground line-through">{program.discount}</p>
              <p className="text-secondary text-[14px] font-bold">{program.price}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        {/* Only show Telegram button if NOT a Short Course */}
        {program.program_type !== "Short Course" && (
          <button className="bg-background hover:bg-black hover:text-white   flex items-center justify-center gap-2 border border-foreground text-foreground px-[24px] py-[10px] rounded-[24px] text-center font-medium text-[16px]">
            <FaTelegram /> Join Telegram Group
          </button>
        )}

        <button className="bg-primary flex items-center justify-center gap-2 hover:bg-primary-hover text-white px-[24px] py-[10px] rounded-[24px] text-center font-medium text-[16px]">
          <PiNotePencilBold /> Enroll Now
        </button>
      </div>
    </div>
  );
};

export default ProgramOverviewSidebar;