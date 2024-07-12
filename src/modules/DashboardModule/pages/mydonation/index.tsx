'use client'
import { FoodDonationProgress } from '@/modules/AuthenticationModule/interface';
import router from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import ProgressBar from '../../../../components/elements/DashboardElements/ProgressBar';

interface DonationDetailsProps {
    title: string;
    donatedAt: string;
    image: string;
    recipient: string;
    description: string;
    quantity: number;
    expiredDate: string;
    instruction: string;
    progress: FoodDonationProgress[];
}

const DonationDetails: React.FC<DonationDetailsProps> = ({title, donatedAt, image, recipient, description, quantity, expiredDate, instruction, progress}) => {
  return (
    <div className="flex flex-col relative w-full">
      <div className="relative flex flex-col flex-grow items-center justify-center px-40 py-20 bg-white  font-bold">
        <div className="w-full flex flex-row justify-center relative items-center py-8">
          <div className="absolute left-0">
            <button
              className="hover:scale-110 transition ease-in-out"
              onClick={() => router.back()}
            >
              <img
                src="/images/authentication/arrow-left.svg"
                alt="Arrow Left"
              />
            </button>
          </div>
          <div className="flex justify-center items-center pt-4 flex-col">
            <p className="text-3xl text-[#02353C] font-bold">{title}</p>
            <p className='text-lg'>Donated on {donatedAt}</p>
          </div>
        </div>
        <div className='flex flex-row w-full px-24 gap-4 items-center justify-center'>
            <div className='h-max w-max core-values-container bg-white'>
                <img src={image} alt={title} className='w-full h-full'/>
            </div>
            <div className='flex flex-col w-full justify-between h-[21.875rem] py-16 px-8'>
                <div className='text-lg flex flex-col font-normal'>
                    <p className='font-semibold'>
                        Recipient: {recipient}
                    </p>
                    <ReactMarkdown className='markdown'>
                      {description}
                    </ReactMarkdown>
                </div>
                <div className='text-xl max-w-xl flex flex-col font-semibold'>
                    <p>Quantity: {quantity} pcs</p>
                    <p>Expired Date: {expiredDate}</p>
                    <p>Pickup Instruction: {instruction}</p>
                </div>
            </div>
        </div>
        <hr className='bg-[#828282] h-[0.0625rem] w-4/5 flex justify-center'/>
        <div className="w-full flex flex-col justify-center relative py-12 gap-12">
          <div className="flex justify-center flex-row">
            <p className="text-3xl text-[#02353C] font-bold">Donation Progress</p>
          </div>
          <div className='flex justify-center items-center'>
            <ProgressBar foodProgress={progress}/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default DonationDetails
