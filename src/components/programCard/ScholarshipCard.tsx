import React from 'react'
import { programType } from '@/types/programs'
import Link from 'next/link';
import Image from 'next/image';
const ScholarshipCard: React.FC<programType> = ({
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
  totalslot
})=>{
  return (
    <div className='grid grid-cols-2   rounded-[24px] justify-between gap-4 p-[24px] bg-background  [box-shadow:0px_8px_24px_rgba(0,0,0,0.05)] '>
        {/* <img src={image} alt={title} className='w-[465px] h-full  rounded-[20px]' /> */}
        <Image unoptimized height={500} width={500} src={image} alt={title} className=' h-full  rounded-[20px]' />
              
        <div className='h-full flex flex-col gap-y-[10px]'>
          <div>
            <div className="flex items-center gap-3 mb-4">
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
                        <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
                    </div>
                    <div className='flex flex-col '>
                     <h1 className="relative text-primary text-[30px] font-bold hover:text-primary-hover
                      after:block after:h-[3px] after:w-0 after:bg-primary-hover  
                      after:transition-all after:duration-300 hover:after:w-full">  {title}</h1>
                      <p className='text-secondary font-bold text-[20px] '>{scholarship}</p>
                    </div>
                </div>
          </div>
          <div className='h-full flex flex-col gap-y-[18px] '>
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
             <div className='border-b-4 text-center rounded-[8px] border-[#1E7D34] px-[20px] py-[4px]'>
            <p className='text-[#1E7D34]  font-bold text-[24px]'>{totalslot}</p>
            <p className=' text-[#1E7D34]'>Total Slots</p>
            </div>
          </div>
          <Link href={"/"}>
            <h2 className='text-white text-center  bg-primary p-4 hover:bg-primary-hover cursor-pointer rounded-2xl  font-bold text-[16px] '>Enroll Now</h2> 
            </Link>
          </div>
      
          </div>
      </div>
  )
}

export default ScholarshipCard;