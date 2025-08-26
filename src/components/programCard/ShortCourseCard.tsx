import React from "react";
import { shortCoursesType } from "@/types/programs";

const ShortCourseCard: React.FC<shortCoursesType> = ({
  id,
  title,
  subtitle,
  description,
  image,
  price,
  bg,
  duration,
  scholarship,
  highlights,
  discount
}) => {
  return (
    <div className=" w-[1190px] h-[491px] rounded-[20px] p-[70px] "   style={{background: bg,  }}>
      <div>
      <div className="p-4 flex justify-between items-center gap-[267px]">
        <div className="">
        <h2 className="text-[44px] text-foreground font-bold">{title}</h2>
        <p className="text-2xl text-[#333333] font-medium w-fit rounded-[10px]  p-2.5 ">{subtitle}</p>
        <p className="text-sm mt-2 text-gray-700 line-clamp-3">{description}</p>
        </div>
         <img src={image} alt={title} className="w-[192px] h-[192px] object-cover" />
      </div>

        {highlights && (
            <div className="mt-4 flex justify-between items-center gap-[15px]">
                {highlights.map((h,index)=>(
                    <div key={index} className="rounded-[25px] bg-white p-5 w-full">
                        <h2 className="font-bold text-[20px] text-black">{h.value || h.label}</h2>
                        <p className="text-black font-medium text-[14px]">{h.desc}</p>

                    </div>
                )
            )}

            </div>
        )
        }

        {/* {scholarship && (
          <span className="inline-block mt-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
            Scholarship Available
          </span>
        )} */}
      </div>
    </div>
  );
};

export default ShortCourseCard;
