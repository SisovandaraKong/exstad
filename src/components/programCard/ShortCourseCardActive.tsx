import React from 'react'
import { programType } from '@/types/programs'
import Link from 'next/link';
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
  shortcourseimage,
  totalslot
})=>{
  return (
    <div className='grid grid-cols-2 w-[1003px] h-[521px] rounded-[24px] justify-between gap-1 p-[24px] bg-background  '>
        <img src={shortcourseimage} alt={title} className='w-[465px] h-full  rounded-[20px]' />
       
        <div className='h-full flex flex-col gap-y-[20px]'>
          <div>
            <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
                        <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
                    </div>
                    <div className='flex flex-col '>
                      <h1 className='text-primary text-[37px] font-bold'>{title}</h1>
                      <p className='text-secondary font-bold text-[20px] '>{scholarship}</p>
                    </div>
                </div>
          </div>
          <div className='h-full flex flex-col gap-y-[20px] '>
          <p className='text-foreground font-normal text-[20px] text-foreground'>{description}</p>
          <div className='flex flex-row-3 justify-between  '>
            <div className='border-b-4 text-center rounded-[8px] border-secondary text-secondary px-[20px] py-[4px]'>
            <p className='text-secondary font-bold text-[24px] '>{deadline}</p>
            <p className=''>Deadline</p>
            </div>
             <div className='border-b-4  text-center rounded-[8px] border-primary px-[20px] py-[4px]'>
            <p className='text-primary font-bold text-[24px]'>{duration}</p>
            <p className=' text-primary'>Duration</p>
            </div>
            <div className="relative inline-block text-center mt-4">
          <p className="text-white font-bold text-[30px] bg-primary rounded-full py-[5px] px-[20px]">  {discount}</p>
          <p className="absolute -top-2 -right-2 text-white text-[14px] line-through bg-secondary rounded-full px-[8px] py-[2px] border border-white"> {price} </p>
        </div>
          </div>
          </div>
            {/* <Link href={'/enrollment'} className='text-white bg-primary-foreground rounded-2xl gap-[10px] font-bold text-[16px] '><h1>Enroll Now</h1></Link> */}
            <h2 className='text-white text-center mt-[24px] bg-primary p-5 rounded-2xl gap-[10px] font-bold text-[16px] '>Enroll Now</h2>
          </div>
      </div>
  )
}

export default ShortCourseCardActive;