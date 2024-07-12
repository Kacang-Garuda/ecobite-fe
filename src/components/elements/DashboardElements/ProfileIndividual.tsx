import React from 'react'

interface ProfileIndividualProps {
    image: string;
    nama: string;
    email: string;
    noTelp: string;
}

const ProfileIndividual: React.FC<ProfileIndividualProps> = ({image, nama, email, noTelp}) => {
  return (
    <div className='w-full shadow-xl flex flex-row px-4 py-6 gap-10 items-center'>
        <div className='w-[9.5625rem] h-[9.5625rem] shrink-0 rounded-full overflow-hidden shadow-lg'>
            <img src={image} alt={nama} className=''/>
        </div>
        <div className='flex flex-col gap-8 w-max'>
            <p className='text-[#2EAF7D] text-2xl'>{nama}</p>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-5 font-normal'>
                    <img src="/images/gmail-icon.svg" alt="Gmail Icon" />
                    <p className='text-lg'>{email}</p>
                </div>
                <div className='flex flex-row gap-5 font-normal'>
                    <img src="/images/phone-icon.svg" alt="Phone Icon" />
                    <p className='text-lg'>{noTelp}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileIndividual