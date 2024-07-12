'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import ManageVolunteerCard from '../../../../../components/elements/DashboardElements/ManageVolunteerCard'
import { Event } from '../../../../AuthenticationModule/interface'
import { format } from 'date-fns'

interface ManageEventProps {
  setActivePage: (page: string | null) => void
}

const ManageEvent: React.FC<ManageEventProps> = ({ setActivePage }) => {
  const [event, setEvent] = useState<Event[] | null>(null)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token')

      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/event/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          console.log(response.data)
          setEvent(response.data.data)
        } catch (error) {
          console.error('Failed to fetch user data', error)
        }
      }
    }
    fetchUserData()
  }, [trigger])

  const handleTrigger = () => {
    setTrigger((prev) => !prev)
  }

  const handleEdit = (id: string) => {
    setActivePage(`editEvent:${id}`)
  }

  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold">
      <div className="w-full flex flex-row justify-center relative py-4">
        <div className="flex justify-center items-center">
          <p className="text-3xl text-[#02353C]">Manage Event</p>
        </div>
      </div>
      {event && event.length > 0 ? (
        <div className="flex flex-wrap w-full gap-5 justify-start">
          {event.map((value) => (
            <ManageVolunteerCard
              key={value.id}
              id={value.id}
              createdAt={format(
                new Date(value.createdAt),
                'dd/MM/yyyy hh:mm aa'
              )}
              img={value.image}
              title={value.title}
              date={format(new Date(value.date), 'dd/MM/yyyy hh:mm aa')}
              city={value.city}
              registeredUser={value.registeredUsers.length}
              onEdit={() => handleEdit(value.id)}
              handleTrigger={handleTrigger}
            />
          ))}
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

export default ManageEvent
