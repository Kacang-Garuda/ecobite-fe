'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundHero from '@/components/elements/HomeElements/BackgroundHero';
import { useAuth } from '../../AuthenticationModule/context/Authentication';

const HeroSection = () => {
  const { isLoggedIn } = useAuth();
  
  const paragraphs = [
    {
      header: "",
      percentage: "39.85 %",
      text: "Indonesia’s waste is food waste, potentially feeding <span class='font-bold'>61</span> to <span class='font-bold'>125 million</span> people",
    },
    {
      header: "",
      percentage: "8 %",
      text: "global greenhouse <span class='font-bold'>gas emissions</span> come from <span class='font-bold'>food waste.</span>",
    },
    {
      header: "<span class='font-bold'>Indonesia</span> ranks",
      percentage: "Second Highest",
      text: "in <span class='font-bold'>Southeast Asia</span> on Global Hunger Index 2023.",
    },
    {
      header: "Every year, <span class='font-bold'>Indonesia</span> discards food worth",
      percentage: "Rp500 Trillion",
      text: "while <span class='font-bold'>many still go hungry.</span>"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % paragraphs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paragraphs.length]);

  return (
    <div className='relative min-h-screen flex flex-col w-full'>
      <BackgroundHero />
      <div className='relative flex flex-col flex-grow justify-center gap-16 pl-28 max-w-4xl pt-20 text-[#333]'>
        <div className='flex flex-col gap-6'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <p
                className='text-5xl leading-tight text-[#333]'
                dangerouslySetInnerHTML={{ __html: paragraphs[currentIndex].header }}
              ></p>
              <p className={`text-8xl font-black text-[#02353C]`}>{paragraphs[currentIndex].percentage}</p>
              <p 
                className='text-5xl leading-tight'
                dangerouslySetInnerHTML={{ __html: paragraphs[currentIndex].text }}
              ></p>
            </motion.div>
          </AnimatePresence>
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