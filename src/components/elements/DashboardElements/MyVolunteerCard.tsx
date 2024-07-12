import React from 'react'

interface VolunteerCardProps {
  id: string
  img: string
  title: string
  date: string
  city: string
  status: string
}

const MyVolunteerCard: React.FC<VolunteerCardProps> = ({
  id,
  img,
  title,
  date,
  city,
  status,
}) => {
  return (
    <div className="flex p-5 bg-[#F4FDFC] core-values-container w-full">
      <div className="flex w-[6.125rem] h-[6.125rem] shrink-0">
        <img src={img} alt={title} />
      </div>
      <div className="flex flex-col justify-between">
        <div className='flex flex-col gap-1'>
          <div className="font-bold">{title}</div>
          <div className="flex flex-row gap-28 text-xs font-normal">
            <div className="flex gap-1">
              <img
                src="/images/dashboard/calendar-event-fill.svg"
                alt="Calendar Icon"
                className='w-4 h-4'
              />
              <p>{date}</p>
            </div>
            <div className="flex gap-1">
              <img src="/images/location-icon.svg" alt="Calendar Icon" className='w-4 h-4'/>
              <p>{city}</p>
            </div>
          </div>
        </div>
        <div className="flex">
          {status === 'Accepted' ? (
            <label
              className={`flex px-6 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#449342] text-white`}
            >
              Accepted
            </label>
          ) : status === 'Pending' ? (
            <label
              className={`flex px-6 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#E6C722] text-white`}
            >
              Pending
            </label>
          ) : (
            <label
              className={`flex px-6 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#EB5757] text-white`}
            >
              Rejected
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyVolunteerCard
