


import React from 'react'
import { programType } from '@/types/programs'
import Link from 'next/link';
import Image from 'next/image';

const ShortCourseCardActive: React.FC<programType> = ({
  id,
  title,
  description,
  price,
  duration,
  scholarship,
  discount,
  deadline,
  openingprogram
})=>{
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-[24px] justify-between gap-1 md:gap-2 lg:gap-4 p-4 md:p-4 lg:p-6 bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]">
          <Link href={`/explore-course/${id}`} className="block "> <Image unoptimized src={openingprogram?.[0]?.shortcourseimage || "/placeholder.jpg"} alt={title}  width={500}  height={300}
                className=" w-full  h-auto max-w-[500px] rounded-[20px] object-cover sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"/>
          </Link>
            <div className="h-full flex flex-col ">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
                  <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
                </div>
                     <div className="flex flex-col">
                  <Link href={`/explore-course/${id}`}>
                  <h1 className="text-primary text-[20px] md:text-2xl lg:text-3xl font-bold hover:text-primary-hover">  {title}
                  </h1>
                  </Link>
                  <p className="text-secondary font-bold text-[16px] md:text-[18px] lg:text-[20px]">{scholarship}% Scholarship</p>
                </div>
              </div>
            </div>
            <div className="h-full gap-2 flex flex-col justify-between">
              <p className="
                text-foreground font-normal
                text-[16px] md:text-[18px] lg:text-[20px]
                overflow-hidden
                text-ellipsis
                line-clamp-2 md:line-clamp-5 lg:line-clamp-none">{description}</p>
              <div className="flex justify-between">
                <div className="border-b-4  text-center rounded-[8px] border-secondary text-secondary px-[20px] py-[4px]">
                  <p className="text-secondary font-bold text-[20px] md:text-[18px] lg:text-[22px]">{deadline}</p>
                  <p>Deadline</p>
                </div>
                <div className="border-b-4 text-center rounded-[8px] border-primary px-[20px] py-[4px]">
                  <p className="text-primary font-bold text-[20px] md:text-[18px] lg:text-[22px]">{duration}</p>
                  <p className="text-primary">Duration</p>
                </div>
                <div className="relative inline-block text-center mt-4">
                  <p className="text-white font-bold text-[26px] md:text-[28px] lg:text-[30px] bg-primary rounded-full py-[5px] px-[20px]">  {discount}</p>
                  <p className="absolute -top-3 -right-2 text-white text-[14px] line-through bg-secondary rounded-full px-[8px] py-[2px] border border-white"> {price} </p>
                </div>
              </div>
                    <Link href={"/"}>
                    <h2 className='text-white text-center  bg-primary p-3 md:p-3.5 lg:p-4 hover:bg-primary-hover cursor-pointer rounded-2xl  font-bold text-[16px] '>Enroll Now</h2> 
                    </Link>
            </div>
          </div>
        </div>

          )
        }

export default ShortCourseCardActive;