import { format } from 'date-fns'
import { CalendarDays, MapPinned } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Card = ({
  image,
  title,
  date,
  city,
  onClick,
}: {
  image: string
  title: string
  date: Date
  city: string
  onClick: () => void
}) => {
  return (
    <div
      className="w-[300px] h-[300px] flex justify-end items-end hover:cursor-pointer rounded-[8px] shadow-[0_0_4px_2px_rgba(0,0,0,0.25)] overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute w-[300px] h-[300px] z-[-1] rounded-[8px] overflow-hidden">
        <Image
          src={image}
          alt={`${title}-image`}
          fill
          sizes="none"
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-2 px-[15px] py-[10px] bg-[rgba(255,255,255,0.80)]">
        <h6 className="font-bold text-xl text-center text-[#333]">{title}</h6>
        <div className="flex gap-3">
          <span className="flex gap-2">
            <CalendarDays />
            {format(date, 'MM/dd/yyyy')}
          </span>
          <span className="flex gap-2">
            <MapPinned />
            {city}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
