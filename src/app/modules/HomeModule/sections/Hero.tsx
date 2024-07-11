'use client'
import React from 'react'
import BackgroundHero from '@/components/elements/HomeElements/BackgroundHero';
import { useAuth } from '../../AuthenticationModule/context/Authentication';

const HeroSection = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className='relative min-h-screen flex flex-col w-full'>
        <BackgroundHero />
        <div className='relative flex flex-col flex-grow justify-center gap-16 pl-24 max-w-4xl font-bold pt-20'>
          <div className='flex flex-col gap-6'>
            <p className='text-6xl'>Lorem Ipsum</p>
            <p className='text-3xl font-semibold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
          <div>
            <button>
              <a href={isLoggedIn ? '/foodshare' : '/login'} className={`flex shrink-0 justify-center items-center rounded-lg py-4 px-10 text-white 
              signup-shadow bg-[#188290] text-2xl hover:bg-[#02353C]`}>
                Donate Now
              </a>
            </button>
          </div>
        </div>
    </div>
  )
}

export default HeroSection