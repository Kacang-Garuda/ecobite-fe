import React from 'react'

interface ProfileInstitutionProps {
    image: string;
    nama: string;
    email: string;
    noTelp: string;
    description: string | undefined;
}

const ProfileInstitution: React.FC<ProfileInstitutionProps> = ({image, nama, email, noTelp, description}) => {
  return (
    <div className='w-full shadow-xl flex flex-col px-4 py-6 gap-10 justify-center'>
        <div className='flex flex-row gap-6'>
            <div className='w-[9.5625rem] h-[9.5625rem] shrink-0 rounded-full overflow-hidden shadow-lg'>
                <img src={image} alt={nama} className=''/>
            </div>
            <div className='flex flex-col gap-2 w-max'>
                <p className='text-[#2EAF7D] text-2xl'>{nama}</p>
                <p className='text-[#333] font-normal'>{description}</p>
            </div>
        </div>
        <div className='flex flex-col gap-2 pl-8'>
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
  )
}

export default ProfileInstitution