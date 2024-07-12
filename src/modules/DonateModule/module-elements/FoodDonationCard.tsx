import Image from 'next/image'
import React from 'react'

const FoodDonationCard = ({
  image,
  title,
  remainingQuantity,
  onClick,
}: {
  image: string
  title: string
  remainingQuantity: number
  onClick: () => void
}) => {
  return (
    <div
      className="w-[300px] h-[300px] flex justify-end items-end hover:cursor-pointer rounded-[8px] shadow-[0_0_4px_2px_rgba(0,0,0,0.25)] overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute w-[300px] h-[300px] z-[-1] rounded-[8px] overflow-hidden">
        <Image
          src={image}
          alt={`${title}-image`}
          fill
          sizes="none"
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col px-[15px] py-[10px] bg-[rgba(255,255,255,0.80)]">
        <h6 className="font-bold text-xl text-[#333]">{title}</h6>
        <span className="text-[#EB5757]">{remainingQuantity} pcs left</span>
      </div>
    </div>
  )
}

export default FoodDonationCard
