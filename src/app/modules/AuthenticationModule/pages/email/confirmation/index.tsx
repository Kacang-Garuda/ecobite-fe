import React from 'react'

const EmailConfirmation = () => {
  return (
    <div className='flex flex-col relative w-full'>
      <div className='relative flex flex-col flex-grow items-center justify-center bg-white px-40 py-20 text-[#02353C]'>
        <div className='flex flex-col items-center gap-2 mt-20'>
          <img src="/images/authentication/email-confirmation.svg" alt="Email Confirmation" className='animate-bounce' style={{animationDuration: '1.5s'}}/>
          <p className='text-4xl font-bold'>Verifying your email...</p>
          <p className='text-lg'>Please wait while we verify your email.</p>
        </div>
      </div>
    </div>
  )
}

export default EmailConfirmation