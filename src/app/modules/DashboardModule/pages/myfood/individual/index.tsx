'use client'
import React, { useEffect, useState } from 'react'
import FoodCard from '../../../../../../components/elements/DashboardElements/FoodCard';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Transaction } from '@/app/modules/AuthenticationModule/interface';
import NullFood from '@/components/elements/DashboardElements/NullFood';
import { format } from 'date-fns';


const MyFoodIndividual = () => {
  const [foodReceived, setFoodReceived] = useState<Transaction[] | null>(null)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/api/food-donation/my-received/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          setFoodReceived(response.data.data)
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
    }

    fetchUserData();
  }, [])
  return (
    <div className='relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold'>
        <div className='w-full flex flex-row justify-center relative py-4'>
          <div className='flex justify-center items-center'>
            <p className='text-3xl text-[#02353C]'>My Food</p>
          </div>
        </div>
        {foodReceived ? 
        <div className='flex flex-wrap gap-5 justify-start'>
          {foodReceived.map((value, index) => <FoodCard key={index} id={value.id} img={value.foodDonation.imageUrl} nama={value.foodDonation.title} description={format(value.createdAt, "dd/MM/yyyy hh:mm aa")} statusPickUp={value.isPickedUp}/>)}
        </div>
        :
        <NullFood />
        }
      </div>
  )
}

export default MyFoodIndividual
