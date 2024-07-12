import Image from 'next/image'
import React from 'react'

const DisplayCard = ({
  image,
  title,
  description,
  onClick = undefined,
}: {
  image: string
  title: string
  description?: string
  onClick?: () => void
}) => {
  return (
    <div
      className="w-[350px] h-[350px] flex justify-center items-center hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute w-[350px] h-[350px] z-[-1]">
        <Image
          src={image}
          alt={`${title}-image`}
          fill
          sizes="none"
          className="object-cover"
        />
      </div>
      <div className="w-full px-10 py-6 bg-[rgba(2,53,60,0.80)]">
        <h6 className="font-bold text-xl text-center text-white">{title}</h6>
        <p className="text-lg text-white text-center">{description}</p>
      </div>
    </div>
  )
}

export default DisplayCard
