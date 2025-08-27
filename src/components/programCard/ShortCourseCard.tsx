import React from "react";
import { programType } from "@/types/programs";

const ShortCourseCard: React.FC<programType> = ({  id,  title,  subtitle,  description,  image,  price,  bg,  duration,  scholarship,  highlights,  discount}) => 
  {
  return (
    <div className=" w-[1190px] h-[491px] rounded-[20px] p-[70px] "   style={{background: bg,  }}>
      <div>
      <div className="p-4 flex justify-between items-center gap-[267px]">
        <div className="">
        <h2 className="text-[44px] text-foreground font-bold">{title}</h2>
        <p className="text-2xl text-[#333333] font-medium w-fit rounded-[10px] bg-white px-[10px] py-[6px]   ">{subtitle}</p>
        <p className="text-sm mt-2 text-gray-700 line-clamp-3 py-4">{description}</p>
        </div>
         <img src={image} alt={title} className="w-[192px] h-[192px] object-cover" />
      </div>

    {highlights && (  <div className="mt-4 flex justify-between items-stretch gap-[15px]"> 
      {highlights.map((h, index) => {
      const isPrice = h.label.toLowerCase() === "price";
      return (
        <div key={index}  className={`rounded-[25px] p-5 w-full flex-1 ${ isPrice  ? "relative flex flex-col justify-center items-center bg-white" : "flex flex-col justify-between bg-white"  }`}>
            {isPrice && h.value && h.label && (
            <>
              <span className="absolute top-3 right-3 text-red-500 text-[20px] line-through">{h.value}</span>
              <h2 className="text-black font-bold text-[36px] text-center">{h.desc} </h2>
            </>
          )}
          {!isPrice && (
            <>
              <h2 className="text-black font-bold text-[20px]"> {h.value || h.label}</h2>
              <p className="text-black font-medium text-[14px] mt-2"> {h.desc}</p>
            </>
          )}
        </div>
      );
    })}
  </div>
)}




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
