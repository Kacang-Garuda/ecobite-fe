'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Event } from '@/modules/AuthenticationModule/interface'
import { CalendarDays, MapPinned, MoveLeft, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Image from 'next/image'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import DialogApply from '../module-elements/DialogApply'

const VolunteerDetail = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event>()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    useState(false)

  async function getEvent() {
    const token = Cookies.get('token')

    if (token) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/event/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (response.data) {
        setEvent(response.data.data)
      }
    }
  }

  useEffect(() => {
    getEvent()
  }, [])

  return (
    <section className="relative max-w-screen-2xl mx-auto min-h-screen px-20 py-20 flex flex-col items-center gap-10">
      <DialogApply
        open={isOpenConfirmationDialog}
        setOpen={setIsOpenConfirmationDialog}
        eventId={params.id}
      />
      <div className="flex items-center w-full relative">
        <Link href={'/volunteering'} className="absolute left-0">
          <MoveLeft className="text-[#188290] w-10 h-10" />
        </Link>
        <div className="flex-grow text-center">
          <span className="font-bold text-[#2EAF7D] text-[32px]">
            {!event ? (
              <Skeleton className="w-[300px] h-[50px] mx-auto" />
            ) : (
              event?.title
            )}
          </span>
        </div>
      </div>
      {!event ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-[700px] h-[100px]" />
          <Skeleton className="w-[700px] h-[100px]" />
          <Skeleton className="w-[700px] h-[100px]" />
        </div>
      ) : (
        <>
          <Image
            src={event.image}
            alt={`${event.title} image`}
            width={700}
            height={300}
          />
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={event.user.profileImage}
                alt={`${event.user.name} photo`}
                width={60}
                height={60}
                className="rounded-full overflow-hidden"
              />
              <div>
                <span className="font-semibold text-lg text-[#333333]">
                  {event.user.name}
                </span>
                <span className="flex gap-2">
                  <Phone />
                  {event.user.phone}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="flex gap-2">
                <CalendarDays />
                {format(event.date, 'MM/dd/yyyy')}
              </span>
              <span className="flex gap-2">
                <MapPinned />
                {event.city}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <h4 className="font-bold text-2xl">Description</h4>
            <ReactMarkdown className="markdown">
              {event.description.replaceAll(/\n/g, '\n\n')}
            </ReactMarkdown>
          </div>
          <div className="w-full flex flex-col">
            <h4 className="font-bold text-2xl">Job Description</h4>
            <ReactMarkdown className="markdown">
              {event.jobDescription.replaceAll(/\n/g, '\n\n')}
            </ReactMarkdown>
          </div>
          <div className="w-full flex flex-col">
            <h4 className="font-bold text-2xl">Benefit</h4>
            <ReactMarkdown className="markdown">
              {event.benefit.replaceAll(/\n/g, '\n\n')}
            </ReactMarkdown>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h4 className="font-bold text-2xl">Location</h4>
            <Link
              href={event.location}
              target="_blank"
              className="w-max hover:underline"
            >
              {event.location}
            </Link>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="button"
              className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
              onClick={() => setIsOpenConfirmationDialog(true)}
            >
              Apply
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default VolunteerDetail
