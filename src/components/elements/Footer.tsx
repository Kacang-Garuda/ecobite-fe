import React from 'react'

const Footer = () => {
  return (
    <div className='relative bottom-0'>
      <div className='relative justify-between w-full h-max self-stretch bg-[#F5F5F5] flex pt-10 pb-16 px-20 text-[#02353C]'>
        <div className='flex flex-col relative gap-6 h-max'>
            <div className='inline-flex flex-col items-start gap-1'>
              <div className='w-full'>
                <img src="/images/ecobite-logo.svg" alt="Ecobite Footer" className='w-full'/>
              </div>
              <div>
                <p className='text-2xl font-bold'>Waste Less, Feed More</p>
              </div>
            </div>
            <div className='shrink-0 font-semibold font-sm flex-row flex text-[#333333] w-full'>
              <div className='p-1'>
                <img src="/images/location-icon.svg" alt="Location Icon Footer" className='w-full h-full object-contain'/>
              </div>
              <div>
                <p>Universitas Indonesia, Depok</p>
              </div>
            </div>
        </div>

        <div className='inline-flex gap-9 items-center text-lg font-semibold h-max pt-6'>
          <div className='gap-8 inline-flex items-start '>
              <a href=""><img src="/images/gmail-icon.svg" alt="Gmail Icon Footer" /></a>
              <a href=""><img src="/images/phone-icon.svg" alt="Phone Icon Footer" /></a>
              <a href=""><img src="/images/instagram-icon.svg" alt="Instagra Icon Footer" /></a>
          </div>
        </div>
      </div>

      <div className='relativegap-3 py-4 flex text-[#F8F8F8] w-full bg-[#02353C] items-center justify-center'>
        <p>© 2024 EcoBite</p>
      </div>
    </div>
  )
}

export default Footer