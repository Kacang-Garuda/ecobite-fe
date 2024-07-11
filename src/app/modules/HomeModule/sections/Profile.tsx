import React from 'react'

const Profile = () => {
return (
  <div className='relative flex flex-col w-full h-max bg-white'>
    <div className='flex flex-col px-36 py-24 items-center gap-[4.75rem]'>
        <p className='text-[#2EAF7D] text-7xl font-bold'>From Spare to Share with Ecobite</p>
        <div className='flex flex-row w-full gap-[5.75rem]'>
            <img src="/images/home/ecobite-logo-lg.svg" alt="Ecobite Logo" />
            <p className='text-3xl font-medium'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab 
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            </p>
        </div>
    </div>
  </div>
)
}

export default Profile