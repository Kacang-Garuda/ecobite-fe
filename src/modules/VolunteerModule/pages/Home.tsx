'use client'

import React, { useEffect, useState } from 'react'
import Card from '../module-elements/Card'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Event } from '../../AuthenticationModule/interface'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

const VolunteerHome = () => {
  const [listEvents, setListEvents] = useState<Event[]>([])

  const router = useRouter()

  async function getAllEvents() {
    const token = Cookies.get('token')

    if (token) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data) {
        setListEvents(response.data.data)
      }
    }
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <section className="relative max-w-screen-2xl mx-auto min-h-screen px-20 py-20 flex flex-col gap-10">
      <h1 className="font-bold text-[32px] text-[#02353C] text-center">
        What can you help today?
      </h1>
      {/* filter & sort */}
      <div className="flex flex-wrap justify-center gap-6">
        {listEvents.length !== 0 ? (
          listEvents.map((value) => (
            <Card
              key={value.id}
              image={value.image}
              title={value.title}
              date={value.date}
              city={value.city}
              onClick={() => router.push(`/volunteering/${value.id}`)}
            />
          ))
        ) : (
          <>
            <Skeleton className="w-[300px] h-[300px]" />
            <Skeleton className="w-[300px] h-[300px]" />
            <Skeleton className="w-[300px] h-[300px]" />
          </>
        )}
      </div>
    </section>
  )
}

export default VolunteerHome
