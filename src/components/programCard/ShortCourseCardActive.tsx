


import React from 'react'
import { programType } from '@/types/programs'
import Link from 'next/link';
import Image from 'next/image';
const ShortCourseCardActive: React.FC<programType> = ({
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
  discount,
  deadline,
  openingprogram,
  totalslot
})=>{
  return (
    <div className="grid grid-cols-2 rounded-[24px] justify-between gap-4 p-[24px] bg-background [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)]">
  {/* Left image */}
  <Image
  unoptimized
  height={500}
  width={500}
  src={openingprogram?.[0]?.shortcourseimage || "/placeholder.jpg"}
  alt={title}
  className="h-fit rounded-[20px] object-cover"
/>

  {/* Right content */}
  <div className="h-full flex flex-col ">
    {/* Title + scholarship */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
          <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="relative text-primary text-[30px] font-bold hover:text-primary-hover
                         after:block after:h-[3px] after:w-0 after:bg-primary-hover  
                         after:transition-all after:duration-300 hover:after:w-full">
            {title}
          </h1>
          <p className="text-secondary font-bold text-[20px]">{scholarship}</p>
        </div>
      </div>
    </div>

    {/* Description + info boxes */}
    <div className="h-full flex flex-col justify-between">
      <p className="text-foreground font-normal text-[20px]">{description}</p>

      <div className="flex justify-between">
        {/* Deadline */}
        <div className="border-b-4 text-center rounded-[8px] border-secondary text-secondary px-[20px] py-[4px]">
          <p className="text-secondary font-bold text-[24px]">{deadline}</p>
          <p>Deadline</p>
        </div>

        {/* Duration */}
        <div className="border-b-4 text-center rounded-[8px] border-primary px-[20px] py-[4px]">
          <p className="text-primary font-bold text-[24px]">{duration}</p>
          <p className="text-primary">Duration</p>
        </div>

        {/* Discount + price */}
         <div className="relative inline-block text-center mt-4">
          <p className="text-white font-bold text-[30px] bg-primary rounded-full py-[5px] px-[20px]">  {discount}</p>
          <p className="absolute -top-3 -right-2 text-white text-[14px] line-through bg-secondary rounded-full px-[8px] py-[2px] border border-white"> {price} </p>
        </div>
      </div>

        <h2 className='text-white text-center  bg-primary p-4  rounded-2xl  font-bold text-[16px] '>Enroll Now</h2> 
         
    </div>
  </div>
</div>

  )
}

export default ShortCourseCardActive;