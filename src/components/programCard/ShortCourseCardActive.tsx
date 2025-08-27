import React from 'react'
import { programType } from '@/types/programs'
import Link from 'next/link';
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
    <div className='grid grid-cols-2 w-[1003px] h-[521px] rounded-[24px] gap-[24x] p-[24px] bg-white '>
        <img src={image} alt={title} className='w-[465px] h-full  rounded-[20px]' />
       
        <div className='h-full flex flex-col gap-y-8'>
          <div>
            <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary rounded-full"></div>
                        <div className="w-1 h-4 bg-gradient-to-b from-primary to-transparent rounded-full mt-1"></div>
                    </div>
                    <div>
                                  <h1 className='text-primary text-[37px] font-bold'>{title}</h1>
          <p className='text-secondary font-bold text-[20px] '>{scholarship}</p>
                    </div>
                </div>

          </div>
          <p className='text-foreground font-normal '>{description}</p>

          <div className='flex flex-row-3 justify-between  '>
            <div className='border-b-4 text-center rounded-[8px] border-secondary text-secondary p-[20px]'>
            <p className='text-secondary font-bold text-[24px] '>{deadline}</p>
            <p className=''>Deadline</p>
            </div>
             <div className='border-b-4  text-center rounded-[8px] border-primary p-[20px]'>
            <p className='text-primary font-bold text-[24px]'>{duration}</p>
            <p className=' text-primary'>Duration</p>
            </div>
             <div className='border-b-4 text-center rounded-[8px] border-[#1E7D34] p-[20px]'>
            <p className='text-[#1E7D34]  font-bold text-[24px]'>{totalslot}</p>
            <p className=' text-[#1E7D34]'>Total Slots</p>
            </div>
          </div>
            {/* <Link href={'/enrollment'} className='text-white bg-primary-foreground rounded-2xl gap-[10px] font-bold text-[16px] '><h1>Enroll Now</h1></Link> */}
            <h2 className='text-white text-center mt-[24px] bg-primary p-5 rounded-2xl gap-[10px] font-bold text-[16px] '>Enroll Now</h2>
          </div>
      </div>
  )
}

export default ScholarshipCard;