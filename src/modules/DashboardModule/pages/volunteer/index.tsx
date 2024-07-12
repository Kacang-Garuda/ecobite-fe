import { Transaction } from '@/modules/AuthenticationModule/interface';
import FoodCard from '@/components/elements/DashboardElements/FoodCard';
import NullFood from '@/components/elements/DashboardElements/NullFood';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useAuth } from '@/modules/AuthenticationModule/context/Authentication';
import MyVolunteerCard from '@/components/elements/DashboardElements/MyVolunteerCard';

const VolunteerLandingPage = () => {
    const { user } = useAuth();
    return (
      <div className='relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold'>
          <div className='w-full flex flex-row justify-center relative py-4'>
            <div className='flex justify-center items-center'>
              <p className='text-3xl text-[#02353C]'>Volunteer</p>
            </div>
          </div>
          {user?.registeredEvents && user.registeredEvents.length > 0 ? 
          <div className='flex flex-wrap gap-5 justify-start'>
            {user.registeredEvents.map((value, index) => <MyVolunteerCard key={index} id={value.id} img={value.event.image} title={value.event.title} city={value.event.city} date={format(value.createdAt, "dd/MM/yyyy")} status={value.status}/>)}
          </div>
          :
          <div className='flex items-center justify-center w-full h-full p-20'>
            <p className='font-bold text-xl text-[#828282]'>
                You haven't applied to any volunteering event :(
            </p>
        </div>
          }
        </div>
    )
}

export default VolunteerLandingPage