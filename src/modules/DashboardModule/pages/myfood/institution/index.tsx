'use client'
import React, { useEffect, useState } from 'react'
import FoodCard from '../../../../../components/elements/DashboardElements/FoodCard'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Transaction } from '@/modules/AuthenticationModule/interface'
import NullFood from '@/components/elements/DashboardElements/NullFood'
import { format } from 'date-fns'
import FoodReceiveCard from '../../../../../components/elements/DashboardElements/FoodReceivedCard';

const MyFoodIndividual = () => {
  const [foodReceived, setFoodReceived] = useState<Transaction[] | null>(null)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token')

      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/food-donation/my-received/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          setFoodReceived(response.data.data)
        } catch (error) {
          console.error('Failed to fetch user data', error)
        }
      }
    }
    fetchUserData()
  }, [foodReceived])
  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold">
      <div className="w-full flex flex-row justify-center relative py-4">
        <div className="flex justify-center items-center">
          <p className="text-3xl text-[#02353C]">Food Received</p>
        </div>
      </div>
      {foodReceived && foodReceived.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-start">
          {foodReceived.map((value, index) => (
            <FoodReceiveCard
              key={index}
              id={value.id}
              img={value.foodDonation.imageUrl}
              nama={value.foodDonation.title}
              sender={value.donor.name}
              statusPickUp={value.isPickedUp}
            />
          ))}
        </div>
      ) : (
        <NullFood isDonation={false} />
      )}
    </div>
  )
}

export default MyFoodIndividual
