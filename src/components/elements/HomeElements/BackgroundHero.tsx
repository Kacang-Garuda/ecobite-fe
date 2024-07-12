import React from 'react'
import Image from 'next/image'

const BackgroundHero = () => {
  return (
    <div className="absolute w-full h-full">
      <Image
        src="/images/home/bg-hero.svg"
        fill
        alt="Home Background"
        sizes="none"
        className="object-cover"
      />
    </div>
  )
}

export default BackgroundHero
