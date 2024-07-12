import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface CardProps {
  id:string;
  img: string;
  nama: string;
  description: string;
  status: string;
}

const FoodCard: React.FC<CardProps> = ({ id,img, nama, description, status }) => {

  return (
    <div className='px-5 py-4 card-element w-max h-max flex flex-col items-center gap-4'>
      <div className='w-[16.25rem] h-[6.25rem] flex-shrink-0 bg-[#D9D9D9] rounded-lg relative'>
        <img src={img} alt={nama} className='w-full h-full' />
        <div className='absolute right-0 mt-2 mr-2'>
            {status === "PICKED UP" ? 
            <button className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#449342] text-white`}>
                Picked up
            </button>
            : (status === "BOOKED" ? 
                <button className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#E6C722] text-white`}>
                    Booked
                </button>
            :
            <button className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#C1F6ED] text-[#333333]`}>
                Posted
            </button>
            )}
        </div>
      </div>
      <div className='w-full'>
        <p className='font-bold text-sm'>{nama}</p>
        <p className='text-xs font-normal'>Donated on {description}</p>
      </div>
      <div>
        <button className='px-8 py-3 font-semibold text-sm bg-[#188290] rounded-lg hover:bg-[#02353C] text-white'>
          View Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;