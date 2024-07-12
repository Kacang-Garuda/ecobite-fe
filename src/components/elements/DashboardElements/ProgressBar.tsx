'use client'
import { FoodDonationProgress } from '@/modules/AuthenticationModule/interface'
import React from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

interface ProgressBarProps {
  foodProgress: FoodDonationProgress[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ foodProgress }) => {
  const router = useRouter()
  const processedUsers = new Set<string>()

  const handleProfileClick = (email: string) => {
    router.push(`/profile/${email}`)
  }

  return (
    <div className='w-max py-10 px-16 navbar-shadow rounded-lg bg-white'>
      <div className='flex flex-row justify-center gap-10'>
        {foodProgress.map((progress, index) => {
          const isLast = index === foodProgress.length - 1
          const ellipseSrc = isLast ? '/images/dashboard/green-ellipse.svg' : '/images/dashboard/grey-ellipse.svg'
          const textColor = isLast ? 'text-[#188290]' : 'text-[#D9D9D9]'
          const userId = (progress.status === 'POSTED' ? '' : progress.user.email)

          const showButton =
            (progress.status === 'BOOKED' && !processedUsers.has(userId)) ||
            progress.status === 'PICKED UP'

          if (progress.status === 'PICKED UP') {
              processedUsers.add(userId)
            }
            
            return (
            <div key={progress.id} className={`flex flex-col gap-4 items-center text-center ${textColor}`}>
              <div className='relative flex'>
                {!isLast && <div className={`absolute top-1/2 right-[-4.7vw] transform translate-x-1/2 w-28 h-[2px] ${index === foodProgress.length - 2 ? 'bg-[#188290]' : 'bg-[#D9D9D9]'}`}></div>}
                <img src={ellipseSrc} alt="Ellipse" className='' />
              </div>
              <div className="relative flex flex-col items-center w-max h-max">
                <p className='font-bold'>{progress.status === 'POSTED' ? 'Food is posted' : (progress.status === 'BOOKED' ? `Booked ${progress.quantity} pcs` : 'Picked up')}</p>
                <p className='text-xs text-[#333]'>{format(progress.createdAt, 'dd/MM/yyyy hh:mm aa')}</p>
                {showButton && (
                  <button
                    className="p-2 mt-2 profile-button hover:bg-[#02353C] text-white w-max"
                    onClick={() => handleProfileClick(userId)}
                  >
                    <div className='flex gap-3 items-center'>
                        <div className='w-5 h-5 rounded-full border border-dashed overflow-hidden flex items-center justify-center'>
                            <img src={progress.user.profileImage} alt={progress.user.name}/>
                        </div>
                        <div>
                            <p className='font-medium text-xs'>
                                {progress.user.name}
                            </p>
                        </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressBar
