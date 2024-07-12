import {
  RegisteredEvent,
  Transaction,
} from '@/modules/AuthenticationModule/interface'
import FoodCard from '@/components/elements/DashboardElements/FoodCard'
import NullFood from '@/components/elements/DashboardElements/NullFood'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useAuth } from '@/modules/AuthenticationModule/context/Authentication'
import MyVolunteerCard from '@/components/elements/DashboardElements/MyVolunteerCard'

const VolunteerLandingPage = () => {
  const [volunteerList, setVolunteerList] = useState<RegisteredEvent[] | null>(
    null
  )

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token')

      if (token) {
        try {
          const response = await axios.get(
            'http://localhost:3001/api/event/volunteer/',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          setVolunteerList(response.data.data)
        } catch (error) {
          console.error('Failed to fetch user data', error)
        }
      }
    }

    fetchUserData()
  }, [])
  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold">
      <div className="w-full flex flex-row justify-center relative py-4">
        <div className="flex justify-center items-center">
          <p className="text-3xl text-[#02353C]">Volunteer</p>
        </div>
      </div>
      {volunteerList && volunteerList.length > 0 ? (
        <div className="flex flex-col w-full gap-5 justify-start">
          {volunteerList.map((value, index) =>
            value.event ? (
              <MyVolunteerCard
                key={index}
                id={value.id}
                img={value.event.image}
                title={value.event.title}
                city={value.event.city}
                date={format(new Date(value.createdAt), 'dd/MM/yyyy')}
                status={value.status}
              />
            ) : null
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full p-20">
          <p className="font-bold text-xl text-[#828282]">
            You haven&apos;t applied to any volunteering event :(
          </p>
        </div>
      )}
    </div>
  )
}

export default VolunteerLandingPage
