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
    <div className="flex p-5 bg-[#F4FDFC] core-values-container">
      <div className="flex w-[6.125rem] h-[6.125rem] shrink-0">
        <img src={img} alt={title} />
      </div>
      <div className="flex flex-col">
        <div className="font-bold">{title}</div>
        <div className="flex flex-row gap-20">
          <div className="flex gap-1">
            <img
              src="/images/dashboard/calendar-fill.svg"
              alt="Calendar Icon"
            />
            <p>{date}</p>
          </div>
          <div className="flex gap-1">
            <img src="/images/location-icon.svg" alt="Calendar Icon" />
            <p>{city}</p>
          </div>
        </div>
        <div className="flex self-end">
          {status === 'Accepted' ? (
            <button
              className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#449342] text-white`}
            >
              Accepted
            </button>
          ) : status === 'Pending' ? (
            <button
              className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#E6C722] text-white`}
            >
              Pending
            </button>
          ) : (
            <button
              className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#EB5757] text-white`}
            >
              Rejected
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyVolunteerCard
