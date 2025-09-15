import React from "react";
import { programType } from "@/types/programs";
import Image from "next/image";
import Link from "next/link";

const ShortCourseCard: React.FC<programType> = ({
  id, // make sure id is available
  title,
  subtitle,
  description,
  image,
  bg,
  highlights,
}) => {
  return (
    <Link href={`/our-program/${id}`} className="block">
      <div
        className="rounded-[20px] p-4 md:p-10 lg:p-[70px] hover:shadow-lg transition-shadow duration-300"
        style={{ background: bg }}
      >
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">{title}</h2>
            <p className="text-sm md:text-2xl text-[#333333] font-medium w-fit mx-auto md:mx-0 rounded-[10px] bg-white px-2 py-1 mt-2">
              {subtitle}
            </p>
            <p className="text-sm md:text-base mt-1 md:mt-2 text-gray-700 line-clamp-3">
              {description}
            </p>
          </div>
          <Image
            unoptimized
            width={120}
            height={120}
            src={image}
            alt={title}
            className="w-[120px] h-[120px] md:w-[192px] md:h-[192px] object-cover rounded-lg mx-auto md:mx-0"
          />
        </div>

        {/* Highlights */}
        {highlights && (
          <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {highlights.map((h, index) => {
              const isPrice = h.label.toLowerCase() === "price";
              return (
                <div
                  key={index}
                  className={`rounded-[18px] mg:rounded-[20px] lg:rounded-[25px] py-3 px-4 md:p-5 w-full ${
                    isPrice
                      ? "relative flex flex-col justify-center items-center bg-white"
                      : "flex flex-col justify-between bg-white"
                  }`}
                >
                  {isPrice ? (
                    <>
                      <span className="absolute top-2 right-2 text-red-500 text-xs md:text-lg line-through">
                        {h.value}
                      </span>
                      <h2 className="text-black font-bold text-lg md:text-3xl text-center">
                        {h.desc}
                      </h2>
                    </>
                  ) : (
                    <>
                      <h2 className="text-black font-bold text-sm md:text-lg">{h.value || h.label}</h2>
                      <p className="text-black font-medium text-xs md:text-base mt-1 md:mt-2">{h.desc}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ShortCourseCard;
